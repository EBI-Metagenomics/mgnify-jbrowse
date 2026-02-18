import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// Heuristic to distinguish real feature IDs (locus_tag, GFF ID) from JBrowse internal IDs
function isLikelyFeatureId(rawId: string | null): boolean {
  if (!rawId) return false;
  const id = rawId.trim();
  if (!id) return false;
  if (/\s/.test(id)) return false;

  // Reject JBrowse layout/block keys (e.g. "-464386435-offset-1083315") - these are not locus_tags
  if (/^-\d+-offset-\d+$/.test(id)) return false;
  if (/^-\d+$/.test(id)) return false;

  // Ignore known JBrowse UI container / display testids
  if (/^display-/.test(id) || /^trackRenderingContainer-/.test(id) || id === 'trackContainer') return false;
  if (/(container|tracks?|svg|placeholder)/i.test(id)) return false;

  // Feature ids are typically locus_tag (e.g. BU_ATCC8492_00001) or GFF ID (e.g. gene-xxx) - have letters
  if (!/[A-Za-z]/.test(id)) return false;
  return id.length >= 2;
}

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
  const genesInViewRef = useRef<GffFeature[]>([]);
  genesInViewRef.current = genesInView;
  /** After a table click we skip syncing from session.selection for a short window so the poll doesn't overwrite back to the previous gene */
  const lastTableSelectionTimeRef = useRef<number>(0);
  const TABLE_SELECTION_COOLDOWN_MS = 2000;
  /** Ensure we only navigate once per table click; otherwise session poll can change selectedFeature and trigger a second nav to a wrong place */
  const hasNavigatedThisTableClickRef = useRef<boolean>(false);
  /** Apply initial zoom once when view is ready so more than two genes are visible (showAllRegions). */
  const initialZoomAppliedRef = useRef<boolean>(false);

  const joinAttribute = props.essentiality?.featureJoinAttribute ?? 'locus_tag';

  // Resolve a clicked feature id (e.g. GFF ID or locus_tag) to the canonical locus_tag for selection/panel/table
  const resolveToLocusTag = useCallback((featureId: string, features: GffFeature[]): string => {
    const norm = String(featureId).trim();
    if (!norm) return featureId;
    for (const f of features) {
      const attrs = f.attributes ?? {};
      const locus = String(attrs[joinAttribute] ?? attrs.locus_tag ?? f.locus_tag ?? attrs.ID ?? f.id ?? '').trim();
      const id = String(attrs.ID ?? f.id ?? '').trim();
      if (norm === locus || norm === id) return locus || id || featureId;
    }
    return featureId;
  }, [joinAttribute]);
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

  // Debug: confirm this build is loaded (in console: window.__GENEVIEWER_DEBUG)
  useEffect(() => {
    (window as any).__GENEVIEWER_DEBUG = 'v2-' + Date.now();
    return () => {
      delete (window as any).__GENEVIEWER_DEBUG;
    };
  }, []);

  // Compute visible region and query genes-in-view from GFF (must run before selectedFeature/selectedLocusTag)
  const visibleRegion = useJBrowseVisibleRegion(viewState, 200);
  const gffQueryAbortRef = useRef<{ cancelled: boolean }>({ cancelled: false });
  useEffect(() => {
    if (!visibleRegion) return;
    const { refName, start, end } = visibleRegion;
    const regionLen = end - start;
    const buffer = Math.max(0, Math.floor(regionLen * 0.05));
    const qStart = Math.max(0, start - buffer);
    const qEnd = end + buffer;
    gffQueryAbortRef.current.cancelled = true;
    gffQueryAbortRef.current = { cancelled: false };
    const token = gffQueryAbortRef.current;
    const run = async () => {
      try {
        const feats = await queryGffRegion({
          gffUrl: props.annotation.gff.gffUrl,
          tbiUrl: props.annotation.gff.tbiUrl,
          refName,
          start: qStart,
          end: qEnd,
          featureTypes: genesInViewTypes,
        });
        if (!token.cancelled) setGenesInView(feats);
      } catch (e: any) {
        if (!token.cancelled) setError(e?.message ?? String(e));
      }
    };
    const id = window.setTimeout(run, 150);
    return () => {
      token.cancelled = true;
      window.clearTimeout(id);
    };
  }, [visibleRegion, props.annotation.gff.gffUrl, props.annotation.gff.tbiUrl, genesInViewTypes]);

  // Find feature by selectedGeneId; match locus_tag, ID, or any attribute so panel + table stay in sync.
  const selectedFeature = useMemo(() => {
    if (!selectedGeneId) return null;
    const norm = String(selectedGeneId).trim();
    if (!norm) return null;
    const exact = genesInView.find((f) => {
      const attrs = f.attributes ?? {};
      const id = String(
        attrs[joinAttribute] ?? attrs.locus_tag ?? f.locus_tag ?? attrs.ID ?? f.id ?? '',
      ).trim();
      return id === norm;
    });
    if (exact) return exact;
    return (
      genesInView.find((f) => {
        const attrs = f.attributes ?? {};
        const locus = String(
          attrs[joinAttribute] ?? attrs.locus_tag ?? f.locus_tag ?? attrs.ID ?? f.id ?? '',
        ).trim();
        if (locus === norm) return true;
        if (attrs.ID === norm || attrs.locus_tag === norm) return true;
        return Object.values(attrs).some((v) => String(v).trim() === norm);
      }) ?? null
    );
  }, [selectedGeneId, genesInView, joinAttribute]);

  const selectedLocusTag = useMemo(() => {
    if (selectedFeature) {
      const attrs = selectedFeature.attributes ?? {};
      return String(
        attrs[joinAttribute] ??
          attrs.locus_tag ??
          selectedFeature.locus_tag ??
          attrs.ID ??
          selectedFeature.id ??
          '',
      ).trim();
    }
    return selectedGeneId ? String(selectedGeneId).trim() : null;
  }, [selectedFeature, selectedGeneId, joinAttribute]);

  // Optional: set to true to log selection state on every click (see docs/GENE_CLICK_FLOW.md)
  const DEBUG_CLICK_FLOW = false;
  useEffect(() => {
    if (!DEBUG_CLICK_FLOW || !selectedGeneId) return;
    console.log('[GeneViewer] selection state', {
      selectedGeneId,
      selectedLocusTag,
      selectedFeature: selectedFeature
        ? { id: selectedFeature.attributes?.ID, locus_tag: selectedFeature.attributes?.locus_tag }
        : null,
      genesInViewLength: genesInView.length,
      genesInViewSample: genesInView.slice(0, 3).map((f) => ({
        id: f.attributes?.ID,
        locus_tag: f.attributes?.locus_tag,
      })),
    });
  }, [selectedGeneId, selectedLocusTag, selectedFeature, genesInView]);

  const selectedEssentiality = useMemo(() => {
    if (!essentialityEnabled || !selectedLocusTag) return null;
    const statusRaw = essentialityIndex.get(String(selectedLocusTag));
    if (!statusRaw) return null;
    const status = normalizeEssentialityStatus(statusRaw);
    return {
      status,
      color: getColorForEssentiality(status, props.essentiality?.colorMap),
      icon: getIconForEssentiality(status),
    };
  }, [essentialityEnabled, selectedLocusTag, essentialityIndex, props.essentiality?.colorMap]);

  // Keep JEXL context up to date (selection + essentiality). Use canonical selectedLocusTag for track highlight (blue bar).
  useEffect(() => {
    setGeneViewerJexlContext({
      selectedGeneId: selectedLocusTag ?? selectedGeneId,
      essentialityEnabled,
      essentialityIndex: essentialityIndex as any,
      essentialityColorMap: props.essentiality?.colorMap,
      featureJoinAttribute: joinAttribute,
      highlightColor: '#2563eb',
    });
  }, [selectedLocusTag, selectedGeneId, essentialityEnabled, essentialityIndex, joinAttribute, props.essentiality?.colorMap]);

  // When DOM only has layout id, we let the click through so JBrowse sets session.selection.
  // Sync that selection into our state so the panel and table update.
  useEffect(() => {
    if (!viewState) return;
    const session: any = viewState.session;
    if (!session) return;

    const getLocusFromSelection = (): string | null => {
      const sel = session.selection;
      if (!sel) return null;
      const feature = sel.feature ?? sel;
      if (!feature) return null;
      const joinAttr = props.essentiality?.featureJoinAttribute ?? 'locus_tag';
      let val: unknown;
      if (typeof feature.get === 'function') {
        val = feature.get(joinAttr) ?? feature.get('locus_tag') ?? feature.get('ID') ?? feature.get('id');
      } else {
        const data = feature.data ?? feature;
        const attrs = data?.attributes ?? data;
        val = attrs?.[joinAttr] ?? attrs?.locus_tag ?? attrs?.ID ?? data?.locus_tag ?? data?.id;
      }
      const s = val != null ? String(val).trim() : '';
      return s || null;
    };

    const tick = () => {
      try {
        if (Date.now() - lastTableSelectionTimeRef.current < TABLE_SELECTION_COOLDOWN_MS) {
          return;
        }
        const locus = getLocusFromSelection();
        if (locus) setSelectedGeneId((prev) => (prev === locus ? prev : locus));
      } catch {
        // ignore
      }
    };

    tick();
    const id = window.setInterval(tick, 300);
    return () => window.clearInterval(id);
  }, [viewState, props.essentiality?.featureJoinAttribute]);

  // Force track re-render when selection or essentiality changes so JEXL (getGeneColor) runs again.
  // This runs when user selects a gene in the table so the JBrowse track highlights that gene.
  useEffect(() => {
    if (!viewState) return;
    try {
      const view = viewState.session?.views?.[0];
      if (view?.tracks) {
        view.tracks.forEach((track: any) => {
          track?.displays?.forEach((display: any) => {
            try {
              display?.reload?.();
            } catch {
              // ignore
            }
          });
        });
        // Force view to repaint so highlight appears (e.g. when selection came from table click)
        if (typeof view.setWidth === 'function' && view.width != null) {
          const w = view.width;
          view.setWidth(w + 0.001);
          const t = window.setTimeout(() => {
            try {
              view.setWidth(w);
            } catch {
              // ignore
            }
          }, 20);
          return () => window.clearTimeout(t);
        }
      }
    } catch {
      // ignore
    }
  }, [viewState, selectedLocusTag, selectedGeneId, essentialityIndex, essentialityEnabled]);

  // When user selects a gene from the table, navigate JBrowse to that gene using navToLocString.
  // Only run once per table click: after nav, session selection can change and would retrigger and jump again.
  // Use the view's current refName so we match the assembly's ref naming (avoids wrong-scaffold jump).
  useEffect(() => {
    if (!viewState || !selectedFeature) return;
    if (Date.now() - lastTableSelectionTimeRef.current >= 800) return;
    if (hasNavigatedThisTableClickRef.current) return;

    const view = viewState.session?.views?.[0];
    if (!view || view.type !== 'LinearGenomeView' || !view.initialized) return;

    try {
      hasNavigatedThisTableClickRef.current = true;
      // Use refName from the view's displayed region so it matches assembly (avoids "hundreds of genes forward" wrong ref).
      const region = view.displayedRegions?.[0];
      const refName = region?.refName ?? selectedFeature.refName;
      // Location string: refName:start..end (1-based inclusive). GffFeature has 0-based start, end = 1-based end.
      const start1 = selectedFeature.start + 1;
      const end1 = selectedFeature.end;
      const locString = `${refName}:${start1}..${end1}`;
      if (typeof view.navToLocString === 'function') {
        view.navToLocString(locString, props.assembly.name);
      }
      const zoomBpPerPx = 80;
      const t = window.setTimeout(() => {
        try {
          if (typeof view.zoomTo === 'function') view.zoomTo(zoomBpPerPx);
        } catch {
          // ignore
        }
      }, 200);
      return () => window.clearTimeout(t);
    } catch {
      hasNavigatedThisTableClickRef.current = false;
    }
  }, [viewState, selectedFeature, props.assembly.name]);

  const assemblyConfig = useMemo(() => buildAssemblyConfig(props), [props]);
  const tracksConfig = useMemo(() => buildTracksConfig(props), [props]);

  // Initialize JBrowse view state
  useEffect(() => {
    initialZoomAppliedRef.current = false;
    let cancelled = false;

    async function init() {
      try {
        setError(null);

        // Choose an initial region: either from props.initialLocation or first FAI ref
        const initialLoc = props.initialLocation ? parseInitialLocation(props.initialLocation) : null;
        let initialRefName: string;
        let initialStart = 0;
        // Default to a wider initial window so neighboring genes are visible.
        let initialEnd = 50000;

        if (initialLoc) {
          initialRefName = initialLoc.refName;
          initialStart = initialLoc.start;
          initialEnd = initialLoc.end;
        } else {
          const first = await fetchFirstFaiRef(props.assembly.fasta.faiUrl);
          initialRefName = first.refName;
          initialEnd = Math.min(first.length, 50000);
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

        // Override session widget methods so JBrowse never opens the feature drawer (like METT)
        try {
          const session = state.session;
          if (session) {
            session.showWidget = function () {
              return undefined;
            };
            session.addWidget = function () {
              return undefined;
            };
          }
        } catch (_) {
          // ignore
        }

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

  // Apply initial zoom once when view is ready so the whole initial region is visible (more genes, not just two).
  useEffect(() => {
    if (!viewState || initialZoomAppliedRef.current) return;
    const view = viewState.session?.views?.[0];
    if (!view || view.type !== 'LinearGenomeView') return;

    const apply = () => {
      try {
        if (typeof view.showAllRegions === 'function') {
          view.showAllRegions();
          initialZoomAppliedRef.current = true;
        }
      } catch {
        // ignore
      }
    };

    if (view.initialized) {
      apply();
      return;
    }
    let count = 0;
    const maxTries = 30; // ~3s
    const id = window.setInterval(() => {
      count++;
      if (view.initialized || count >= maxTries) {
        if (view.initialized) apply();
        window.clearInterval(id);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [viewState]);

  // Feature clicks: capture JBrowse clicks via DOM and infer locus tags from data-testid.
  useEffect(() => {
    if (!viewState) return;

    const handleFeatureClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Log every click so we know the handler runs (diagnostic)
      if (typeof console !== 'undefined' && console.log) {
        console.log('[GeneViewer] click received', target.tagName, target.getAttribute?.('data-testid') ?? 'no-testid');
      }

      // Walk up from the clicked element to find data-testid that looks like a feature id (locus_tag / GFF ID).
      // JBrowse may use layout ids like "-464386435-offset-1083315" on wrappers; skip those.
      let element: HTMLElement | null = target;
      let rawId: string | null = null;
      while (element) {
        const tid = element.getAttribute?.('data-testid');
        if (tid && isLikelyFeatureId(tid)) {
          rawId = tid;
          break;
        }
        element = element.parentElement;
      }

      if (!rawId) {
        // DOM only has layout id (e.g. -464386435-offset-1083315). Let the click through so JBrowse
        // sets session.selection; we sync from that in a separate effect.
        if (typeof console !== 'undefined' && console.log) {
          console.log('[GeneViewer] no feature id in DOM, letting click through for session.selection sync');
        }
        return;
      }

      // We have a feature-like id from DOM – use it and block JBrowse's drawer
      event.stopPropagation();
      event.preventDefault();

      const featureId = rawId.replace(/^box-/, '').trim() || rawId;
      const locus = resolveToLocusTag(featureId, genesInViewRef.current) || featureId;
      setSelectedGeneId((prev) => (prev === locus ? prev : locus));

      if (typeof console !== 'undefined' && console.log) {
        console.log('[GeneViewer] setSelectedGeneId:', locus, '| genesInView:', genesInViewRef.current.length);
      }
    };

    // Also intercept double-clicks to suppress JBrowse's drawer
    const handleDoubleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const featureElement = target?.closest?.('[data-testid]') as HTMLElement | null;
      if (!featureElement) return;
      const featureId = featureElement.getAttribute('data-testid');
      if (!isLikelyFeatureId(featureId)) return;

      event.stopPropagation();
      event.preventDefault();
    };

    document.addEventListener('click', handleFeatureClick, true);
    document.addEventListener('dblclick', handleDoubleClick, true);
    return () => {
      document.removeEventListener('click', handleFeatureClick, true);
      document.removeEventListener('dblclick', handleDoubleClick, true);
    };
  }, [viewState, resolveToLocusTag]);

  const showLegends = props.ui?.showLegends ?? true;
  const showPanel = props.ui?.showFeaturePanel ?? true;
  const showTable = props.ui?.showGenesInViewTable ?? true;

  const heightPx = props.heightPx ?? 720;
  const jbrowseContainerRef = useRef<HTMLDivElement>(null);

  // Hide JBrowse's native menu bar and feature drawer so only our custom panel is used (like METT)
  useEffect(() => {
    if (!viewState) return;
    const container = jbrowseContainerRef.current;
    if (!container) return;

    const hideDrawerAndMenu = () => {
      const selectors = [
        '.MuiDrawer-root',
        '.MuiDrawer-modal',
        '.MuiDrawer-docked',
        '[class*="BaseFeatureDetail"]',
        '[class*="FeatureDetails"]',
        '[class*="DrawerWidget"]',
        '[class*="FeatureWidget"]',
        '.MuiBackdrop-root',
        '[aria-label*="drawer" i]',
      ];
      selectors.forEach((sel) => {
        try {
          container.querySelectorAll(sel).forEach((el) => {
            (el as HTMLElement).style.cssText =
              'display:none!important;visibility:hidden!important;pointer-events:none!important;';
          });
        } catch (_) {}
      });
      // Hide main app bar (File, Add, etc.) when it appears under our container
      const fileBtn = container.querySelector('button[data-testid="dropDownMenuButton"]');
      if (fileBtn?.textContent?.includes('File')) {
        let p: HTMLElement | null = fileBtn.parentElement;
        while (p) {
          if (p.classList.contains('MuiAppBar-root')) {
            p.style.display = 'none';
            break;
          }
          p = p.parentElement;
        }
      }
    };

    hideDrawerAndMenu();
    const observer = new MutationObserver(hideDrawerAndMenu);
    observer.observe(container, { childList: true, subtree: true });
    const t1 = setTimeout(hideDrawerAndMenu, 100);
    const t2 = setTimeout(hideDrawerAndMenu, 500);
    const t3 = setTimeout(hideDrawerAndMenu, 1000);
    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [viewState]);

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

      {/* Temporary: visible selection indicator so you can confirm clicks update state (remove once verified) */}
      <div
        style={{
          padding: '4px 12px',
          fontSize: 11,
          color: '#6b7280',
          background: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
        }}
        title="Shows current selection – click a gene in the track or a row in the table"
      >
        Selected: {selectedLocusTag ?? '—'} (genes in view: {genesInView.length})
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showPanel ? '1fr 360px' : '1fr' }}>
        <div
          ref={jbrowseContainerRef}
          style={{ minHeight: heightPx, maxHeight: heightPx, overflow: 'hidden' }}
        >
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
          selectedId={selectedLocusTag}
          onSelect={(id) => {
            lastTableSelectionTimeRef.current = Date.now();
            hasNavigatedThisTableClickRef.current = false;
            setSelectedGeneId(id);
          }}
          joinAttribute={joinAttribute}
        />
      ) : null}
    </div>
  );
}

