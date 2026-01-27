# MGnify JBrowse NPM Component

## Usage

Run `npm install` and then `npm start` to start a development instance.

Run `npm build` which produces a `build` directory that can be deployed to a
static web server

## GeneViewer (standalone component)

This repo now exports a `GeneViewer` React component that provides:

- JBrowse Linear Genome View (assembly + gene track)
- Selected gene highlighting
- Optional essentiality coloring driven by a local CSV (no API/database)
- Feature panel (basic annotations from GFF)
- Synced “genes in view” table (based on current viewport)

### Library usage

```ts
import { GeneViewer } from 'mgnify-jbrowse'
```

### Demo app configuration (CRA)

The included demo app reads URLs from env vars:

```bash
REACT_APP_ASSEMBLY_NAME=your_assembly_name
REACT_APP_FASTA_GZ_URL=https://.../genome.fasta.gz
REACT_APP_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
REACT_APP_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
REACT_APP_GFF_BGZ_URL=https://.../annotations.gff.bgz
REACT_APP_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi

# Optional:
REACT_APP_ESSENTIALITY_CSV_URL=https://.../essentiality.csv
REACT_APP_GFF_IX_URL=https://.../annotations.gff.bgz.ix
REACT_APP_GFF_IXX_URL=https://.../annotations.gff.bgz.ixx
REACT_APP_GFF_META_URL=https://.../annotations.gff.bgz_meta.json
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
