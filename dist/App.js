"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@fontsource/roboto");
const index_1 = require("./index");
function App() {
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
    const essentialityCsvUrl = process.env.REACT_APP_ESSENTIALITY_CSV_URL || undefined;
    if (!fastaUrl || !faiUrl || !gziUrl || !gffUrl || !tbiUrl) {
        return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { marginTop: 0 }, children: "MGnify JBrowse GeneViewer demo" }), (0, jsx_runtime_1.jsx)("p", { children: "Set the following environment variables to run the demo:" }), (0, jsx_runtime_1.jsx)("pre", { style: { background: "#f3f4f6", padding: 12, borderRadius: 8, overflow: "auto" }, children: `REACT_APP_ASSEMBLY_NAME=your_assembly_name
REACT_APP_FASTA_GZ_URL=https://.../genome.fasta.gz
REACT_APP_FASTA_FAI_URL=https://.../genome.fasta.gz.fai
REACT_APP_FASTA_GZI_URL=https://.../genome.fasta.gz.gzi
REACT_APP_GFF_BGZ_URL=https://.../annotations.gff.bgz
REACT_APP_GFF_TBI_URL=https://.../annotations.gff.bgz.tbi
# Optional:
REACT_APP_ESSENTIALITY_CSV_URL=https://.../essentiality.csv
REACT_APP_GFF_IX_URL=https://.../annotations.gff.bgz.ix
REACT_APP_GFF_IXX_URL=https://.../annotations.gff.bgz.ixx
REACT_APP_GFF_META_URL=https://.../annotations.gff.bgz_meta.json` })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 16, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }, children: [(0, jsx_runtime_1.jsx)("h2", { style: { marginTop: 0 }, children: "MGnify JBrowse GeneViewer demo" }), (0, jsx_runtime_1.jsx)(index_1.GeneViewer, { assembly: {
                    name: assemblyName,
                    fasta: { fastaUrl, faiUrl, gziUrl },
                }, annotation: {
                    name: "Structural Annotation",
                    gff: { gffUrl, tbiUrl, ixUrl, ixxUrl, metaUrl },
                }, essentiality: {
                    enabled: !!essentialityCsvUrl,
                    csvUrl: essentialityCsvUrl,
                    csvJoinColumn: "locus_tag",
                    csvStatusColumn: "essentiality_call",
                    featureJoinAttribute: "locus_tag",
                }, ui: {
                    showLegends: true,
                    showFeaturePanel: true,
                    showGenesInViewTable: true,
                    genesInViewTypes: ["gene"],
                }, heightPx: 720 })] }));
}
exports.default = App;
