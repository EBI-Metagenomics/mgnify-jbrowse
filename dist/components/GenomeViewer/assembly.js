"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssembly2 = void 0;
const getAssembly = (genomeMeta, fastaBaseUrl) => ({
    name: genomeMeta.assembly_name,
    sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'ReferenceSequenceTrack',
        adapter: {
            type: 'BgzipFastaAdapter',
            fastaLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz',
                uri: 'http://localhost:8080/pub/databases/metagenomics/mgnify_results/PRJNA398/PRJNA398089/SRR1111/SRR1111111/V6/assembly/ERZ1049444_FASTA.fasta.gz',
            },
            faiLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz.fai',
                uri: 'http://localhost:8080/pub/databases/metagenomics/mgnify_results/PRJNA398/PRJNA398089/SRR1111/SRR1111111/V6/assembly/ERZ1049444_FASTA.fasta.gz.fai',
            },
            gziLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz.gzi',
                uri: 'http://localhost:8080/pub/databases/metagenomics/mgnify_results/PRJNA398/PRJNA398089/SRR1111/SRR1111111/V6/assembly/ERZ1049444_FASTA.fasta.gz.gzi',
            },
        },
    },
});
const getAssembly2 = (genomeMeta, fileLocations) => ({
    name: genomeMeta.assembly_name,
    sequence: {
        type: 'ReferenceSequenceTrack',
        trackId: 'ReferenceSequenceTrack',
        adapter: {
            type: 'BgzipFastaAdapter',
            fastaLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz',
                uri: fileLocations.fasta,
            },
            faiLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz.fai',
                uri: fileLocations.fai,
            },
            gziLocation: {
                // uri: 'http://localhost:8080/ERZ1049444/ERZ1049444_FASTA.fasta.gz.gzi',
                uri: fileLocations.gzi,
            },
        },
    },
});
exports.getAssembly2 = getAssembly2;
exports.default = getAssembly;
