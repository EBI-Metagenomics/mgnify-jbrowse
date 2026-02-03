import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createViewState, JBrowseApp } from '@jbrowse/react-app';
import { createRoot } from 'react-dom/client';

import type { GeneViewerProps } from './types';
import {
  buildEssentialityIndexFromCsv,
  getColorForEssentiality,
  getIconForEssentiality,
  normalizeEssentialityStatus,
} from './essentiality';
import { fetchFirstFaiRef, queryGffRegion, type GffFeature } from './gff';
import { useJBrowseVisibleRegion } from './useJBrowseVisibleRegion';
import GeneViewerJBrowsePlugin, { setGeneViewerJexlContext } from './jbrowse/plugin';
import { buildAssemblyConfig, buildDefaultSessionConfig, buildTracksConfig } from './jbrowse/config';
import { GeneViewerLegends } from './GeneViewerLegends';
import { FeaturePanel } from './FeaturePanel';
import { GenesInViewTable } from './GenesInViewTable';

type ViewModel = ReturnType<typeof createViewState>;

function parseInitialLocation(loc: string): { refName: string; start: number; end: number } | null {
  // formats: "contig_1:1..10000" or "contig_1:1-10000"
  const m = loc.match(/^([^:]+):(\d+)\s*(?:\.\.|-)\s*(\d+)$/);
  if (!m) return null;
  const refName = m[1];
  const start1 = Number(m[2]);
  const end1 = Number(m[3]);
  if (!refName || !Number.isFinite(start1) || !Number.isFinite(end1)) return null;
  const start = Math.max(0, Math.min(start1, end1) - 1);
  const end = Math.max(start + 1, Math.max(start1, end1));
  return { refName, start, end };
}

export default function GeneViewer(props: GeneViewerProps) {
  const [viewState, setViewState] = useState<ViewModel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [essentialityIndex, setEssentialityIndex] = useState<Map<string, any>>(new Map());
  const [essentialityEnabled, setEssentialityEnabled] = useState<boolean>(!!props.essentiality?.enabled);
  const [selectedGeneId, setSelectedGeneId] = useState<string | null>(
    props.initialSelection?.locusTag ?? null,
  );

  const [genesInView, setGenesInView] = useState<GffFeature[]>([]);

  const joinAttribute = props.essentiality?.featureJoinAttribute ?? 'locus_tag';
  const genesInViewTypes = useMemo(
    () => props.ui?.genesInViewTypes ?? ['gene'],
    [props.ui?.genesInViewTypes],
  );

  // Keep internal essentiality-enabled in sync with props changes
  useEffect(() => {
    setEssentialityEnabled(!!props.essentiality?.enabled);
  }, [props.essentiality?.enabled]);

  // Load essentiality CSV (optional)
  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        if (!essentialityEnabled || !props.essentiality?.csvUrl) {
          if (!cancelled) setEssentialityIndex(new Map());
          return;
        }
        const res = await fetch(props.essentiality.csvUrl);
        if (!res.ok) throw new Error(`Failed to fetch essentiality CSV: ${res.status} ${res.statusText}`);
        const text = await res.text();
        const idx = buildEssentialityIndexFromCsv(text, {
          joinColumn: props.essentiality.csvJoinColumn ?? 'locus_tag',
          statusColumn: props.essentiality.csvStatusColumn ?? 'essentiality',
        });
        // Convert to Map<joinKey, status>
        const statusMap = new Map<string, any>();
        idx.forEach((row, key) => statusMap.set(key, row.status));
        if (!cancelled) setEssentialityIndex(statusMap);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? String(e));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [
    essentialityEnabled,
    props.essentiality?.csvUrl,
    props.essentiality?.csvJoinColumn,
    props.essentiality?.csvStatusColumn,
  ]);

  // Keep JEXL context up to date (selection + essentiality)
  useEffect(() => {
    setGeneViewerJexlContext({
      selectedGeneId,
      essentialityEnabled,
      essentialityIndex: essentialityIndex as any,
      essentialityColorMap: props.essentiality?.colorMap,
      featureJoinAttribute: joinAttribute,
    });
  }, [selectedGeneId, essentialityEnabled, essentialityIndex, joinAttribute, props.essentiality?.colorMap]);

  const assemblyConfig = useMemo(() => buildAssemblyConfig(props), [props]);
  const tracksConfig = useMemo(() => buildTracksConfig(props), [props]);

  // Initialize JBrowse view state
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setError(null);

        // Choose an initial region: either from props.initialLocation or first FAI ref
        const initialLoc = props.initialLocation ? parseInitialLocation(props.initialLocation) : null;
        let initialRefName: string;
        let initialStart = 0;
        let initialEnd = 20000;

        if (initialLoc) {
          initialRefName = initialLoc.refName;
          initialStart = initialLoc.start;
          initialEnd = initialLoc.end;
        } else {
          const first = await fetchFirstFaiRef(props.assembly.fasta.faiUrl);
          initialRefName = first.refName;
          initialEnd = Math.min(first.length, 20000);
        }

        const sessionConfig = buildDefaultSessionConfig({
          assemblyName: props.assembly.name,
          initialRefName,
          initialStart,
          initialEnd,
        });

        const config = {
          assemblies: [assemblyConfig],
          tracks: tracksConfig.map((t) => ({ ...t, visible: true })),
          defaultSession: { ...sessionConfig, name: 'defaultSession' },
        };

        const state = createViewState({
          config,
          createRootFn: createRoot,
          plugins: [GeneViewerJBrowsePlugin],
        });

        if (!cancelled) setViewState(state);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? String(e));
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [props.initialLocation, props.assembly.fasta.faiUrl, props.assembly.name, assemblyConfig, tracksConfig]);

  // Feature clicks: capture JBrowse clicks and infer feature IDs from data-testid
  useEffect(() => {
    if (!viewState) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest?.('[data-testid]') as HTMLElement | null;
      if (!el) return;
      const tid = el.getAttribute('data-testid');
      if (!tid) return;

      // Many setups use locus_tag as the testid. If not, we still allow selection.
      setSelectedGeneId(tid);

      // Best-effort: trigger track re-render to apply highlighting quickly
      try {
        const view = viewState.session?.views?.[0];
        view?.tracks?.forEach((track: any) => {
          track?.displays?.forEach((display: any) => {
            try {
              display?.reload?.();
            } catch {
              // ignore
            }
          });
        });
      } catch {
        // ignore
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [viewState]);

  // Compute visible region and query genes-in-view from GFF
  const visibleRegion = useJBrowseVisibleRegion(viewState, 600);
  const gffQueryAbortRef = useRef<{ cancelled: boolean }>({ cancelled: false });

  useEffect(() => {
    if (!visibleRegion) return;
    const { refName, start, end } = visibleRegion;

    gffQueryAbortRef.current.cancelled = true;
    gffQueryAbortRef.current = { cancelled: false };
    const token = gffQueryAbortRef.current;

    const run = async () => {
      try {
        const feats = await queryGffRegion({
          gffUrl: props.annotation.gff.gffUrl,
          tbiUrl: props.annotation.gff.tbiUrl,
          refName,
          start,
          end,
          featureTypes: genesInViewTypes,
        });
        if (!token.cancelled) setGenesInView(feats);
      } catch (e: any) {
        if (!token.cancelled) setError(e?.message ?? String(e));
      }
    };

    // Debounce slightly to avoid hammering on pan/zoom
    const id = window.setTimeout(run, 250);
    return () => {
      token.cancelled = true;
      window.clearTimeout(id);
    };
  }, [visibleRegion, props.annotation.gff.gffUrl, props.annotation.gff.tbiUrl, genesInViewTypes]);

  const selectedFeature = useMemo(() => {
    if (!selectedGeneId) return null;
    const norm = String(selectedGeneId);
    return (
      genesInView.find((f) => {
        const attrs = f.attributes ?? {};
        const id =
          String(attrs[joinAttribute] ?? attrs.locus_tag ?? f.locus_tag ?? attrs.ID ?? f.id ?? '');
        return id === norm;
      }) ?? null
    );
  }, [selectedGeneId, genesInView, joinAttribute]);

  const selectedEssentiality = useMemo(() => {
    if (!essentialityEnabled || !selectedGeneId) return null;
    const statusRaw = essentialityIndex.get(String(selectedGeneId));
    if (!statusRaw) return null;
    const status = normalizeEssentialityStatus(statusRaw);
    return {
      status,
      color: getColorForEssentiality(status, props.essentiality?.colorMap),
      icon: getIconForEssentiality(status),
    };
  }, [essentialityEnabled, selectedGeneId, essentialityIndex, props.essentiality?.colorMap]);

  const showLegends = props.ui?.showLegends ?? true;
  const showPanel = props.ui?.showFeaturePanel ?? true;
  const showTable = props.ui?.showGenesInViewTable ?? true;

  const heightPx = props.heightPx ?? 720;

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
      {showLegends ? (
        <GeneViewerLegends
          essentiality={props.essentiality}
          essentialityEnabled={essentialityEnabled}
          onToggleEssentiality={(next) => setEssentialityEnabled(next)}
        />
      ) : null}

      {error ? (
        <div style={{ padding: 12, background: '#fff7ed', borderBottom: '1px solid #fed7aa', color: '#9a3412' }}>
          {error}
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: showPanel ? '1fr 360px' : '1fr' }}>
        <div style={{ minHeight: heightPx, maxHeight: heightPx, overflow: 'hidden' }}>
          {viewState ? (
            <JBrowseApp viewState={viewState} />
          ) : (
            <div style={{ padding: 12, color: '#6b7280' }}>Loading JBrowse…</div>
          )}
        </div>

        {showPanel ? (
          <div style={{ borderLeft: '1px solid #e5e7eb', minHeight: heightPx, maxHeight: heightPx, overflow: 'auto' }}>
            <FeaturePanel feature={selectedFeature} essentiality={selectedEssentiality} />
          </div>
        ) : null}
      </div>

      {showTable ? (
        <GenesInViewTable
          features={genesInView}
          selectedId={selectedGeneId}
          onSelect={(id) => setSelectedGeneId(id)}
          joinAttribute={joinAttribute}
        />
      ) : null}
    </div>
  );
}

