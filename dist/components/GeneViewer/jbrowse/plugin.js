"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGeneViewerJexlContext = void 0;
const Plugin_1 = __importDefault(require("@jbrowse/core/Plugin"));
const essentiality_1 = require("../essentiality");
const DEFAULT_HIGHLIGHT_COLOR = '#2563eb';
const ctx = {
    selectedGeneId: null,
    essentialityEnabled: false,
    essentialityIndex: new Map(),
    essentialityColorMap: essentiality_1.DEFAULT_ESSENTIALITY_COLOR_MAP,
    featureJoinAttribute: 'locus_tag',
    highlightColor: DEFAULT_HIGHLIGHT_COLOR,
};
function setGeneViewerJexlContext(partial) {
    Object.assign(ctx, partial);
}
exports.setGeneViewerJexlContext = setGeneViewerJexlContext;
function getFeatureValue(feature, key) {
    if (!feature)
        return undefined;
    // JBrowse SimpleFeature supports get()
    if (typeof feature.get === 'function')
        return feature.get(key);
    return feature[key];
}
class GeneViewerJBrowsePlugin extends Plugin_1.default {
    constructor() {
        super(...arguments);
        this.name = 'GeneViewerJBrowsePlugin';
    }
    install(pluginManager) {
        const resolveEssentialityStatus = (feature) => {
            const joinAttr = ctx.featureJoinAttribute || 'locus_tag';
            const featureIdRaw = getFeatureValue(feature, joinAttr);
            const featureId = featureIdRaw != null ? String(featureIdRaw) : null;
            const statusFromFeature = getFeatureValue(feature, 'Essentiality');
            if (statusFromFeature) {
                return (0, essentiality_1.normalizeEssentialityStatus)(statusFromFeature);
            }
            if (featureId) {
                const status = ctx.essentialityIndex.get(featureId);
                if (status)
                    return status;
            }
            return 'unknown';
        };
        pluginManager.jexl.addFunction('getColorForEssentiality', (essentiality) => (0, essentiality_1.getColorForEssentiality)((0, essentiality_1.normalizeEssentialityStatus)(essentiality), ctx.essentialityColorMap));
        pluginManager.jexl.addFunction('selectedGeneId', () => ctx.selectedGeneId);
        pluginManager.jexl.addFunction('getEssentialityStatus', (feature) => resolveEssentialityStatus(feature));
        pluginManager.jexl.addFunction('getEssentialityIcon', (feature) => ctx.essentialityEnabled ? (0, essentiality_1.getIconForEssentiality)(resolveEssentialityStatus(feature)) : '');
        pluginManager.jexl.addFunction('getGeneColor', (feature) => {
            const joinAttr = ctx.featureJoinAttribute || 'locus_tag';
            const featureIdRaw = getFeatureValue(feature, joinAttr);
            const featureId = featureIdRaw != null ? String(featureIdRaw) : null;
            if (ctx.selectedGeneId && featureId && featureId === ctx.selectedGeneId) {
                return ctx.highlightColor;
            }
            const status = resolveEssentialityStatus(feature);
            return (0, essentiality_1.getColorForEssentiality)(status, ctx.essentialityColorMap);
        });
    }
}
exports.default = GeneViewerJBrowsePlugin;
