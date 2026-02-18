import { GenomeMeta } from "../../interfaces/Genome";
declare const getAssembly: (genomeMeta: GenomeMeta, fastaBaseUrl: string) => {
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
export declare const getAssembly2: (genomeMeta: GenomeMeta, fileLocations: {
    gzi: string;
    fai: string;
    fasta: string;
}) => {
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
export default getAssembly;
