# MGnify JBrowse NPM Component

## Usage

Run `npm install` and then `npm start` to start a development instance.

Run `npm build` which produces a `build` directory that can be deployed to a
static web server

---

## Testing

### 1. Local (demo app)

```bash
# Install and start the dev server
npm install
npm start
```

The app reads URLs from `.env.local` (or env vars). Use `VITE_` prefix (same as METT dataportal). See `.env.example`. Ensure:

- FASTA, FAI, GZI, GFF, and TBI URLs point to reachable files.
- With Vite, files in `public/` are served at the root (e.g. `http://localhost:5173/essentiality/essentiality_sample.csv`).
- If you use `localhost:3001` for data, run a separate static server, e.g.:

```bash
npx serve public -p 3001
```

Then run the app in another terminal: `npm start` (Vite serves on 5173 by default).

### 2. As a component in another app

**Option A – npm link (for local development)**

```bash
# In mgnify-jbrowse repo
npm run build
npm link

# In your sample app
npm link mgnify-jbrowse
```

**Option B – install from local path**

```bash
# In your sample app
npm install /path/to/mgnify-jbrowse
```

**Option C – pack and install tarball**

```bash
# In mgnify-jbrowse repo
npm pack
# Creates mgnify-jbrowse-0.1.2.tgz

# In your sample app
npm install /path/to/mgnify-jbrowse-0.1.2.tgz
```

**Usage in the consuming app:**

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
      }}
      heightPx={600}
    />
  );
}
```

Ensure the host app has `react`, `react-dom`, and `@jbrowse/sv-core` as dependencies (or peer deps).

### 3. Docker

Add a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:lib
RUN npm run build:app

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Add `nginx.conf` to serve SPA and static assets:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Then:

```bash
docker build -t mgnify-jbrowse .
docker run -p 8080:80 mgnify-jbrowse
```

Open http://localhost:8080. FASTA/GFF/essentiality URLs must be reachable from the browser (use absolute URLs, e.g. to a CDN or another server).

## GeneViewer (standalone component)

This repo now exports a `GeneViewer` React component that provides:

- JBrowse Linear Genome View (assembly + gene track)
- Selected gene highlighting
- Optional essentiality coloring driven by a local CSV (no API/database)
- Feature panel (basic annotations from GFF)
- Synced “genes in view” table (based on current viewport)

### Library usage

```ts
import { GeneViewer, JBrowseContigViewer } from 'mgnify-jbrowse'
```

### Essentiality CSV format

The plugin expects a CSV with columns `locus_tag` and `essentiality`. Example:

```csv
species,media,element,locus_tag,essentiality
uniformis,liquid,gene,BU_ATCC8492_00001,essential
uniformis,solid,gene,BU_ATCC8492_00001,essential
uniformis,liquid,gene,BU_ATCC8492_00002,not_essential
```

### Demo app configuration (Vite)

The included demo app reads URLs from env vars (same as METT dataportal). Use `VITE_` prefix. See `.env.example`:

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

### Generate Indexes

#### FTP URLs
FASTA File URL: https://www.ebi.ac.uk/metagenomics/api/v1/analyses/MGYA00516474/file/ERZ1049444_FASTA.fasta.gz
GFF File URL: https://www.ebi.ac.uk/metagenomics/api/v1/analyses/MGYA00516474/file/ERZ1049444_FASTA_annotations.gff.bgz

#### Generating FASTA file indexes

##### Step 1: Decompress the FASTA File
```bash 
$ gunzip -c ERZ1049444_FASTA.fasta.gz > ERZ1049444_FASTA.fasta
```
##### Step 2: Recompress as BGZF
```bash 
$ bgzip ERZ1049444_FASTA.fasta
```
##### To confirm it's BGZF:
```bash 
$ file ERZ1049444_FASTA.fasta.gz
```
##### Step 3: Create the FASTA Index
```bash 
$ samtools faidx ERZ1049444_FASTA.fasta.gz
```

#### Generating GFF file indexes

##### Step 1: Decompress the BGZF file
```bash 
$ bgzip -d -c ERZ1049444_FASTA_annotations.gff.bgz > ERZ1049444_FASTA_annotations.gff
```
##### Step 2: Recompress with Standard Gzip
```bash 
$ gzip ERZ1049444_FASTA_annotations.gff
```
#####  tabix index
```bash 
$ tabix -p gff ERZ1049444_FASTA_annotations.gff.bgz
```
##### Step 3: Generate .ix and .ixx Index Files
```bash 
$ jbrowse text-index --file ERZ1049444_FASTA_annotations.gff.bgz --exclude none --attributes interpro,pfam,eggnog 
```
