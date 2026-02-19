import { useMemo } from 'react';
import {
  getColorForEssentiality,
  getIconForEssentiality,
  normalizeEssentialityStatus,
} from '../essentiality';
import type { GffFeature } from '../gff';
import type { EssentialityColorMap } from '../types';

export function useGeneViewerSelection(
  selectedGeneId: string | null,
  genesInView: GffFeature[],
  joinAttribute: string,
  essentialityEnabled: boolean,
  essentialityIndex: Map<string, string>,
  essentialityColorMap?: EssentialityColorMap,
) {
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

  const selectedEssentiality = useMemo(() => {
    if (!essentialityEnabled || !selectedLocusTag) return null;
    const statusRaw = essentialityIndex.get(String(selectedLocusTag));
    if (!statusRaw) return null;
    const status = normalizeEssentialityStatus(statusRaw);
    return {
      status,
      color: getColorForEssentiality(status, essentialityColorMap),
      icon: getIconForEssentiality(status),
    };
  }, [essentialityEnabled, selectedLocusTag, essentialityIndex, essentialityColorMap]);

  return { selectedFeature, selectedLocusTag, selectedEssentiality };
}
