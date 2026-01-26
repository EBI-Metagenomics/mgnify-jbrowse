import {GenomeMeta} from "../../interfaces/Genome";

const getAssembly = (genomeMeta: GenomeMeta, fastaBaseUrl: string) => ({
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

export const getAssembly2 = (genomeMeta: GenomeMeta, fileLocations: {
    gzi: string;
    fai: string;
    fasta: string;
}) => ({
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

export default getAssembly;
