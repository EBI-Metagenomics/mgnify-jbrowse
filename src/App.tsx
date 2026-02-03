import "@fontsource/roboto";
import React from "react";
import { GeneViewer } from "./index";

export default function App() {
  // For the demo app, configure URLs via env vars.
  // These should point to BGZF+indexed FASTA/GFF assets reachable by the browser.
  const assemblyName = process.env.REACT_APP_ASSEMBLY_NAME || "assembly";

  const fastaUrl = process.env.REACT_APP_FASTA_GZ_URL || "";
  const faiUrl = process.env.REACT_APP_FASTA_FAI_URL || "";
  const gziUrl = process.env.REACT_APP_FASTA_GZI_URL || "";

  const gffUrl = process.env.REACT_APP_GFF_BGZ_URL || "";
  const tbiUrl = process.env.REACT_APP_GFF_TBI_URL || "";
  const ixUrl = process.env.REACT_APP_GFF_IX_URL || undefined;
  const ixxUrl = process.env.REACT_APP_GFF_IXX_URL || undefined;
  const metaUrl = process.env.REACT_APP_GFF_META_URL || undefined;

  const essentialityCsvUrl = process.env.REACT_APP_ESSENTIALITY_CSV_URL || "/essentiality/essentiality_sample.csv";

  if (!fastaUrl || !faiUrl || !gziUrl || !gffUrl || !tbiUrl) {
    return (
      <div style={{ padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        <h2 style={{ marginTop: 0 }}>MGnify JBrowse GeneViewer demo</h2>
        <p>
          Set the following environment variables to run the demo:
        </p>
        <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 8, overflow: "auto" }}>
{`REACT_APP_ASSEMBLY_NAME=your_assembly_name
REACT_APP_FASTA_GZ_URL=https://.../genome.fasta.gz
REACT_APP_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
REACT_APP_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
REACT_APP_GFF_BGZ_URL=https://.../annotations.gff.bgz
REACT_APP_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi
# Optional:
REACT_APP_ESSENTIALITY_CSV_URL=https://.../essentiality.csv
REACT_APP_GFF_IX_URL=https://.../annotations.gff.bgz.ix
REACT_APP_GFF_IXX_URL=https://.../annotations.gff.bgz.ixx
REACT_APP_GFF_META_URL=https://.../annotations.gff.bgz_meta.json`}
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
