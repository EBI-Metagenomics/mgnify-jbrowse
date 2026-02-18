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
    var _a, _b, _c, _d;
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
    // Always use Gff3TabixWithEssentialityAdapter: provides locus_tag as feature id (METT-style) for click handling
    const adapterConfig = {
        type: 'Gff3TabixWithEssentialityAdapter',
        gffGzLocation: { uri: gff.gffUrl },
        index: { location: { uri: gff.tbiUrl } },
        essentialityCsvUrl: showEssentiality && (essentiality === null || essentiality === void 0 ? void 0 : essentiality.csvUrl) ? essentiality.csvUrl : '',
        csvJoinColumn: (_a = essentiality === null || essentiality === void 0 ? void 0 : essentiality.csvJoinColumn) !== null && _a !== void 0 ? _a : 'locus_tag',
        csvStatusColumn: (_b = essentiality === null || essentiality === void 0 ? void 0 : essentiality.csvStatusColumn) !== null && _b !== void 0 ? _b : 'essentiality',
        featureJoinAttribute: (_c = essentiality === null || essentiality === void 0 ? void 0 : essentiality.featureJoinAttribute) !== null && _c !== void 0 ? _c : 'locus_tag',
    };
    const tracks = [
        {
            type: 'FeatureTrack',
            trackId: 'gene_features',
            name: (_d = annotation.name) !== null && _d !== void 0 ? _d : 'Genes',
            assemblyNames: [assembly.name],
            category: ['Annotations'],
            adapter: adapterConfig,
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
                    id: 'gene_features-LinearBasicDisplay',
                    type: 'LinearBasicDisplay',
                    height: 280,
                    // Let JBrowse handle clicks -> session.setSelection(feature); we sync via poll
                    renderer: {
                        type: 'SvgFeatureRenderer',
                        // METT-style: jexl:getGeneColor(feature) for highlight + essentiality
                        color1: 'jexl:getGeneColor(feature)',
                        color2: 'jexl:getGeneColor(feature)',
                        labels: {
                            name: 'jexl:' + labelWithEss,
                        },
                    },
                },
            ],
            visible: true,
        },
    ];
    return tracks;
}
exports.buildTracksConfig = buildTracksConfig;
function buildDefaultSessionConfig(opts) {
    var _a, _b, _c, _d;
    const start = (_a = opts.initialStart) !== null && _a !== void 0 ? _a : 0;
    const end = Math.max(start + 1, opts.initialEnd);
    const geneTrack = opts.geneTrackConfig;
    return {
        name: 'Gene Viewer session',
        widgets: {
            BaseFeatureWidget: { type: 'BaseFeatureWidget', disabled: true },
        },
        views: [
            {
                type: 'LinearGenomeView',
                configuration: {
                    header: { disable: true, hidden: true },
                    // Let JBrowse set session.selection on click; we sync to panel/table via poll
                },
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
                        id: (_b = geneTrack === null || geneTrack === void 0 ? void 0 : geneTrack.trackId) !== null && _b !== void 0 ? _b : 'gene_features',
                        type: 'FeatureTrack',
                        configuration: (_c = geneTrack === null || geneTrack === void 0 ? void 0 : geneTrack.trackId) !== null && _c !== void 0 ? _c : 'gene_features',
                        minimized: false,
                        visible: true,
                        // Use full track displays (with renderer color1 + labels JEXL) so highlight and essentiality colors apply. Match METT: displays: track.displays
                        displays: (_d = geneTrack === null || geneTrack === void 0 ? void 0 : geneTrack.displays) !== null && _d !== void 0 ? _d : [
                            {
                                displayId: 'gene_features-LinearBasicDisplay',
                                id: 'gene_features-LinearBasicDisplay',
                                type: 'LinearBasicDisplay',
                                height: 280,
                                renderer: {
                                    type: 'SvgFeatureRenderer',
                                    color1: 'jexl:getGeneColor(feature)',
                                    color2: 'jexl:getGeneColor(feature)',
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    };
}
exports.buildDefaultSessionConfig = buildDefaultSessionConfig;
