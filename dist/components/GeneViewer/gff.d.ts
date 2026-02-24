export interface FaiRefInfo {
    refName: string;
    length: number;
}
export declare function fetchFirstFaiRef(faiUrl: string): Promise<FaiRefInfo>;
export interface GffFeature {
    refName: string;
    start: number;
    end: number;
    strand: 1 | -1 | 0;
    type: string;
    source: string;
    score?: string;
    phase?: string;
    attributes: Record<string, string>;
    /** Convenience IDs (may be missing depending on GFF) */
    id?: string;
    locus_tag?: string;
}
export declare function queryGffRegion(opts: {
    gffUrl: string;
    /** CSI index URL (.csi) */
    csiUrl: string;
    refName: string;
    start: number;
    end: number;
    featureTypes?: string[];
}): Promise<GffFeature[]>;
