import "@fontsource/roboto";
import React from "react";
import { GeneViewer } from "./components/GeneViewer";

export default function App() {
  // For the demo app, configure URLs via env vars.
  // These should point to BGZF+indexed FASTA/GFF assets reachable by the browser.
  const assemblyName = import.meta.env.VITE_ASSEMBLY_NAME || "assembly";

  const fastaUrl = import.meta.env.VITE_FASTA_GZ_URL || "";
  const faiUrl = import.meta.env.VITE_FASTA_FAI_URL || "";
  const gziUrl = import.meta.env.VITE_FASTA_GZI_URL || "";

  const gffUrl = import.meta.env.VITE_GFF_BGZ_URL || "";
  const tbiUrl = import.meta.env.VITE_GFF_TBI_URL || "";
  const ixUrl = import.meta.env.VITE_GFF_IX_URL || undefined;
  const ixxUrl = import.meta.env.VITE_GFF_IXX_URL || undefined;
  const metaUrl = import.meta.env.VITE_GFF_META_URL || undefined;

  const essentialityCsvUrl = import.meta.env.VITE_ESSENTIALITY_CSV_URL || "/essentiality/essentiality_sample.csv";

  if (!fastaUrl || !faiUrl || !gziUrl || !gffUrl || !tbiUrl) {
    return (
      <div style={{ padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        <h2 style={{ marginTop: 0 }}>MGnify JBrowse GeneViewer demo</h2>
        <p>
          Set the following environment variables to run the demo:
        </p>
        <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, overflow: "auto" }}>
{`VITE_ASSEMBLY_NAME=your_assembly_name
VITE_FASTA_GZ_URL=https://.../genome.fasta.gz
VITE_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
VITE_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
VITE_GFF_BGZ_URL=https://.../annotations.gff.bgz
VITE_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi
# Optional:
VITE_ESSENTIALITY_CSV_URL=https://.../essentiality.csv
VITE_GFF_IX_URL=https://.../annotations.gff.bgz.ix
VITE_GFF_IXX_URL=https://.../annotations.gff.bgz.ixx
VITE_GFF_META_URL=https://.../annotations.gff.bgz_meta.json`}
        </pre>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <h2 style={{ marginTop: 0 }}>MGnify JBrowse GeneViewer demo</h2>
      <GeneViewer
        assembly={{
          name: assemblyName,
          fasta: { fastaUrl, faiUrl, gziUrl },
        }}
        annotation={{
          name: "Structural Annotation",
          gff: { gffUrl, tbiUrl, ixUrl, ixxUrl, metaUrl },
        }}
        essentiality={{
          enabled: true,
          csvUrl: essentialityCsvUrl,
          csvJoinColumn: "locus_tag",
          csvStatusColumn: "essentiality",
          featureJoinAttribute: "locus_tag",
        }}
        ui={{
          showLegends: true,
          showFeaturePanel: true,
          showGenesInViewTable: true,
          genesInViewTypes: ["gene"],
        }}
        heightPx={720}
      />
    </div>
  );
}
