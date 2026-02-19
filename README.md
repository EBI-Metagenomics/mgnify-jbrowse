<p align="left">
  <img src="public/MGnify-logo.svg" alt="MGnify" width="120" />
</p>

# MGnify JBrowse

A React component library for embedding JBrowse genome viewers in MGnify applications. Exports two main components:

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

## Demo app configuration

The demo app reads URLs from env vars (Vite `VITE_` prefix). See `.env.example`:

```bash
VITE_ASSEMBLY_NAME=your_assembly_name
VITE_FASTA_GZ_URL=https://.../genome.fasta.gz
VITE_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
VITE_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
VITE_GFF_BGZ_URL=https://.../annotations.gff.bgz
VITE_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi

# Optional (defaults to public/essentiality/essentiality_sample.csv):
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
# 1. Decompress
gunzip -c ERZ1049444_FASTA.fasta.gz > ERZ1049444_FASTA.fasta

# 2. Recompress as BGZF
bgzip ERZ1049444_FASTA.fasta

# 3. Verify BGZF
file ERZ1049444_FASTA.fasta.gz

# 4. Create FASTA index
samtools faidx ERZ1049444_FASTA.fasta.gz
```

### GFF indexes

```bash
# 1. Decompress
bgzip -d -c ERZ1049444_FASTA_annotations.gff.bgz > ERZ1049444_FASTA_annotations.gff

# 2. Recompress with standard gzip
gzip ERZ1049444_FASTA_annotations.gff

# 3. Tabix index
tabix -p gff ERZ1049444_FASTA_annotations.gff.bgz

# 4. JBrowse text index (optional, for search)
jbrowse text-index --file ERZ1049444_FASTA_annotations.gff.bgz --exclude none --attributes interpro,pfam,eggnog
```

### Sample FTP URLs

- FASTA: `https://www.ebi.ac.uk/metagenomics/api/v1/analyses/MGYA00516474/file/ERZ1049444_FASTA.fasta.gz`
- GFF: `https://www.ebi.ac.uk/metagenomics/api/v1/analyses/MGYA00516474/file/ERZ1049444_FASTA_annotations.gff.bgz`

---

## Local data server

If using `localhost` URLs for data, run a static server for assets:

```bash
npx serve public -p 3001
```

Then run the app in another terminal: `npm start` (Vite serves on 5173 by default).
