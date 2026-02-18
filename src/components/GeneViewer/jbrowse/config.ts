import type { GeneViewerProps } from '../types';

export function buildAssemblyConfig(props: GeneViewerProps) {
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

export function buildTracksConfig(props: GeneViewerProps) {
  const { assembly, annotation, essentiality } = props;
  const gff = annotation.gff;

  const labelFields = [
    'Name',
    'gene',
    'locus_tag',
    'ID',
  ];
  const labelJexl = labelFields.map((f) => `get(feature,'${f}')`).join(" || ");

  const showEssentiality = !!essentiality?.enabled;
  const labelWithEss = showEssentiality
    ? `${labelJexl} + ' ' + getEssentialityIcon(feature)`
    : labelJexl;

  // Always use Gff3TabixWithEssentialityAdapter: provides locus_tag as feature id (METT-style) for click handling
  const adapterConfig = {
    type: 'Gff3TabixWithEssentialityAdapter' as const,
    gffGzLocation: { uri: gff.gffUrl },
    index: { location: { uri: gff.tbiUrl } },
    essentialityCsvUrl: showEssentiality && essentiality?.csvUrl ? essentiality.csvUrl : '',
    csvJoinColumn: essentiality?.csvJoinColumn ?? 'locus_tag',
    csvStatusColumn: essentiality?.csvStatusColumn ?? 'essentiality',
    featureJoinAttribute: essentiality?.featureJoinAttribute ?? 'locus_tag',
  };

  const tracks: any[] = [
    {
      type: 'FeatureTrack',
      trackId: 'gene_features',
      name: annotation.name ?? 'Genes',
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

export function buildDefaultSessionConfig(opts: {
  assemblyName: string;
  initialRefName: string;
  initialEnd: number;
  initialStart?: number;
  /** Pass the gene track from buildTracksConfig so session uses same displays (with JEXL color1/labels). Like METT: displays: track.displays */
  geneTrackConfig?: { trackId: string; type: string; displays: any[] };
}) {
  const start = opts.initialStart ?? 0;
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
            id: geneTrack?.trackId ?? 'gene_features',
            type: 'FeatureTrack',
            configuration: geneTrack?.trackId ?? 'gene_features',
            minimized: false,
            visible: true,
            // Use full track displays (with renderer color1 + labels JEXL) so highlight and essentiality colors apply. Match METT: displays: track.displays
            displays: geneTrack?.displays ?? [
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

