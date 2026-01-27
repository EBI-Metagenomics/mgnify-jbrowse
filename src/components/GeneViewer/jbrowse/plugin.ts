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
  // JBrowse SimpleFeature supports get()
  if (typeof feature.get === 'function') return feature.get(key);
  return feature[key];
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
      const featureIdRaw = getFeatureValue(feature, joinAttr);
      const featureId = featureIdRaw != null ? String(featureIdRaw) : null;

      if (ctx.selectedGeneId && featureId && featureId === ctx.selectedGeneId) {
        return ctx.highlightColor;
      }

      const status = resolveEssentialityStatus(feature);
      return getColorForEssentiality(status, ctx.essentialityColorMap);
    });
  }
}

