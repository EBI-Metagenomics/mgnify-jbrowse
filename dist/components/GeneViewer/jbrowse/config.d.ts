import type { GeneViewerProps } from '../types';
export declare function buildAssemblyConfig(props: GeneViewerProps): {
    name: string;
    sequence: {
        type: string;
        trackId: string;
        adapter: {
            type: string;
            fastaLocation: {
                uri: string;
            };
            faiLocation: {
                uri: string;
            };
            gziLocation: {
                uri: string;
            };
        };
    };
};
export declare function buildTracksConfig(props: GeneViewerProps): any[];
export declare function buildDefaultSessionConfig(opts: {
    assemblyName: string;
    initialRefName: string;
    initialEnd: number;
    initialStart?: number;
}): {
    name: string;
    widgets: {
        BaseFeatureWidget: {
            type: string;
            disabled: boolean;
        };
    };
    views: {
        type: string;
        configuration: {
            header: {
                disable: boolean;
                hidden: boolean;
            };
            onFeatureClick: null;
        };
        displayedRegions: {
            refName: string;
            start: number;
            end: number;
            assemblyName: string;
        }[];
        tracks: ({
            type: string;
            configuration: string;
            minimized: boolean;
            displays: {
                id: string;
                type: string;
                height: number;
                showForward: boolean;
                showReverse: boolean;
                showTranslation: boolean;
                showLabels: boolean;
            }[];
        } | {
            type: string;
            configuration: string;
            displays: {
                id: string;
                type: string;
                rendererTypeName: string;
                renderer: {
                    type: string;
                };
                height: number;
            }[];
            minimized?: undefined;
        })[];
    }[];
};
