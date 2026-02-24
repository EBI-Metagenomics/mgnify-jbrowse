# Docker deployment

This guide covers running the mgnify-jbrowse demo app in Docker.

## Build and run

```bash
# Build the image
docker build -t mgnify-jbrowse .

# Run (demo app at http://localhost:8080)
docker run -p 8080:80 mgnify-jbrowse
```

## Configuration

The demo app reads URLs from environment variables at **build time** (Vite embeds them). To use custom data URLs:

1. Create `.env.local` with your `VITE_*` variables (see [Demo app configuration](../README.md#demo-app-configuration)).
2. Ensure `.dockerignore` does **not** exclude `.env.local` if you want it in the image, or pass build args:

```bash
docker build \
  --build-arg VITE_ASSEMBLY_NAME=my-assembly \
  --build-arg VITE_FASTA_GZ_URL=https://.../genome.fasta.gz \
  --build-arg VITE_FASTA_FAI_URL=https://.../genome.fasta.gz.fai \
  --build-arg VITE_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi \
  --build-arg VITE_GFF_BGZ_URL=https://.../annotations.gff.bgz \
  --build-arg VITE_GFF_CSI_URL=https://.../annotations.gff.bgz.csi \
  -t mgnify-jbrowse .
```

To use custom URLs, copy `.env.example` to `.env.local`, fill in your values, and ensure `.env.local` is not excluded by `.dockerignore` (it is excluded by default for security; remove `.env.local` from `.dockerignore` if you want to bake config into the image).

## Serving sample data

The `public/sample-data/` files are copied into the image. If your `.env.local` points to `http://localhost:8080/sample-data/...`, the built app will expect to be served from port 8080. Use relative paths like `/sample-data/...` so the same build works regardless of host/port.

## Using the component in your own Docker setup

If you embed mgnify-jbrowse in your own app, add it as a dependency and build your app as usual. No special Docker configuration is required for the component itself.
