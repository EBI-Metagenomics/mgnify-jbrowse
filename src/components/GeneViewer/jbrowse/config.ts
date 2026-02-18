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

  const tracks: any[] = [
    {
      type: 'FeatureTrack',
      trackId: 'gene_features',
      name: annotation.name ?? 'Genes',
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

export function buildDefaultSessionConfig(opts: {
  assemblyName: string;
  initialRefName: string;
  initialEnd: number;
  initialStart?: number;
}) {
  const start = opts.initialStart ?? 0;
  const end = Math.max(start + 1, opts.initialEnd);

  return {
    name: 'Gene Viewer session',
    // Disable JBrowse's built-in feature detail drawer so we use our custom panel only (like METT)
    widgets: {
      BaseFeatureWidget: { type: 'BaseFeatureWidget', disabled: true },
    },
    views: [
      {
        type: 'LinearGenomeView',
        configuration: {
          header: { disable: true, hidden: true },
          onFeatureClick: null,
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
            type: 'FeatureTrack',
            configuration: 'gene_features',
            displays: [
              {
                id: 'gene_features-LinearBasicDisplay',
                type: 'LinearBasicDisplay',
                rendererTypeName: 'SvgFeatureRenderer',
                renderer: {
                  type: 'SvgFeatureRenderer',
                  color1: 'jexl:getGeneColor(feature)',
                },
                height: 280,
              },
            ],
          },
        ],
      },
    ],
  };
}

