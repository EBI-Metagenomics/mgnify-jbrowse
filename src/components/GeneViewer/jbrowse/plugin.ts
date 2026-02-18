import Plugin from '@jbrowse/core/Plugin';
import type PluginManager from '@jbrowse/core/PluginManager';

import type { EssentialityColorMap, EssentialityStatus } from '../types';
import {
  DEFAULT_ESSENTIALITY_COLOR_MAP,
  getColorForEssentiality,
  getIconForEssentiality,
  normalizeEssentialityStatus,
} from '../essentiality';

const DEFAULT_HIGHLIGHT_COLOR = '#2563eb';

type EssentialityIndex = Map<string, EssentialityStatus>;

interface GeneViewerJexlContext {
  selectedGeneId: string | null;
  essentialityEnabled: boolean;
  essentialityIndex: EssentialityIndex;
  essentialityColorMap?: EssentialityColorMap;
  featureJoinAttribute: string;
  highlightColor: string;
}

const ctx: GeneViewerJexlContext = {
  selectedGeneId: null,
  essentialityEnabled: false,
  essentialityIndex: new Map(),
  essentialityColorMap: DEFAULT_ESSENTIALITY_COLOR_MAP,
  featureJoinAttribute: 'locus_tag',
  highlightColor: DEFAULT_HIGHLIGHT_COLOR,
};

export function setGeneViewerJexlContext(partial: Partial<GeneViewerJexlContext>) {
  Object.assign(ctx, partial);
}

function getFeatureValue(feature: any, key: string): unknown {
  if (!feature) return undefined;
  // JBrowse SimpleFeature: get(name) returns this.data[name]. GFF often has attributes in data.attributes.
  if (typeof feature.get === 'function') {
    const v = feature.get(key);
    if (v != null && v !== '') return v;
    const attrs = feature.get('attributes');
    if (attrs && typeof attrs === 'object' && key in attrs) return attrs[key];
  }
  const data = feature?.data ?? feature;
  if (data && typeof data === 'object') {
    if (key in data && data[key] != null && data[key] !== '') return data[key];
    const attrs = data.attributes;
    if (attrs && typeof attrs === 'object' && key in attrs) return attrs[key];
  }
  return undefined;
}

export default class GeneViewerJBrowsePlugin extends Plugin {
  name = 'GeneViewerJBrowsePlugin';

  install(pluginManager: PluginManager) {
    const resolveEssentialityStatus = (feature: any): EssentialityStatus => {
      const joinAttr = ctx.featureJoinAttribute || 'locus_tag';
      const featureIdRaw = getFeatureValue(feature, joinAttr);
      const featureId = featureIdRaw != null ? String(featureIdRaw) : null;

      const statusFromFeature = getFeatureValue(feature, 'Essentiality');
      if (statusFromFeature) {
        return normalizeEssentialityStatus(statusFromFeature);
      }

      if (featureId) {
        const status = ctx.essentialityIndex.get(featureId);
        if (status) return status;
      }

      return 'unknown';
    };

    pluginManager.jexl.addFunction(
      'getColorForEssentiality',
      (essentiality: unknown) =>
        getColorForEssentiality(normalizeEssentialityStatus(essentiality), ctx.essentialityColorMap),
    );

    pluginManager.jexl.addFunction('selectedGeneId', () => ctx.selectedGeneId);

    pluginManager.jexl.addFunction('getEssentialityStatus', (feature: any) =>
      resolveEssentialityStatus(feature),
    );

    pluginManager.jexl.addFunction('getEssentialityIcon', (feature: any) =>
      ctx.essentialityEnabled ? getIconForEssentiality(resolveEssentialityStatus(feature)) : '',
    );

    pluginManager.jexl.addFunction('getGeneColor', (feature: any) => {
      const joinAttr = ctx.featureJoinAttribute || 'locus_tag';
      const selected = ctx.selectedGeneId ? String(ctx.selectedGeneId).trim() : null;
      if (selected) {
        const locus = getFeatureValue(feature, joinAttr);
        const id = getFeatureValue(feature, 'ID');
        const locusStr = locus != null ? String(locus).trim() : '';
        const idStr = id != null ? String(id).trim() : '';
        if (locusStr === selected || idStr === selected) return ctx.highlightColor;
      }

      const status = resolveEssentialityStatus(feature);
      return getColorForEssentiality(status, ctx.essentialityColorMap);
    });
  }
}

