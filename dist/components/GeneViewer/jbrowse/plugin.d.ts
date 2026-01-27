import Plugin from '@jbrowse/core/Plugin';
import type PluginManager from '@jbrowse/core/PluginManager';
import type { EssentialityColorMap, EssentialityStatus } from '../types';
type EssentialityIndex = Map<string, EssentialityStatus>;
interface GeneViewerJexlContext {
    selectedGeneId: string | null;
    essentialityEnabled: boolean;
    essentialityIndex: EssentialityIndex;
    essentialityColorMap?: EssentialityColorMap;
    featureJoinAttribute: string;
    highlightColor: string;
}
export declare function setGeneViewerJexlContext(partial: Partial<GeneViewerJexlContext>): void;
export default class GeneViewerJBrowsePlugin extends Plugin {
    name: string;
    install(pluginManager: PluginManager): void;
}
export {};
