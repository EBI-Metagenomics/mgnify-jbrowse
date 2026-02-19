import { useEffect } from 'react';
import { createViewState } from '@jbrowse/react-app2';
import makeWorkerInstance from '@jbrowse/react-app2/esm/makeWorkerInstance';
import GeneViewerJBrowsePlugin from '../jbrowse/plugin';
import { buildDefaultSessionConfig } from '../jbrowse/config';
import { fetchFirstFaiRef } from '../gff';
import { parseInitialLocation } from '../utils/parseUtils';
import type { GeneViewerProps } from '../types';

type ViewModel = ReturnType<typeof createViewState>;

export function useGeneViewerInit(
  props: GeneViewerProps,
  assemblyConfig: any,
  tracksConfig: any[],
  setViewState: (v: ViewModel | null) => void,
  setError: (v: string | null) => void,
  initialZoomAppliedRef: React.MutableRefObject<boolean>,
) {
  useEffect(() => {
    initialZoomAppliedRef.current = false;
    let cancelled = false;

    async function init() {
      try {
        setError(null);

        const initialLoc = props.initialLocation ? parseInitialLocation(props.initialLocation) : null;
        let initialRefName: string;
        let initialStart = 0;
        let initialEnd: number;

        if (initialLoc) {
          initialRefName = initialLoc.refName;
          initialStart = initialLoc.start;
          initialEnd = initialLoc.end;
        } else {
          const first = await fetchFirstFaiRef(props.assembly.fasta.faiUrl);
          initialRefName = first.refName;
          initialEnd =
            props.initialRegionBp != null
              ? Math.min(first.length, props.initialRegionBp)
              : first.length;
        }

        const geneTrack = tracksConfig.find((t: any) => t.trackId === 'gene_features');
        const sessionConfig = buildDefaultSessionConfig({
          assemblyName: props.assembly.name,
          initialRefName,
          initialStart,
          initialEnd,
          geneTrackConfig: geneTrack,
        });

        const config = {
          assemblies: [assemblyConfig],
          tracks: tracksConfig.map((t) => ({ ...t, visible: true })),
          defaultSession: { ...sessionConfig, name: 'defaultSession' },
        };

        const state = createViewState({
          config,
          plugins: [GeneViewerJBrowsePlugin],
          makeWorkerInstance,
        });

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
  }, [
    props.initialLocation,
    props.initialRegionBp,
    props.assembly.fasta.faiUrl,
    props.assembly.name,
    assemblyConfig,
    tracksConfig,
  ]);
}
