import { useEffect, useMemo, useRef, useState } from 'react';

export interface VisibleRegion {
  refName: string;
  start: number;
  end: number;
  assemblyName?: string;
}

function computeVisibleRegion(viewState: any): VisibleRegion | null {
  const session = viewState?.session;
  const view = session?.views?.[0];
  const region = view?.displayedRegions?.[0];
  if (!view || !region) return null;

  const refName: string | undefined = region.refName;
  if (!refName) return null;

  const regionStart: number = region.start ?? 0;
  const regionEnd: number = region.end ?? regionStart;

  const bpPerPx = view.bpPerPx || view.volatile?.bpPerPx;
  const width: number =
    view.width ?? view.volatile?.width ?? 800;
  const offsetPx: number =
    view.offsetPx ?? view.volatile?.offsetPx ?? 0;

  let start = regionStart;
  let end = regionEnd;

  try {
    if (typeof view.pxToBp === 'function') {
      const startBp = view.pxToBp(0);
      const endBp = view.pxToBp(width);
      if (Number.isFinite(startBp) && Number.isFinite(endBp) && startBp < endBp) {
        start = Math.max(regionStart, Math.floor(startBp));
        end = Math.min(regionEnd, Math.floor(endBp));
      }
    } else if (bpPerPx && width) {
      const offsetBp = offsetPx * bpPerPx;
      const widthBp = width * bpPerPx;
      start = Math.max(regionStart, Math.floor(regionStart + offsetBp));
      end = Math.min(regionEnd, Math.floor(start + widthBp));
    }
  } catch {
    // fall back to displayed region bounds
  }

  if (start > end) [start, end] = [end, start];

  return {
    refName,
    start,
    end,
    assemblyName: region.assemblyName,
  };
}

export function useJBrowseVisibleRegion(viewState: any, pollingMs = 500): VisibleRegion | null {
  const [region, setRegion] = useState<VisibleRegion | null>(null);
  const lastSigRef = useRef<string>('');

  const stablePollingMs = useMemo(() => pollingMs, [pollingMs]);

  useEffect(() => {
    if (!viewState) return;

    const tick = () => {
      const next = computeVisibleRegion(viewState);
      if (!next) return;
      const sig = `${next.refName}:${next.start}:${next.end}`;
      if (sig === lastSigRef.current) return;
      lastSigRef.current = sig;
      setRegion(next);
    };

    tick();
    const id = window.setInterval(tick, stablePollingMs);
    return () => window.clearInterval(id);
  }, [viewState, stablePollingMs]);

  return region;
}

