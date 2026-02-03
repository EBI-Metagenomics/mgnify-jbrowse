"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_app_1 = require("@jbrowse/react-app");
const client_1 = require("react-dom/client");
const essentiality_1 = require("./essentiality");
const gff_1 = require("./gff");
const useJBrowseVisibleRegion_1 = require("./useJBrowseVisibleRegion");
const plugin_1 = __importStar(require("./jbrowse/plugin"));
const config_1 = require("./jbrowse/config");
const GeneViewerLegends_1 = require("./GeneViewerLegends");
const FeaturePanel_1 = require("./FeaturePanel");
const GenesInViewTable_1 = require("./GenesInViewTable");
function parseInitialLocation(loc) {
    // formats: "contig_1:1..10000" or "contig_1:1-10000"
    const m = loc.match(/^([^:]+):(\d+)\s*(?:\.\.|-)\s*(\d+)$/);
    if (!m)
        return null;
    const refName = m[1];
    const start1 = Number(m[2]);
    const end1 = Number(m[3]);
    if (!refName || !Number.isFinite(start1) || !Number.isFinite(end1))
        return null;
    const start = Math.max(0, Math.min(start1, end1) - 1);
    const end = Math.max(start + 1, Math.max(start1, end1));
    return { refName, start, end };
}
function GeneViewer(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const [viewState, setViewState] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [essentialityIndex, setEssentialityIndex] = (0, react_1.useState)(new Map());
    const [essentialityEnabled, setEssentialityEnabled] = (0, react_1.useState)(!!((_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.enabled));
    const [selectedGeneId, setSelectedGeneId] = (0, react_1.useState)((_c = (_b = props.initialSelection) === null || _b === void 0 ? void 0 : _b.locusTag) !== null && _c !== void 0 ? _c : null);
    const [genesInView, setGenesInView] = (0, react_1.useState)([]);
    const joinAttribute = (_e = (_d = props.essentiality) === null || _d === void 0 ? void 0 : _d.featureJoinAttribute) !== null && _e !== void 0 ? _e : 'locus_tag';
    const genesInViewTypes = (0, react_1.useMemo)(() => { var _a, _b; return (_b = (_a = props.ui) === null || _a === void 0 ? void 0 : _a.genesInViewTypes) !== null && _b !== void 0 ? _b : ['gene']; }, [(_f = props.ui) === null || _f === void 0 ? void 0 : _f.genesInViewTypes]);
    // Keep internal essentiality-enabled in sync with props changes
    (0, react_1.useEffect)(() => {
        var _a;
        setEssentialityEnabled(!!((_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.enabled));
    }, [(_g = props.essentiality) === null || _g === void 0 ? void 0 : _g.enabled]);
    // Load essentiality CSV (optional)
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        async function run() {
            var _a, _b, _c, _d;
            try {
                if (!essentialityEnabled || !((_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.csvUrl)) {
                    if (!cancelled)
                        setEssentialityIndex(new Map());
                    return;
                }
                const res = await fetch(props.essentiality.csvUrl);
                if (!res.ok)
                    throw new Error(`Failed to fetch essentiality CSV: ${res.status} ${res.statusText}`);
                const text = await res.text();
                const idx = (0, essentiality_1.buildEssentialityIndexFromCsv)(text, {
                    joinColumn: (_b = props.essentiality.csvJoinColumn) !== null && _b !== void 0 ? _b : 'locus_tag',
                    statusColumn: (_c = props.essentiality.csvStatusColumn) !== null && _c !== void 0 ? _c : 'essentiality_call',
                });
                // Convert to Map<joinKey, status>
                const statusMap = new Map();
                idx.forEach((row, key) => statusMap.set(key, row.status));
                if (!cancelled)
                    setEssentialityIndex(statusMap);
            }
            catch (e) {
                if (!cancelled)
                    setError((_d = e === null || e === void 0 ? void 0 : e.message) !== null && _d !== void 0 ? _d : String(e));
            }
        }
        run();
        return () => {
            cancelled = true;
        };
    }, [
        essentialityEnabled,
        (_h = props.essentiality) === null || _h === void 0 ? void 0 : _h.csvUrl,
        (_j = props.essentiality) === null || _j === void 0 ? void 0 : _j.csvJoinColumn,
        (_k = props.essentiality) === null || _k === void 0 ? void 0 : _k.csvStatusColumn,
    ]);
    // Keep JEXL context up to date (selection + essentiality)
    (0, react_1.useEffect)(() => {
        var _a;
        (0, plugin_1.setGeneViewerJexlContext)({
            selectedGeneId,
            essentialityEnabled,
            essentialityIndex: essentialityIndex,
            essentialityColorMap: (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.colorMap,
            featureJoinAttribute: joinAttribute,
        });
    }, [selectedGeneId, essentialityEnabled, essentialityIndex, joinAttribute, (_l = props.essentiality) === null || _l === void 0 ? void 0 : _l.colorMap]);
    const assemblyConfig = (0, react_1.useMemo)(() => (0, config_1.buildAssemblyConfig)(props), [props]);
    const tracksConfig = (0, react_1.useMemo)(() => (0, config_1.buildTracksConfig)(props), [props]);
    // Initialize JBrowse view state
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        async function init() {
            var _a;
            try {
                setError(null);
                // Choose an initial region: either from props.initialLocation or first FAI ref
                const initialLoc = props.initialLocation ? parseInitialLocation(props.initialLocation) : null;
                let initialRefName;
                let initialStart = 0;
                let initialEnd = 20000;
                if (initialLoc) {
                    initialRefName = initialLoc.refName;
                    initialStart = initialLoc.start;
                    initialEnd = initialLoc.end;
                }
                else {
                    const first = await (0, gff_1.fetchFirstFaiRef)(props.assembly.fasta.faiUrl);
                    initialRefName = first.refName;
                    initialEnd = Math.min(first.length, 20000);
                }
                const sessionConfig = (0, config_1.buildDefaultSessionConfig)({
                    assemblyName: props.assembly.name,
                    initialRefName,
                    initialStart,
                    initialEnd,
                });
                const config = {
                    assemblies: [assemblyConfig],
                    tracks: tracksConfig.map((t) => ({ ...t, visible: true })),
                    defaultSession: { ...sessionConfig, name: 'defaultSession' },
                };
                const state = (0, react_app_1.createViewState)({
                    config,
                    createRootFn: client_1.createRoot,
                    plugins: [plugin_1.default],
                });
                if (!cancelled)
                    setViewState(state);
            }
            catch (e) {
                if (!cancelled)
                    setError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : String(e));
            }
        }
        init();
        return () => {
            cancelled = true;
        };
    }, [props.initialLocation, props.assembly.fasta.faiUrl, props.assembly.name, assemblyConfig, tracksConfig]);
    // Feature clicks: capture JBrowse clicks and infer feature IDs from data-testid
    (0, react_1.useEffect)(() => {
        if (!viewState)
            return;
        const handleClick = (event) => {
            var _a, _b, _c, _d;
            const target = event.target;
            const el = (_a = target === null || target === void 0 ? void 0 : target.closest) === null || _a === void 0 ? void 0 : _a.call(target, '[data-testid]');
            if (!el)
                return;
            const tid = el.getAttribute('data-testid');
            if (!tid)
                return;
            // Many setups use locus_tag as the testid. If not, we still allow selection.
            setSelectedGeneId(tid);
            // Best-effort: trigger track re-render to apply highlighting quickly
            try {
                const view = (_c = (_b = viewState.session) === null || _b === void 0 ? void 0 : _b.views) === null || _c === void 0 ? void 0 : _c[0];
                (_d = view === null || view === void 0 ? void 0 : view.tracks) === null || _d === void 0 ? void 0 : _d.forEach((track) => {
                    var _a;
                    (_a = track === null || track === void 0 ? void 0 : track.displays) === null || _a === void 0 ? void 0 : _a.forEach((display) => {
                        var _a;
                        try {
                            (_a = display === null || display === void 0 ? void 0 : display.reload) === null || _a === void 0 ? void 0 : _a.call(display);
                        }
                        catch (_b) {
                            // ignore
                        }
                    });
                });
            }
            catch (_e) {
                // ignore
            }
        };
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [viewState]);
    // Compute visible region and query genes-in-view from GFF
    const visibleRegion = (0, useJBrowseVisibleRegion_1.useJBrowseVisibleRegion)(viewState, 600);
    const gffQueryAbortRef = (0, react_1.useRef)({ cancelled: false });
    (0, react_1.useEffect)(() => {
        if (!visibleRegion)
            return;
        const { refName, start, end } = visibleRegion;
        gffQueryAbortRef.current.cancelled = true;
        gffQueryAbortRef.current = { cancelled: false };
        const token = gffQueryAbortRef.current;
        const run = async () => {
            var _a;
            try {
                const feats = await (0, gff_1.queryGffRegion)({
                    gffUrl: props.annotation.gff.gffUrl,
                    tbiUrl: props.annotation.gff.tbiUrl,
                    refName,
                    start,
                    end,
                    featureTypes: genesInViewTypes,
                });
                if (!token.cancelled)
                    setGenesInView(feats);
            }
            catch (e) {
                if (!token.cancelled)
                    setError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : String(e));
            }
        };
        // Debounce slightly to avoid hammering on pan/zoom
        const id = window.setTimeout(run, 250);
        return () => {
            token.cancelled = true;
            window.clearTimeout(id);
        };
    }, [visibleRegion, props.annotation.gff.gffUrl, props.annotation.gff.tbiUrl, genesInViewTypes]);
    const selectedFeature = (0, react_1.useMemo)(() => {
        var _a;
        if (!selectedGeneId)
            return null;
        const norm = String(selectedGeneId);
        return ((_a = genesInView.find((f) => {
            var _a, _b, _c, _d, _e, _f;
            const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
            const id = String((_f = (_e = (_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : f.locus_tag) !== null && _d !== void 0 ? _d : attrs.ID) !== null && _e !== void 0 ? _e : f.id) !== null && _f !== void 0 ? _f : '');
            return id === norm;
        })) !== null && _a !== void 0 ? _a : null);
    }, [selectedGeneId, genesInView, joinAttribute]);
    const selectedEssentiality = (0, react_1.useMemo)(() => {
        var _a;
        if (!essentialityEnabled || !selectedGeneId)
            return null;
        const statusRaw = essentialityIndex.get(String(selectedGeneId));
        if (!statusRaw)
            return null;
        const status = (0, essentiality_1.normalizeEssentialityStatus)(statusRaw);
        return {
            status,
            color: (0, essentiality_1.getColorForEssentiality)(status, (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.colorMap),
            icon: (0, essentiality_1.getIconForEssentiality)(status),
        };
    }, [essentialityEnabled, selectedGeneId, essentialityIndex, (_m = props.essentiality) === null || _m === void 0 ? void 0 : _m.colorMap]);
    const showLegends = (_p = (_o = props.ui) === null || _o === void 0 ? void 0 : _o.showLegends) !== null && _p !== void 0 ? _p : true;
    const showPanel = (_r = (_q = props.ui) === null || _q === void 0 ? void 0 : _q.showFeaturePanel) !== null && _r !== void 0 ? _r : true;
    const showTable = (_t = (_s = props.ui) === null || _s === void 0 ? void 0 : _s.showGenesInViewTable) !== null && _t !== void 0 ? _t : true;
    const heightPx = (_u = props.heightPx) !== null && _u !== void 0 ? _u : 720;
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }, children: [showLegends ? ((0, jsx_runtime_1.jsx)(GeneViewerLegends_1.GeneViewerLegends, { essentiality: props.essentiality, essentialityEnabled: essentialityEnabled, onToggleEssentiality: (next) => setEssentialityEnabled(next) })) : null, error ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: 12, background: '#fff7ed', borderBottom: '1px solid #fed7aa', color: '#9a3412' }, children: error })) : null, (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: showPanel ? '1fr 360px' : '1fr' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { minHeight: heightPx, maxHeight: heightPx, overflow: 'hidden' }, children: viewState ? ((0, jsx_runtime_1.jsx)(react_app_1.JBrowseApp, { viewState: viewState })) : ((0, jsx_runtime_1.jsx)("div", { style: { padding: 12, color: '#6b7280' }, children: "Loading JBrowse\u2026" })) }), showPanel ? ((0, jsx_runtime_1.jsx)("div", { style: { borderLeft: '1px solid #e5e7eb', minHeight: heightPx, maxHeight: heightPx, overflow: 'auto' }, children: (0, jsx_runtime_1.jsx)(FeaturePanel_1.FeaturePanel, { feature: selectedFeature, essentiality: selectedEssentiality }) })) : null] }), showTable ? ((0, jsx_runtime_1.jsx)(GenesInViewTable_1.GenesInViewTable, { features: genesInView, selectedId: selectedGeneId, onSelect: (id) => setSelectedGeneId(id), joinAttribute: joinAttribute })) : null] }));
}
exports.default = GeneViewer;
