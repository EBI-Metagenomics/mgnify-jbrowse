# MGnify JBrowse NPM Component

## Usage

Run `npm install -force` and then `npm start` to start a development instance

Run `npm build` which produces a `build` directory that can be deployed to a
static web server

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
