# MGnify JBrowse – Architecture Overview

This document describes the architecture of the MGnify JBrowse component library, including the GeneViewer (standalone gene viewer with essentiality) and JBrowseContigViewer (contig-level genome browser).

---

## Project structure

```
src/
├── lib/                          # Package entry point (exports public API)
│   └── index.ts
├── JBrowseContigViewer/          # Contig-level genome browser
│   ├── index.ts
│   ├── JBrowseContigViewer.tsx
│   ├── assembly.ts
│   ├── defaultSessionConfig.ts
│   ├── tracks.ts
│   └── types.ts                  # GenomeMeta
│
├── components/GeneViewer/        # Standalone gene viewer (essentiality, feature panel)
│   ├── index.ts
│   ├── GeneViewer.tsx
│   ├── types.ts
│   ├── constants.ts
│   ├── essentiality.ts
│   ├── gff.ts
│   ├── components/               # UI sub-components
│   │   ├── GeneViewerLegends.tsx
│   │   ├── FeaturePanel.tsx
│   │   └── GenesInViewTable.tsx
│   ├── hooks/
│   │   ├── useJBrowseVisibleRegion.ts
│   │   ├── useGeneViewerEssentiality.ts
│   │   ├── useGeneViewerSessionSync.ts
│   │   ├── useGeneViewerClickHandler.ts
│   │   ├── useGeneViewerInit.ts
│   │   ├── useGeneViewerZoom.ts
│   │   ├── useGeneViewerTrackRefresh.ts
│   │   ├── useGeneViewerTableNav.ts
│   │   ├── useGeneViewerHideDrawer.ts
│   │   └── useGeneViewerSelection.ts
│   ├── utils/
│   │   ├── featureAttrUtils.ts
│   │   └── parseUtils.ts
│   └── jbrowse/
│       ├── config.ts
│       ├── plugin.ts
│       └── Gff3TabixWithEssentialityAdapter.ts
│
├── App.tsx                       # Demo app (uses GeneViewer)
└── index.tsx                     # App entry
```

---

## GeneViewer – High-level Organisation

```
┌─────────────────────────────────────────────────────────────────────────┐
│  GeneViewer (React)                                                      │
│  • State: selectedGeneId, genesInView, viewState, essentiality           │
│  • Syncs selection: table ↔ JBrowse ↔ custom panel                       │
└─────────────────────────────────────────────────────────────────────────┘
         │                    │                        │
         ▼                    ▼                        ▼
┌───────────────┐   ┌─────────────────────┐   ┌──────────────────────────┐
│ GenesInView   │   │ JBrowse (embed)      │   │ FeaturePanel (custom)     │
│ Table         │   │ • LinearGenomeView   │   │ • Locus, product, type    │
│ • Rows =      │   │ • Feature track      │   │ • Attributes              │
│   genes in    │   │ • JEXL color =       │   │ • Essentiality badge      │
│   viewport    │   │   getGeneColor()     │   │ • No JBrowse drawer       │
└───────────────┘   └─────────────────────┘   └──────────────────────────┘
         │                     │
         │  onSelect(id)       │  session.selection (poll 300ms)
         └──────────┬──────────┘
                    ▼
            setSelectedGeneId(id)
                    │
                    ├──► setGeneViewerJexlContext() + window.selectedGeneId
                    ├──► display.reload() + setWidth() to force track repaint
                    └──► selectedFeature → panel + table highlight
```

---

## GeneViewer – Data flow

1. **Assembly + annotation**  
   Props define assembly (FASTA/FAI/GZI) and annotation (GFF/TBI). Config is built in `jbrowse/config.ts` (assembly, tracks, default session).

2. **JBrowse view state**  
   Created once in `GeneViewer` via `createViewState({ config, plugins: [GeneViewerJBrowsePlugin] })`. The plugin registers JEXL functions (`getGeneColor`, `getEssentialityIcon`, etc.) that run inside the track renderer.

3. **Selection**  
   - **Table → app:** `GenesInViewTable` calls `onSelect(locusTag)` → `setSelectedGeneId(locusTag)`; optional `view.centerAt()` for table-driven navigation.  
   - **JBrowse → app:** A 300ms poll reads `session.selection`, extracts locus_tag/ID (with `extractLocusFromFeature`), and calls `setSelectedGeneId`.  
   - **Cooldown:** For 2s after a table click, the poll does not overwrite selection so table choice stays.

4. **Gene highlight (blue bar)**  
   - **JEXL:** Track renderer uses `color1: 'jexl:getGeneColor(feature)'`.  
   - **Plugin:** `getGeneColor(feature)` compares feature's locus_tag / ID / name to the current selection. Selection is read from a **global fallback** `window.selectedGeneId` first, then `ctx.selectedGeneId`, so JBrowse's JEXL always sees the latest value regardless of React lifecycle.  
   - **Context:** `setGeneViewerJexlContext()` is called from `useLayoutEffect` (and also sets `window.selectedGeneId`).  
   - **Repaint:** When selection or essentiality changes, `useGeneViewerTrackRefresh` runs `display.reload()` on all track displays and a brief `view.setWidth(w±ε)` to force the view to repaint so the new color is visible.

5. **Genes in view**  
   `useJBrowseVisibleRegion` gets the current visible region from the view (with a cap, e.g. 5Mb). That drives a GFF region query; results are stored in `genesInView` and shown in the table.

---

## GeneViewer – Key files

| Area            | File / path                          | Role |
|-----------------|--------------------------------------|------|
| Entry           | `GeneViewer.tsx`                     | State, sync (selection poll, JEXL context, reload), layout (JBrowse \| panel, table below). |
| UI components   | `components/`                        | GeneViewerLegends, FeaturePanel, GenesInViewTable. |
| Hooks           | `hooks/`                             | useJBrowseVisibleRegion, useGeneViewerInit, useGeneViewerSelection, useGeneViewerTrackRefresh, etc. |
| JBrowse config  | `jbrowse/config.ts`                  | Assembly, tracks (GFF adapter, SvgFeatureRenderer, `color1: jexl:getGeneColor(feature)`), default session. |
| JBrowse plugin  | `jbrowse/plugin.ts`                  | JEXL: `getGeneColor`, `getEssentialityIcon`, etc. Selection from `window.selectedGeneId` + `ctx`. |
| Visible region  | `hooks/useJBrowseVisibleRegion.ts`   | Reads view's displayed region (with cap), used for "genes in view" and GFF query. |
| Table           | `components/GenesInViewTable.tsx`    | Renders genes in view; `onSelect(locusTag)` for selection. |
| Panel           | `components/FeaturePanel.tsx`        | Shows selected feature details and attributes (no scroll). |
| GFF             | `gff.ts`                            | FAI ref, GFF region query, `GffFeature` type. |
| Essentiality    | `essentiality.ts`                   | CSV index, colors, icons; used in plugin and panel. |

---

## JBrowseContigViewer

A simpler contig-level genome browser that uses `GenomeMeta` and file locations. Used for MGnify contig viewing workflows.

- **assembly.ts** – Builds assembly config from GenomeMeta + file URLs (fasta, fai, gzi).
- **tracks.ts** – Builds feature track config (GFF3 tabix).
- **defaultSessionConfig.ts** – Session layout (displayed regions, track visibility).
- **types.ts** – `GenomeMeta` interface.

---

## Design decisions

- **Single source of truth for selection:** React state `selectedGeneId` (and derived `selectedLocusTag`). Table and JBrowse both feed into it; panel and table read from it.  
- **No JBrowse feature drawer:** Session/widget overrides and DOM hiding ensure only the custom feature panel is used.  
- **Highlight robustness (same as METT):** Selection is mirrored to `window.selectedGeneId` so that when JBrowse evaluates JEXL in its own render cycle, it always sees the current selection.  
- **Table width:** Table is laid out in a grid so its width matches the JBrowse column (same `gridTemplateColumns` as the row above).  
- **No scroll in table or attributes:** Table and feature panel attributes section are not given a fixed height/scroll so they grow with content.

---

## Quick checklist for demos

- [ ] Selection from **table** updates panel and (after reload) blue bar in JBrowse.  
- [ ] Selection from **JBrowse** (click gene) updates panel and table row.  
- [ ] Table click optionally centers the gene in the view (`centerAt`), without changing zoom.  
- [ ] Initial load shows a sensible region and zoom (e.g. `showAllRegions()` once).  
- [ ] Essentiality (if enabled) drives track color when the gene is not selected; selected gene is always blue.

---

## Troubleshooting highlight

If the blue bar still does not show:

1. **Selection set?** In the UI, "Selected: …" should show the locus tag when you click.  
2. **JEXL sees selection?** In the browser console: `window.selectedGeneId` should match the selected gene when something is selected (same as METT).  
3. **Track config?** In `config.ts`, the track's display renderer must have `color1: 'jexl:getGeneColor(feature)'` (and the default session's feature track display should match).  
4. **Reload?** Selection change triggers `display.reload()` and the setWidth repaint; if the track never re-renders, highlight won't appear.
