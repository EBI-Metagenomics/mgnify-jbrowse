export type EssentialityStatus =
  | 'essential'
  | 'essential_liquid'
  | 'essential_solid'
  | 'not_essential'
  | 'unclear'
  | 'unknown';

export type EssentialityColorMap = Partial<Record<EssentialityStatus, string>> & {
  unknown?: string;
};

export interface FastaBgzipSource {
  /** BGZF-compressed FASTA URL/path. */
  fastaUrl: string;
  /** `samtools faidx` output (e.g. `.fai`) */
  faiUrl: string;
  /** BGZF index (e.g. `.gzi`) */
  gziUrl: string;
}

export interface GffBgzipSource {
  /** BGZF-compressed GFF3 URL/path (e.g. `.gff.bgz`) */
  gffUrl: string;
  /** Tabix index (e.g. `.tbi`) */
  tbiUrl: string;
  /** Optional trix search indexes */
  ixUrl?: string;
  ixxUrl?: string;
  metaUrl?: string;
}

export interface GeneViewerAssemblyConfig {
  name: string;
  /** Optional alias shown to the user */
  displayName?: string;
  fasta: FastaBgzipSource;
}

export interface GeneViewerAnnotationConfig {
  name?: string;
  gff: GffBgzipSource;
}

export interface EssentialityConfig {
  /** If true, apply essentiality coloring to the gene track. */
  enabled?: boolean;
  /** Optional CSV URL/path. If omitted, essentiality is treated as unknown for all features. */
  csvUrl?: string;
  /** CSV column that should be joined to GFF features (defaults to `locus_tag`). */
  csvJoinColumn?: string;
  /**
   * Feature attribute key to match against (defaults to `locus_tag`).
   * This assumes the GFF has `locus_tag=...` attributes.
   */
  featureJoinAttribute?: string;
  /** CSV column providing the essentiality status (defaults to `essentiality_call`). */
  csvStatusColumn?: string;
  /** Custom color mapping for statuses. */
  colorMap?: EssentialityColorMap;
}

export interface GeneViewerUiConfig {
  showLegends?: boolean;
  showFeaturePanel?: boolean;
  showGenesInViewTable?: boolean;
  /**
   * Which GFF feature types should appear in the table.
   * Defaults to `['gene']`.
   */
  genesInViewTypes?: string[];
}

export interface GeneViewerInitialSelection {
  locusTag?: string;
}

export interface GeneViewerProps {
  assembly: GeneViewerAssemblyConfig;
  annotation: GeneViewerAnnotationConfig;
  essentiality?: EssentialityConfig;
  ui?: GeneViewerUiConfig;
  initialSelection?: GeneViewerInitialSelection;
  /**
   * Optional initial location string, e.g. `contig_1:1..10000`.
   * If omitted, JBrowse will pick a default region.
   */
  initialLocation?: string;
  /** Fixed height for the overall viewer area. */
  heightPx?: number;
}

