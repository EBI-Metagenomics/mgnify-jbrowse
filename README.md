<p align="left">
  <img src="public/MGnify-logo.svg" alt="MGnify" width="120" />
</p>

# MGnify JBrowse

A React component library for embedding JBrowse genome viewers in MGnify applications. Exports two main components:

**Production use:** The component is deployed in the [METT Data Portal](https://www.gut-microbes.org/), where researchers explore microbial genomes such as [Bacteroides uniformis (BU_ATCC8492)](http://www.gut-microbes.org/genome/BU_ATCC8492).

- **GeneViewer** – Standalone gene viewer with essentiality coloring, feature panel, and genes-in-view table
- **JBrowseContigViewer** – Contig-level genome browser for MGnify contig viewing workflows

## Install from npm

Use the published package in your React app:

```bash
npm install mgnify-jbrowse
```

**Peer dependencies:** Your app needs `react`, `react-dom`, and `@jbrowse/sv-core`. npm 7+ installs these automatically when you install `mgnify-jbrowse`. If you see missing-module errors, run: `npm install react react-dom @jbrowse/sv-core`.

```tsx
import { GeneViewer } from 'mgnify-jbrowse';
import '@fontsource/roboto';

<GeneViewer
  assembly={{ name: 'my-assembly', fasta: { fastaUrl, faiUrl, gziUrl } }}
  annotation={{ gff: { gffUrl, tbiUrl } }}
  heightPx={600}
/>
```

See [docs/USAGE.md](docs/USAGE.md) for a full user guide with copy-paste examples and extension ideas.

---

## Quick start (development)

```bash
npm install
npm start
```

The demo app runs at `http://localhost:5173` and uses the GeneViewer component. Configure URLs via `.env.local` (see [Demo app configuration](#demo-app-configuration)).

---

## Documentation

| Document | Description |
|----------|-------------|
| [docs/USAGE.md](docs/USAGE.md) | **User guide** – Install from npm, examples, extension ideas |
| [docs/EXERCISES.md](docs/EXERCISES.md) | **Learn by doing** – Hands-on exercises and tests |
| [docs/DOCKER.md](docs/DOCKER.md) | Docker deployment guide |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture overview, project structure, data flow, key files |
| [docs/QuickStartGuide.md](docs/QuickStartGuide.md) | **Developer guide** – Quick start guide: setup, common tasks, troubleshooting |
| [docs/README.md](docs/README.md) | Documentation index |

---

## Usage

### GeneViewer (standalone component)

GeneViewer provides:

- JBrowse Linear Genome View (assembly + gene track)
- Selected gene highlighting (blue bar)
- Optional essentiality coloring driven by a local CSV (no API/database)
- Feature panel (basic annotations from GFF)
- Synced "genes in view" table (based on current viewport)

```tsx
import { GeneViewer } from 'mgnify-jbrowse';

function App() {
  return (
    <GeneViewer
      assembly={{
        name: 'my-assembly',
        fasta: { fastaUrl: '...', faiUrl: '...', gziUrl: '...' },
      }}
      annotation={{
        name: 'Annotations',
        gff: { gffUrl: '...', tbiUrl: '...' },
      }}
      essentiality={{
        enabled: true,
        csvUrl: '/essentiality/essentiality_sample.csv',
        csvJoinColumn: 'locus_tag',
        csvStatusColumn: 'essentiality',
        featureJoinAttribute: 'locus_tag',
      }}
      ui={{
        showLegends: true,
        showFeaturePanel: true,
        showGenesInViewTable: true,
      }}
      heightPx={600}
    />
  );
}
```

### JBrowseContigViewer

```tsx
import { JBrowseContigViewer, type GenomeMeta } from 'mgnify-jbrowse';

function App() {
  const genomeMeta: GenomeMeta = { /* ... */ };
  return (
    <JBrowseContigViewer
      genomeMeta={genomeMeta}
      fileLocations={{
        fasta: 'https://.../genome.fasta.gz',
        fai: 'https://.../genome.fasta.gz.fai',
        gzi: 'https://.../genome.fasta.gz.gzi',
      }}
    />
  );
}
```

### Library exports

```ts
import {
  GeneViewer,
  JBrowseContigViewer,
  type GeneViewerProps,
  type JBrowseContigViewerProps,
  type GenomeMeta,
  type GeneViewerAssemblyConfig,
  type GeneViewerAnnotationConfig,
  COLORS,
  DEFAULT_ESSENTIALITY_COLOR_MAP,
  getColorForEssentiality,
  getIconForEssentiality,
  normalizeEssentialityStatus,
} from 'mgnify-jbrowse';
```

---

## Sample data (quick start)

Sample FASTA, GFF, and essentiality files are in `public/sample-data/` for local testing. **Not included in the npm package** (excluded via `package.json` files and from release tarballs via `.gitattributes`).

- See [public/sample-data/README.md](public/sample-data/README.md) for format requirements and usage.
- The essentiality CSV is ready to use; FASTA and GFF may need conversion to BGZF (see [Generating indexes](#generating-indexes)).

---

## Demo app configuration

The demo app reads URLs from env vars (Vite `VITE_` prefix). See `.env.example`:

```bash
VITE_ASSEMBLY_NAME=your_assembly_name
VITE_FASTA_GZ_URL=https://.../genome.fasta.gz
VITE_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
VITE_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
VITE_GFF_BGZ_URL=https://.../annotations.gff.bgz
VITE_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi

# Optional (defaults to public/sample-data/essentiality/essentiality_sample.csv):
VITE_ESSENTIALITY_CSV_URL=https://.../essentiality.csv
VITE_GFF_IX_URL=https://.../annotations.gff.bgz.ix
VITE_GFF_IXX_URL=https://.../annotations.gff.bgz.ixx
VITE_GFF_META_URL=https://.../annotations.gff.bgz_meta.json
```

---

## Essentiality CSV format

The plugin expects a CSV with columns for locus tag and essentiality status. Example:

```csv
species,media,element,locus_tag,essentiality
uniformis,liquid,gene,BU_ATCC8492_00001,essential
uniformis,solid,gene,BU_ATCC8492_00001,essential
uniformis,liquid,gene,BU_ATCC8492_00002,not_essential
```

Configure `csvJoinColumn` and `csvStatusColumn` to match your CSV headers (defaults: `locus_tag`, `essentiality`).

---

## Build & deploy

```bash
# Build library (output to dist/)
npm run build

# Build demo app (output to build/)
npm run build:app

# Preview app build
npm run preview
```

---

## Using as a dependency

**Option A – npm link (local development)**

```bash
# In mgnify-jbrowse repo
npm run build
npm link

# In your app
npm link mgnify-jbrowse
```

**Option B – install from path**

```bash
npm install /path/to/mgnify-jbrowse
```

**Option C – pack and install tarball**

```bash
cd mgnify-jbrowse
npm pack
# Creates mgnify-jbrowse-0.1.3.tgz

# In your app
npm install /path/to/mgnify-jbrowse-0.1.3.tgz
```

**Peer dependencies:** Host app must have `react`, `react-dom`, and `@jbrowse/sv-core` as dependencies (or peer deps).

---

## Generating indexes

### FASTA indexes

```bash
# 1. Decompress (if required)
gunzip -c BU_ATCC8492VPI0062_NT5002.1.fa.gz > BU_ATCC8492VPI0062_NT5002.1.fa

# 2. Recompress as BGZF
bgzip BU_ATCC8492VPI0062_NT5002.1.fasta

# 3. Verify BGZF
file BU_ATCC8492VPI0062_NT5002.1.fasta.gz

# 4. Create FASTA index
samtools faidx BU_ATCC8492VPI0062_NT5002.1.fasta.gz
```

### GFF indexes

```bash
# 1. Decompress (if required)
gunzip -c BU_ATCC8492_annotations.gff.gz > BU_ATCC8492_annotations.gff

# 2. Recompress as BGZF
bgzip BU_ATCC8492_annotations.gff

# 3. Tabix index
tabix -p gff BU_ATCC8492_annotations.gff.gz

# 4. JBrowse text index (optional, for search)
jbrowse text-index --file BU_ATCC8492_annotations.gff.gz --exclude none --attributes interpro,pfam,eggnog

# Generate the metadata file (.gff.gz_meta.json)
# update the localPath and LocationType
```

### Sample FTP URLs

- FASTA: `https://ftp.ebi.ac.uk/pub/databases/mett/all_hd_isolates/deduplicated_assemblies/BU_ATCC8492VPI0062_NT5002.1.fa`
- GFF: `https://ftp.ebi.ac.uk/pub/databases/mett/annotations/v1_2024-04-15/BU_ATCC8492/functional_annotation/merged_gff/BU_ATCC8492_annotations.gff`

---

## Local data server

If using `localhost` URLs for data, run a static server for assets:

```bash
npx serve public -p 3001
```

Then run the app in another terminal: `npm start` (Vite serves on 5173 by default).
