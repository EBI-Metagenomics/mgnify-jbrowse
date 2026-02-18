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
// Heuristic to distinguish real feature IDs (locus_tag, GFF ID) from JBrowse internal IDs
function isLikelyFeatureId(rawId) {
    if (!rawId)
        return false;
    const id = rawId.trim();
    if (!id)
        return false;
    if (/\s/.test(id))
        return false;
    // Reject JBrowse layout/block keys (e.g. "-464386435-offset-1083315") - these are not locus_tags
    if (/^-\d+-offset-\d+$/.test(id))
        return false;
    if (/^-\d+$/.test(id))
        return false;
    // Ignore known JBrowse UI container / display testids
    if (/^display-/.test(id) || /^trackRenderingContainer-/.test(id) || id === 'trackContainer')
        return false;
    if (/(container|tracks?|svg|placeholder)/i.test(id))
        return false;
    // Feature ids are typically locus_tag (e.g. BU_ATCC8492_00001) or GFF ID (e.g. gene-xxx) - have letters
    if (!/[A-Za-z]/.test(id))
        return false;
    return id.length >= 2;
}
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
    const genesInViewRef = (0, react_1.useRef)([]);
    genesInViewRef.current = genesInView;
    const joinAttribute = (_e = (_d = props.essentiality) === null || _d === void 0 ? void 0 : _d.featureJoinAttribute) !== null && _e !== void 0 ? _e : 'locus_tag';
    // Resolve a clicked feature id (e.g. GFF ID or locus_tag) to the canonical locus_tag for selection/panel/table
    const resolveToLocusTag = (0, react_1.useCallback)((featureId, features) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const norm = String(featureId).trim();
        if (!norm)
            return featureId;
        for (const f of features) {
            const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
            const locus = String((_f = (_e = (_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : f.locus_tag) !== null && _d !== void 0 ? _d : attrs.ID) !== null && _e !== void 0 ? _e : f.id) !== null && _f !== void 0 ? _f : '').trim();
            const id = String((_h = (_g = attrs.ID) !== null && _g !== void 0 ? _g : f.id) !== null && _h !== void 0 ? _h : '').trim();
            if (norm === locus || norm === id)
                return locus || id || featureId;
        }
        return featureId;
    }, [joinAttribute]);
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
                    statusColumn: (_c = props.essentiality.csvStatusColumn) !== null && _c !== void 0 ? _c : 'essentiality',
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
    // Debug: confirm this build is loaded (in console: window.__GENEVIEWER_DEBUG)
    (0, react_1.useEffect)(() => {
        window.__GENEVIEWER_DEBUG = 'v2-' + Date.now();
        return () => {
            delete window.__GENEVIEWER_DEBUG;
        };
    }, []);
    // Compute visible region and query genes-in-view from GFF (must run before selectedFeature/selectedLocusTag)
    const visibleRegion = (0, useJBrowseVisibleRegion_1.useJBrowseVisibleRegion)(viewState, 200);
    const gffQueryAbortRef = (0, react_1.useRef)({ cancelled: false });
    (0, react_1.useEffect)(() => {
        if (!visibleRegion)
            return;
        const { refName, start, end } = visibleRegion;
        const regionLen = end - start;
        const buffer = Math.max(0, Math.floor(regionLen * 0.05));
        const qStart = Math.max(0, start - buffer);
        const qEnd = end + buffer;
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
                    start: qStart,
                    end: qEnd,
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
        const id = window.setTimeout(run, 150);
        return () => {
            token.cancelled = true;
            window.clearTimeout(id);
        };
    }, [visibleRegion, props.annotation.gff.gffUrl, props.annotation.gff.tbiUrl, genesInViewTypes]);
    // Find feature by selectedGeneId; match locus_tag, ID, or any attribute so panel + table stay in sync.
    const selectedFeature = (0, react_1.useMemo)(() => {
        var _a;
        if (!selectedGeneId)
            return null;
        const norm = String(selectedGeneId).trim();
        if (!norm)
            return null;
        const exact = genesInView.find((f) => {
            var _a, _b, _c, _d, _e, _f;
            const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
            const id = String((_f = (_e = (_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : f.locus_tag) !== null && _d !== void 0 ? _d : attrs.ID) !== null && _e !== void 0 ? _e : f.id) !== null && _f !== void 0 ? _f : '').trim();
            return id === norm;
        });
        if (exact)
            return exact;
        return ((_a = genesInView.find((f) => {
            var _a, _b, _c, _d, _e, _f;
            const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
            const locus = String((_f = (_e = (_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : f.locus_tag) !== null && _d !== void 0 ? _d : attrs.ID) !== null && _e !== void 0 ? _e : f.id) !== null && _f !== void 0 ? _f : '').trim();
            if (locus === norm)
                return true;
            if (attrs.ID === norm || attrs.locus_tag === norm)
                return true;
            return Object.values(attrs).some((v) => String(v).trim() === norm);
        })) !== null && _a !== void 0 ? _a : null);
    }, [selectedGeneId, genesInView, joinAttribute]);
    const selectedLocusTag = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d, _e, _f;
        if (selectedFeature) {
            const attrs = (_a = selectedFeature.attributes) !== null && _a !== void 0 ? _a : {};
            return String((_f = (_e = (_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : selectedFeature.locus_tag) !== null && _d !== void 0 ? _d : attrs.ID) !== null && _e !== void 0 ? _e : selectedFeature.id) !== null && _f !== void 0 ? _f : '').trim();
        }
        return selectedGeneId ? String(selectedGeneId).trim() : null;
    }, [selectedFeature, selectedGeneId, joinAttribute]);
    // Optional: set to true to log selection state on every click (see docs/GENE_CLICK_FLOW.md)
    const DEBUG_CLICK_FLOW = false;
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (!DEBUG_CLICK_FLOW || !selectedGeneId)
            return;
        console.log('[GeneViewer] selection state', {
            selectedGeneId,
            selectedLocusTag,
            selectedFeature: selectedFeature
                ? { id: (_a = selectedFeature.attributes) === null || _a === void 0 ? void 0 : _a.ID, locus_tag: (_b = selectedFeature.attributes) === null || _b === void 0 ? void 0 : _b.locus_tag }
                : null,
            genesInViewLength: genesInView.length,
            genesInViewSample: genesInView.slice(0, 3).map((f) => {
                var _a, _b;
                return ({
                    id: (_a = f.attributes) === null || _a === void 0 ? void 0 : _a.ID,
                    locus_tag: (_b = f.attributes) === null || _b === void 0 ? void 0 : _b.locus_tag,
                });
            }),
        });
    }, [selectedGeneId, selectedLocusTag, selectedFeature, genesInView]);
    const selectedEssentiality = (0, react_1.useMemo)(() => {
        var _a;
        if (!essentialityEnabled || !selectedLocusTag)
            return null;
        const statusRaw = essentialityIndex.get(String(selectedLocusTag));
        if (!statusRaw)
            return null;
        const status = (0, essentiality_1.normalizeEssentialityStatus)(statusRaw);
        return {
            status,
            color: (0, essentiality_1.getColorForEssentiality)(status, (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.colorMap),
            icon: (0, essentiality_1.getIconForEssentiality)(status),
        };
    }, [essentialityEnabled, selectedLocusTag, essentialityIndex, (_l = props.essentiality) === null || _l === void 0 ? void 0 : _l.colorMap]);
    // Keep JEXL context up to date (selection + essentiality). Use canonical selectedLocusTag for track highlight.
    (0, react_1.useEffect)(() => {
        var _a;
        (0, plugin_1.setGeneViewerJexlContext)({
            selectedGeneId: selectedLocusTag !== null && selectedLocusTag !== void 0 ? selectedLocusTag : selectedGeneId,
            essentialityEnabled,
            essentialityIndex: essentialityIndex,
            essentialityColorMap: (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.colorMap,
            featureJoinAttribute: joinAttribute,
        });
    }, [selectedLocusTag, selectedGeneId, essentialityEnabled, essentialityIndex, joinAttribute, (_m = props.essentiality) === null || _m === void 0 ? void 0 : _m.colorMap]);
    // Force track re-render when selection or essentiality changes so JEXL (getGeneColor) runs again.
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        if (!viewState)
            return;
        try {
            const view = (_b = (_a = viewState.session) === null || _a === void 0 ? void 0 : _a.views) === null || _b === void 0 ? void 0 : _b[0];
            (_c = view === null || view === void 0 ? void 0 : view.tracks) === null || _c === void 0 ? void 0 : _c.forEach((track) => {
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
        catch (_d) {
            // ignore
        }
    }, [viewState, selectedLocusTag, selectedGeneId, essentialityIndex, essentialityEnabled]);
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
                // Default to a wider initial window so neighboring genes are visible.
                let initialEnd = 50000;
                if (initialLoc) {
                    initialRefName = initialLoc.refName;
                    initialStart = initialLoc.start;
                    initialEnd = initialLoc.end;
                }
                else {
                    const first = await (0, gff_1.fetchFirstFaiRef)(props.assembly.fasta.faiUrl);
                    initialRefName = first.refName;
                    initialEnd = Math.min(first.length, 50000);
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
                // Override session widget methods so JBrowse never opens the feature drawer (like METT)
                try {
                    const session = state.session;
                    if (session) {
                        session.showWidget = function () {
                            return undefined;
                        };
                        session.addWidget = function () {
                            return undefined;
                        };
                    }
                }
                catch (_) {
                    // ignore
                }
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
    // Feature clicks: capture JBrowse clicks via DOM and infer locus tags from data-testid.
    (0, react_1.useEffect)(() => {
        if (!viewState)
            return;
        const handleFeatureClick = (event) => {
            var _a, _b, _c;
            const target = event.target;
            if (!target)
                return;
            // Log every click so we know the handler runs (diagnostic)
            if (typeof console !== 'undefined' && console.log) {
                console.log('[GeneViewer] click received', target.tagName, (_b = (_a = target.getAttribute) === null || _a === void 0 ? void 0 : _a.call(target, 'data-testid')) !== null && _b !== void 0 ? _b : 'no-testid');
            }
            // Walk up from the clicked element to find data-testid that looks like a feature id (locus_tag / GFF ID).
            // JBrowse may use layout ids like "-464386435-offset-1083315" on wrappers; skip those.
            let element = target;
            let rawId = null;
            while (element) {
                const tid = (_c = element.getAttribute) === null || _c === void 0 ? void 0 : _c.call(element, 'data-testid');
                if (tid && isLikelyFeatureId(tid)) {
                    rawId = tid;
                    break;
                }
                element = element.parentElement;
            }
            if (!rawId) {
                if (typeof console !== 'undefined' && console.log) {
                    console.log('[GeneViewer] no feature-like data-testid in ancestry (click ignored)');
                }
                return;
            }
            // JBrowse SvgFeatureRenderer sometimes uses data-testid="box-<featureId>" – strip prefix for lookup
            const featureId = rawId.replace(/^box-/, '').trim() || rawId;
            event.stopPropagation();
            event.preventDefault();
            const locus = resolveToLocusTag(featureId, genesInViewRef.current) || featureId;
            setSelectedGeneId((prev) => (prev === locus ? prev : locus));
            if (typeof console !== 'undefined' && console.log) {
                console.log('[GeneViewer] setSelectedGeneId:', locus, '| genesInView:', genesInViewRef.current.length);
            }
        };
        // Also intercept double-clicks to suppress JBrowse's drawer
        const handleDoubleClick = (event) => {
            var _a;
            const target = event.target;
            const featureElement = (_a = target === null || target === void 0 ? void 0 : target.closest) === null || _a === void 0 ? void 0 : _a.call(target, '[data-testid]');
            if (!featureElement)
                return;
            const featureId = featureElement.getAttribute('data-testid');
            if (!isLikelyFeatureId(featureId))
                return;
            event.stopPropagation();
            event.preventDefault();
        };
        document.addEventListener('click', handleFeatureClick, true);
        document.addEventListener('dblclick', handleDoubleClick, true);
        return () => {
            document.removeEventListener('click', handleFeatureClick, true);
            document.removeEventListener('dblclick', handleDoubleClick, true);
        };
    }, [viewState, resolveToLocusTag]);
    const showLegends = (_p = (_o = props.ui) === null || _o === void 0 ? void 0 : _o.showLegends) !== null && _p !== void 0 ? _p : true;
    const showPanel = (_r = (_q = props.ui) === null || _q === void 0 ? void 0 : _q.showFeaturePanel) !== null && _r !== void 0 ? _r : true;
    const showTable = (_t = (_s = props.ui) === null || _s === void 0 ? void 0 : _s.showGenesInViewTable) !== null && _t !== void 0 ? _t : true;
    const heightPx = (_u = props.heightPx) !== null && _u !== void 0 ? _u : 720;
    const jbrowseContainerRef = (0, react_1.useRef)(null);
    // Hide JBrowse's native menu bar and feature drawer so only our custom panel is used (like METT)
    (0, react_1.useEffect)(() => {
        if (!viewState)
            return;
        const container = jbrowseContainerRef.current;
        if (!container)
            return;
        const hideDrawerAndMenu = () => {
            var _a;
            const selectors = [
                '.MuiDrawer-root',
                '.MuiDrawer-modal',
                '.MuiDrawer-docked',
                '[class*="BaseFeatureDetail"]',
                '[class*="FeatureDetails"]',
                '[class*="DrawerWidget"]',
                '[class*="FeatureWidget"]',
                '.MuiBackdrop-root',
                '[aria-label*="drawer" i]',
            ];
            selectors.forEach((sel) => {
                try {
                    container.querySelectorAll(sel).forEach((el) => {
                        el.style.cssText =
                            'display:none!important;visibility:hidden!important;pointer-events:none!important;';
                    });
                }
                catch (_) { }
            });
            // Hide main app bar (File, Add, etc.) when it appears under our container
            const fileBtn = container.querySelector('button[data-testid="dropDownMenuButton"]');
            if ((_a = fileBtn === null || fileBtn === void 0 ? void 0 : fileBtn.textContent) === null || _a === void 0 ? void 0 : _a.includes('File')) {
                let p = fileBtn.parentElement;
                while (p) {
                    if (p.classList.contains('MuiAppBar-root')) {
                        p.style.display = 'none';
                        break;
                    }
                    p = p.parentElement;
                }
            }
        };
        hideDrawerAndMenu();
        const observer = new MutationObserver(hideDrawerAndMenu);
        observer.observe(container, { childList: true, subtree: true });
        const t1 = setTimeout(hideDrawerAndMenu, 100);
        const t2 = setTimeout(hideDrawerAndMenu, 500);
        const t3 = setTimeout(hideDrawerAndMenu, 1000);
        return () => {
            observer.disconnect();
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [viewState]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }, children: [showLegends ? ((0, jsx_runtime_1.jsx)(GeneViewerLegends_1.GeneViewerLegends, { essentiality: props.essentiality, essentialityEnabled: essentialityEnabled, onToggleEssentiality: (next) => setEssentialityEnabled(next) })) : null, error ? ((0, jsx_runtime_1.jsx)("div", { style: { padding: 12, background: '#fff7ed', borderBottom: '1px solid #fed7aa', color: '#9a3412' }, children: error })) : null, (0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: '4px 12px',
                    fontSize: 11,
                    color: '#6b7280',
                    background: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb',
                }, title: "Shows current selection \u2013 click a gene in the track or a row in the table", children: ["Selected: ", selectedLocusTag !== null && selectedLocusTag !== void 0 ? selectedLocusTag : '—', " (genes in view: ", genesInView.length, ")"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: showPanel ? '1fr 360px' : '1fr' }, children: [(0, jsx_runtime_1.jsx)("div", { ref: jbrowseContainerRef, style: { minHeight: heightPx, maxHeight: heightPx, overflow: 'hidden' }, children: viewState ? ((0, jsx_runtime_1.jsx)(react_app_1.JBrowseApp, { viewState: viewState })) : ((0, jsx_runtime_1.jsx)("div", { style: { padding: 12, color: '#6b7280' }, children: "Loading JBrowse\u2026" })) }), showPanel ? ((0, jsx_runtime_1.jsx)("div", { style: { borderLeft: '1px solid #e5e7eb', minHeight: heightPx, maxHeight: heightPx, overflow: 'auto' }, children: (0, jsx_runtime_1.jsx)(FeaturePanel_1.FeaturePanel, { feature: selectedFeature, essentiality: selectedEssentiality }) })) : null] }), showTable ? ((0, jsx_runtime_1.jsx)(GenesInViewTable_1.GenesInViewTable, { features: genesInView, selectedId: selectedLocusTag, onSelect: (id) => setSelectedGeneId(id), joinAttribute: joinAttribute })) : null] }));
}
exports.default = GeneViewer;
