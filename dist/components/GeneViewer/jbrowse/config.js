"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDefaultSessionConfig = exports.buildTracksConfig = exports.buildAssemblyConfig = void 0;
function buildAssemblyConfig(props) {
    const { assembly } = props;
    return {
        name: assembly.name,
        sequence: {
            type: 'ReferenceSequenceTrack',
            trackId: 'ReferenceSequenceTrack',
            adapter: {
                type: 'BgzipFastaAdapter',
                fastaLocation: { uri: assembly.fasta.fastaUrl },
                faiLocation: { uri: assembly.fasta.faiUrl },
                gziLocation: { uri: assembly.fasta.gziUrl },
            },
        },
    };
}
exports.buildAssemblyConfig = buildAssemblyConfig;
function buildTracksConfig(props) {
    var _a;
    const { assembly, annotation, essentiality } = props;
    const gff = annotation.gff;
    const labelFields = [
        'Name',
        'gene',
        'locus_tag',
        'ID',
    ];
    const labelJexl = labelFields.map((f) => `get(feature,'${f}')`).join(" || ");
    const showEssentiality = !!(essentiality === null || essentiality === void 0 ? void 0 : essentiality.enabled);
    const labelWithEss = showEssentiality
        ? `${labelJexl} + ' ' + getEssentialityIcon(feature)`
        : labelJexl;
    const tracks = [
        {
            type: 'FeatureTrack',
            trackId: 'gene_features',
            name: (_a = annotation.name) !== null && _a !== void 0 ? _a : 'Genes',
            assemblyNames: [assembly.name],
            category: ['Annotations'],
            adapter: {
                type: 'Gff3TabixAdapter',
                gffGzLocation: { uri: gff.gffUrl },
                index: { location: { uri: gff.tbiUrl } },
            },
            ...(gff.ixUrl && gff.ixxUrl
                ? {
                    textSearching: {
                        textSearchAdapter: {
                            type: 'TrixTextSearchAdapter',
                            textSearchAdapterId: 'gff-trix',
                            trackId: 'gene_features',
                            ixFilePath: { uri: gff.ixUrl },
                            ixxFilePath: { uri: gff.ixxUrl },
                            ...(gff.metaUrl ? { metaFilePath: { uri: gff.metaUrl } } : {}),
                            assemblyNames: [assembly.name],
                        },
                    },
                }
                : {}),
            displays: [
                {
                    displayId: 'gene_features-LinearBasicDisplay',
                    type: 'LinearBasicDisplay',
                    rendererTypeName: 'SvgFeatureRenderer',
                    renderer: {
                        type: 'SvgFeatureRenderer',
                        // Dynamic coloring supports selection highlight + essentiality
                        color1: 'jexl:getGeneColor(feature)',
                        labels: {
                            name: 'jexl:' + labelWithEss,
                        },
                    },
                    height: 280,
                },
            ],
            visible: true,
        },
    ];
    return tracks;
}
exports.buildTracksConfig = buildTracksConfig;
function buildDefaultSessionConfig(opts) {
    var _a;
    const start = (_a = opts.initialStart) !== null && _a !== void 0 ? _a : 0;
    const end = Math.max(start + 1, opts.initialEnd);
    return {
        name: 'Gene Viewer session',
        views: [
            {
                type: 'LinearGenomeView',
                displayedRegions: [
                    {
                        refName: opts.initialRefName,
                        start,
                        end,
                        assemblyName: opts.assemblyName,
                    },
                ],
                tracks: [
                    {
                        type: 'ReferenceSequenceTrack',
                        configuration: 'ReferenceSequenceTrack',
                        minimized: false,
                        displays: [
                            {
                                id: 'ReferenceSequenceTrack',
                                type: 'LinearReferenceSequenceDisplay',
                                height: 200,
                                showForward: true,
                                showReverse: true,
                                showTranslation: true,
                                showLabels: true,
                            },
                        ],
                    },
                    {
                        type: 'FeatureTrack',
                        configuration: 'gene_features',
                        displays: [
                            {
                                id: 'gene_features-LinearBasicDisplay',
                                type: 'LinearBasicDisplay',
                                rendererTypeName: 'SvgFeatureRenderer',
                                renderer: { type: 'SvgFeatureRenderer' },
                                height: 280,
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
exports.buildDefaultSessionConfig = buildDefaultSessionConfig;
