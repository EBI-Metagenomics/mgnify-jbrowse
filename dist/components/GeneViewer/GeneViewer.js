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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_app2_1 = require("@jbrowse/react-app2");
const makeWorkerInstance_1 = __importDefault(require("@jbrowse/react-app2/esm/makeWorkerInstance"));
const essentiality_1 = require("./essentiality");
const gff_1 = require("./gff");
const useJBrowseVisibleRegion_1 = require("./useJBrowseVisibleRegion");
const plugin_1 = __importStar(require("./jbrowse/plugin"));
const config_1 = require("./jbrowse/config");
const GeneViewerLegends_1 = require("./GeneViewerLegends");
const FeaturePanel_1 = require("./FeaturePanel");
const GenesInViewTable_1 = require("./GenesInViewTable");
const constants_1 = require("./constants");
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    const [viewState, setViewState] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [essentialityIndex, setEssentialityIndex] = (0, react_1.useState)(new Map());
    const [essentialityEnabled, setEssentialityEnabled] = (0, react_1.useState)(!!((_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.enabled));
    const [selectedGeneId, setSelectedGeneId] = (0, react_1.useState)((_c = (_b = props.initialSelection) === null || _b === void 0 ? void 0 : _b.locusTag) !== null && _c !== void 0 ? _c : null);
    const [genesInView, setGenesInView] = (0, react_1.useState)([]);
    const genesInViewRef = (0, react_1.useRef)([]);
    genesInViewRef.current = genesInView;
    /** After a table click we skip syncing from session.selection for a short window so the poll doesn't overwrite back to the previous gene */
    const lastTableSelectionTimeRef = (0, react_1.useRef)(0);
    /** Ensure we only navigate once per table click; otherwise session poll can change selectedFeature and trigger a second nav to a wrong place */
    const hasNavigatedThisTableClickRef = (0, react_1.useRef)(false);
    /** Apply initial zoom once when view is ready so more than two genes are visible (showAllRegions). */
    const initialZoomAppliedRef = (0, react_1.useRef)(false);
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
    // Keep JEXL context up to date (selection + essentiality) so track highlight (blue bar) works.
    // useLayoutEffect so context is set before paint and before track re-render from reload().
    (0, react_1.useLayoutEffect)(() => {
        var _a;
        (0, plugin_1.setGeneViewerJexlContext)({
            selectedGeneId: selectedLocusTag !== null && selectedLocusTag !== void 0 ? selectedLocusTag : selectedGeneId,
            essentialityEnabled,
            essentialityIndex: essentialityIndex,
            essentialityColorMap: (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.colorMap,
            featureJoinAttribute: joinAttribute,
            highlightColor: '#2563eb',
        });
    }, [selectedLocusTag, selectedGeneId, essentialityEnabled, essentialityIndex, joinAttribute, (_m = props.essentiality) === null || _m === void 0 ? void 0 : _m.colorMap]);
    // When DOM only has layout id, we let the click through so JBrowse sets session.selection.
    // Sync that selection into our state so the panel and table update.
    (0, react_1.useEffect)(() => {
        if (!viewState)
            return;
        const session = viewState.session;
        if (!session)
            return;
        const getAttrFromFeature = (feature, key) => {
            var _a;
            if (!feature)
                return undefined;
            if (typeof feature.get === 'function') {
                const direct = feature.get(key);
                if (direct != null && direct !== '')
                    return direct;
                const lower = key.toLowerCase();
                if (lower !== key) {
                    const v = feature.get(lower);
                    if (v != null && v !== '')
                        return v;
                }
                const attrs = feature.get('attributes');
                if (attrs && typeof attrs === 'object' && key in attrs)
                    return attrs[key];
                if (attrs && typeof attrs === 'object' && lower in attrs)
                    return attrs[lower];
            }
            const data = (_a = feature.data) !== null && _a !== void 0 ? _a : feature;
            if (data && typeof data === 'object') {
                for (const k of [key, key.toLowerCase()]) {
                    if (k in data && data[k] != null && data[k] !== '') {
                        return data[k];
                    }
                }
                const attrs = data.attributes;
                if (attrs && typeof attrs === 'object') {
                    for (const k of [key, key.toLowerCase()]) {
                        if (k in attrs && attrs[k] != null && attrs[k] !== '') {
                            return attrs[k];
                        }
                    }
                }
            }
            return undefined;
        };
        const getLocusFromSelection = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            const sel = session.selection;
            if (!sel)
                return null;
            const feature = (_a = sel.feature) !== null && _a !== void 0 ? _a : sel;
            if (!feature)
                return null;
            const joinAttr = (_c = (_b = props.essentiality) === null || _b === void 0 ? void 0 : _b.featureJoinAttribute) !== null && _c !== void 0 ? _c : 'locus_tag';
            // Walk feature + parent chain (CDS/mRNA may inherit locus_tag from gene)
            let f = feature;
            while (f) {
                const val = (_f = (_e = (_d = getAttrFromFeature(f, joinAttr)) !== null && _d !== void 0 ? _d : getAttrFromFeature(f, 'locus_tag')) !== null && _e !== void 0 ? _e : getAttrFromFeature(f, 'ID')) !== null && _f !== void 0 ? _f : getAttrFromFeature(f, 'id');
                if (val != null && val !== '') {
                    const s = String(val).trim();
                    // ID like "CDS:BU_ATCC8492_00001" -> extract locus after colon
                    if (s.includes(':'))
                        return (_h = (_g = s.split(':').pop()) === null || _g === void 0 ? void 0 : _g.trim()) !== null && _h !== void 0 ? _h : null;
                    return s;
                }
                f = (_j = f.parent) === null || _j === void 0 ? void 0 : _j.call(f);
            }
            return null;
        };
        const tick = () => {
            try {
                if (Date.now() - lastTableSelectionTimeRef.current < constants_1.TABLE_SELECTION_COOLDOWN_MS) {
                    return;
                }
                const locus = getLocusFromSelection();
                if (locus) {
                    if (typeof window !== 'undefined')
                        window.selectedGeneId = locus;
                    setSelectedGeneId((prev) => (prev === locus ? prev : locus));
                }
            }
            catch (_a) {
                // ignore
            }
        };
        tick();
        const id = window.setInterval(tick, 300);
        return () => window.clearInterval(id);
    }, [viewState, (_o = props.essentiality) === null || _o === void 0 ? void 0 : _o.featureJoinAttribute]);
    // Force track re-render when selection or essentiality changes so JEXL (getGeneColor) runs again.
    // METT: display.reload() and refreshStructuralAnnotationTrack (hideTrack + showTrack).
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (!viewState)
            return;
        try {
            const view = (_b = (_a = viewState.session) === null || _a === void 0 ? void 0 : _a.views) === null || _b === void 0 ? void 0 : _b[0];
            if (!(view === null || view === void 0 ? void 0 : view.tracks))
                return;
            const geneTrackId = 'gene_features';
            // Try METT-style hide/show first (forces full re-render); fallback to display.reload
            let refreshed = false;
            if (typeof view.hideTrack === 'function' && typeof view.showTrack === 'function') {
                try {
                    const hidden = view.hideTrack(geneTrackId);
                    if (hidden > 0) {
                        view.showTrack(geneTrackId);
                        refreshed = true;
                    }
                }
                catch (_c) {
                    // ignore
                }
            }
            if (!refreshed) {
                view.tracks.forEach((track) => {
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
            // Force view repaint
            if (typeof view.setWidth === 'function' && view.width != null) {
                const w = view.width;
                view.setWidth(w + 0.001);
                const t = window.setTimeout(() => {
                    try {
                        view.setWidth(w);
                    }
                    catch (_a) {
                        // ignore
                    }
                }, 20);
                return () => window.clearTimeout(t);
            }
        }
        catch (_d) {
            // ignore
        }
    }, [viewState, selectedLocusTag, selectedGeneId, essentialityIndex, essentialityEnabled]);
    // When user selects a gene from the table, gently center that gene in the current view.
    // Only run once per table click: after nav, session selection can change and would retrigger and jump again.
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (!viewState || !selectedFeature)
            return;
        if (Date.now() - lastTableSelectionTimeRef.current >= 800)
            return;
        if (hasNavigatedThisTableClickRef.current)
            return;
        const view = (_b = (_a = viewState.session) === null || _a === void 0 ? void 0 : _a.views) === null || _b === void 0 ? void 0 : _b[0];
        if (!view || view.type !== 'LinearGenomeView' || !view.initialized)
            return;
        try {
            hasNavigatedThisTableClickRef.current = true;
            const midBp = Math.round((selectedFeature.start + selectedFeature.end) / 2);
            const refName = selectedFeature.refName;
            if (typeof view.centerAt === 'function') {
                view.centerAt(midBp, refName, 0);
            }
        }
        catch (_c) {
            hasNavigatedThisTableClickRef.current = false;
        }
    }, [viewState, selectedFeature]);
    const assemblyConfig = (0, react_1.useMemo)(() => (0, config_1.buildAssemblyConfig)(props), [props]);
    const tracksConfig = (0, react_1.useMemo)(() => (0, config_1.buildTracksConfig)(props), [props]);
    // Initialize JBrowse view state
    (0, react_1.useEffect)(() => {
        initialZoomAppliedRef.current = false;
        let cancelled = false;
        async function init() {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
            try {
                setError(null);
                // Choose an initial region: either from props.initialLocation or first FAI ref
                const initialLoc = props.initialLocation ? parseInitialLocation(props.initialLocation) : null;
                let initialRefName;
                let initialStart = 0;
                let initialEnd;
                if (initialLoc) {
                    initialRefName = initialLoc.refName;
                    initialStart = initialLoc.start;
                    initialEnd = initialLoc.end;
                }
                else {
                    const first = await (0, gff_1.fetchFirstFaiRef)(props.assembly.fasta.faiUrl);
                    initialRefName = first.refName;
                    // Use full contig length so user can scroll through entire contig.
                    // initialRegionBp can cap this for very long contigs if desired.
                    initialEnd =
                        props.initialRegionBp != null
                            ? Math.min(first.length, props.initialRegionBp)
                            : first.length;
                }
                const geneTrack = tracksConfig.find((t) => t.trackId === 'gene_features');
                const sessionConfig = (0, config_1.buildDefaultSessionConfig)({
                    assemblyName: props.assembly.name,
                    initialRefName,
                    initialStart,
                    initialEnd,
                    geneTrackConfig: geneTrack,
                });
                const config = {
                    assemblies: [assemblyConfig],
                    tracks: tracksConfig.map((t) => ({ ...t, visible: true })),
                    defaultSession: { ...sessionConfig, name: 'defaultSession' },
                };
                const state = (0, react_app2_1.createViewState)({
                    config,
                    plugins: [plugin_1.default],
                    makeWorkerInstance: makeWorkerInstance_1.default,
                });
                // Debug: confirm renderer color1 wiring (root has jbrowse + session, not config)
                try {
                    const root = state;
                    const jbrowseTracks = (_b = (_a = root.jbrowse) === null || _a === void 0 ? void 0 : _a.tracks) !== null && _b !== void 0 ? _b : (_c = root.config) === null || _c === void 0 ? void 0 : _c.tracks;
                    const geneTrackConf = Array.isArray(jbrowseTracks)
                        ? jbrowseTracks.find((t) => t.trackId === 'gene_features')
                        : null;
                    const sessView = (_f = (_e = (_d = root.session) === null || _d === void 0 ? void 0 : _d.views) === null || _e === void 0 ? void 0 : _e[0]) !== null && _f !== void 0 ? _f : null;
                    const sessGeneTrack = (_g = sessView === null || sessView === void 0 ? void 0 : sessView.tracks) === null || _g === void 0 ? void 0 : _g.find((t) => { var _a; return t.configuration === 'gene_features' || ((_a = t.configuration) === null || _a === void 0 ? void 0 : _a.trackId) === 'gene_features'; });
                    const sessDisplays = sessGeneTrack === null || sessGeneTrack === void 0 ? void 0 : sessGeneTrack.displays;
                    const sessColor1 = Array.isArray(sessDisplays)
                        ? (_k = (_j = (_h = sessDisplays[0]) === null || _h === void 0 ? void 0 : _h.renderer) === null || _j === void 0 ? void 0 : _j.color1) !== null && _k !== void 0 ? _k : (_o = (_m = (_l = sessDisplays[0]) === null || _l === void 0 ? void 0 : _l.configuration) === null || _m === void 0 ? void 0 : _m.renderer) === null || _o === void 0 ? void 0 : _o.color1
                        : undefined;
                    // eslint-disable-next-line no-console
                    console.log('[GeneViewer debug] track renderer color1', {
                        trackColor1: (_r = (_q = (_p = geneTrackConf === null || geneTrackConf === void 0 ? void 0 : geneTrackConf.displays) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.renderer) === null || _r === void 0 ? void 0 : _r.color1,
                        sessionColor1: sessColor1,
                        hasJbrowseTracks: !!jbrowseTracks,
                    });
                }
                catch (_t) {
                    // ignore debug failures
                }
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
                    setError((_s = e === null || e === void 0 ? void 0 : e.message) !== null && _s !== void 0 ? _s : String(e));
            }
        }
        init();
        return () => {
            cancelled = true;
        };
    }, [props.initialLocation, props.initialRegionBp, props.assembly.fasta.faiUrl, props.assembly.name, assemblyConfig, tracksConfig]);
    // Apply initial zoom once when view is ready.
    // Displayed region is full contig so user can scroll. Zoom so initial viewport shows initialVisibleBp (default 20k).
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (!viewState || initialZoomAppliedRef.current)
            return;
        const view = (_b = (_a = viewState.session) === null || _a === void 0 ? void 0 : _a.views) === null || _b === void 0 ? void 0 : _b[0];
        if (!view || view.type !== 'LinearGenomeView')
            return;
        const apply = () => {
            var _a, _b, _c, _d, _e, _f;
            try {
                const width = (_a = view.width) !== null && _a !== void 0 ? _a : 800;
                const bpPerPx = props.initialBpPerPx;
                const visibleBp = (_b = props.initialVisibleBp) !== null && _b !== void 0 ? _b : constants_1.DEFAULT_INITIAL_VISIBLE_BP;
                if (typeof bpPerPx === 'number' && Number.isFinite(bpPerPx)) {
                    (_d = (_c = view).zoomTo) === null || _d === void 0 ? void 0 : _d.call(_c, bpPerPx);
                }
                else if (visibleBp > 0 && width > 0) {
                    (_f = (_e = view).zoomTo) === null || _f === void 0 ? void 0 : _f.call(_e, visibleBp / width);
                }
                else if (typeof view.showAllRegions === 'function') {
                    view.showAllRegions();
                }
                initialZoomAppliedRef.current = true;
            }
            catch (_g) {
                // ignore
            }
        };
        if (view.initialized) {
            apply();
            return;
        }
        let count = 0;
        const maxTries = 30; // ~3s
        const id = window.setInterval(() => {
            count++;
            if (view.initialized || count >= maxTries) {
                if (view.initialized)
                    apply();
                window.clearInterval(id);
            }
        }, 100);
        return () => window.clearInterval(id);
    }, [viewState, props.initialBpPerPx, props.initialVisibleBp]);
    // Document-level click handler: when user clicks a gene rect (data-testid="box-<id>"), resolve
    // adapter id -> locus_tag so table + panel update. JBrowse uses adapter ids (adp--...) so we
    // must look up the feature in the display to get locus_tag.
    (0, react_1.useEffect)(() => {
        const container = jbrowseContainerRef.current;
        if (!container || !viewState)
            return;
        const getAttrFromFeature = (feature, key) => {
            var _a;
            if (!feature)
                return undefined;
            if (typeof feature.get === 'function') {
                const direct = feature.get(key);
                if (direct != null && direct !== '')
                    return direct;
                const lower = key.toLowerCase();
                if (lower !== key) {
                    const v = feature.get(lower);
                    if (v != null && v !== '')
                        return v;
                }
                const attrs = feature.get('attributes');
                if (attrs && typeof attrs === 'object' && key in attrs)
                    return attrs[key];
                if (attrs && typeof attrs === 'object' && lower in attrs)
                    return attrs[lower];
            }
            const data = (_a = feature.data) !== null && _a !== void 0 ? _a : feature;
            if (data && typeof data === 'object') {
                for (const k of [key, key.toLowerCase()]) {
                    if (k in data && data[k] != null && data[k] !== '') {
                        return data[k];
                    }
                }
                const attrs = data.attributes;
                if (attrs && typeof attrs === 'object') {
                    for (const k of [key, key.toLowerCase()]) {
                        if (k in attrs && attrs[k] != null && attrs[k] !== '') {
                            return attrs[k];
                        }
                    }
                }
            }
            return undefined;
        };
        const extractLocusFromFeature = (feature) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!feature)
                return null;
            const joinAttr = (_b = (_a = props.essentiality) === null || _a === void 0 ? void 0 : _a.featureJoinAttribute) !== null && _b !== void 0 ? _b : 'locus_tag';
            let f = feature;
            while (f) {
                const val = (_e = (_d = (_c = getAttrFromFeature(f, joinAttr)) !== null && _c !== void 0 ? _c : getAttrFromFeature(f, 'locus_tag')) !== null && _d !== void 0 ? _d : getAttrFromFeature(f, 'ID')) !== null && _e !== void 0 ? _e : getAttrFromFeature(f, 'id');
                if (val != null && val !== '') {
                    const s = String(val).trim();
                    if (s.includes(':'))
                        return (_g = (_f = s.split(':').pop()) === null || _f === void 0 ? void 0 : _f.trim()) !== null && _g !== void 0 ? _g : null;
                    return s;
                }
                f = (_h = f.parent) === null || _h === void 0 ? void 0 : _h.call(f);
            }
            return null;
        };
        const handleClick = (e) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const target = e.target;
            if (!container.contains(target))
                return;
            // Box rect uses data-testid="box-<id>"; overlay uses data-testid="<id>" (no prefix)
            const boxEl = (_a = target.closest) === null || _a === void 0 ? void 0 : _a.call(target, '[data-testid^="box-"]');
            const overlayEl = !boxEl ? (_b = target.closest) === null || _b === void 0 ? void 0 : _b.call(target, '[data-testid]') : null;
            const el = boxEl !== null && boxEl !== void 0 ? boxEl : overlayEl;
            if (!el)
                return;
            let rawId = boxEl
                ? (_d = (_c = boxEl.getAttribute('data-testid')) === null || _c === void 0 ? void 0 : _c.replace(/^box-/, '')) === null || _d === void 0 ? void 0 : _d.trim()
                : (_e = overlayEl === null || overlayEl === void 0 ? void 0 : overlayEl.getAttribute('data-testid')) === null || _e === void 0 ? void 0 : _e.trim();
            if (!rawId)
                return;
            // Skip container/track ids
            if (/(container|tracks?|svg|placeholder|display)/i.test(rawId) || rawId === 'svgfeatures')
                return;
            if (Date.now() - lastTableSelectionTimeRef.current < 200)
                return;
            const session = viewState.session;
            if (!session)
                return;
            let locus = null;
            let feature = null;
            // 1) Get feature from display and extract locus_tag (handles adapter ids like adp--...)
            const view = (_f = session.views) === null || _f === void 0 ? void 0 : _f[0];
            const tracks = (_g = view === null || view === void 0 ? void 0 : view.tracks) !== null && _g !== void 0 ? _g : [];
            for (const track of tracks) {
                const conf = track.configuration;
                const trackId = typeof conf === 'string' ? conf : conf === null || conf === void 0 ? void 0 : conf.trackId;
                if (trackId === 'gene_features') {
                    const display = (_h = track.displays) === null || _h === void 0 ? void 0 : _h[0];
                    const featuresMap = display === null || display === void 0 ? void 0 : display.features;
                    if (featuresMap && typeof featuresMap.get === 'function') {
                        feature = featuresMap.get(rawId);
                        if (feature) {
                            locus = extractLocusFromFeature(feature);
                            break;
                        }
                    }
                    break;
                }
            }
            // 2) Fallback: rawId may already be locus_tag (e.g. when adapter uses locus as id)
            if (!locus) {
                locus = resolveToLocusTag(rawId, genesInViewRef.current) || null;
                if (locus === rawId && !genesInViewRef.current.some((f) => {
                    var _a, _b, _c, _d;
                    const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
                    const l = String((_d = (_c = (_b = attrs[joinAttribute]) !== null && _b !== void 0 ? _b : attrs.locus_tag) !== null && _c !== void 0 ? _c : attrs.ID) !== null && _d !== void 0 ? _d : '').trim();
                    return l === rawId;
                })) {
                    locus = null; // rawId doesn't match any gene, don't set
                }
            }
            if (locus) {
                lastTableSelectionTimeRef.current = Date.now();
                setSelectedGeneId(locus);
                if (feature && typeof session.setSelection === 'function') {
                    session.setSelection(feature);
                }
                e.stopPropagation();
                e.preventDefault();
            }
        };
        container.addEventListener('click', handleClick, true);
        return () => container.removeEventListener('click', handleClick, true);
    }, [viewState, resolveToLocusTag, joinAttribute, (_p = props.essentiality) === null || _p === void 0 ? void 0 : _p.featureJoinAttribute]);
    const showLegends = (_r = (_q = props.ui) === null || _q === void 0 ? void 0 : _q.showLegends) !== null && _r !== void 0 ? _r : true;
    const showPanel = (_t = (_s = props.ui) === null || _s === void 0 ? void 0 : _s.showFeaturePanel) !== null && _t !== void 0 ? _t : true;
    const showTable = (_v = (_u = props.ui) === null || _u === void 0 ? void 0 : _u.showGenesInViewTable) !== null && _v !== void 0 ? _v : true;
    const heightPx = (_w = props.heightPx) !== null && _w !== void 0 ? _w : 720;
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
                }, title: "Shows current selection \u2013 click a gene in the track or a row in the table", children: ["Selected: ", selectedLocusTag !== null && selectedLocusTag !== void 0 ? selectedLocusTag : '—', " (genes in view: ", genesInView.length, ")"] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: showPanel ? '1fr 380px' : '1fr' }, children: [(0, jsx_runtime_1.jsx)("div", { ref: jbrowseContainerRef, style: { minHeight: heightPx, maxHeight: heightPx, overflow: 'hidden' }, children: viewState ? ((0, jsx_runtime_1.jsx)(react_app2_1.JBrowseApp, { viewState: viewState })) : ((0, jsx_runtime_1.jsx)("div", { style: { padding: 12, color: '#6b7280' }, children: "Loading JBrowse\u2026" })) }), showPanel ? ((0, jsx_runtime_1.jsx)("div", { style: {
                            borderLeft: '1px solid #e5e7eb',
                            minHeight: heightPx,
                            overflow: 'visible',
                        }, children: (0, jsx_runtime_1.jsx)(FeaturePanel_1.FeaturePanel, { feature: selectedFeature, essentiality: selectedEssentiality }) })) : null] }), showTable ? ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'grid', gridTemplateColumns: showPanel ? '1fr 380px' : '1fr' }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(GenesInViewTable_1.GenesInViewTable, { features: genesInView, selectedId: selectedLocusTag, onSelect: (id) => {
                                lastTableSelectionTimeRef.current = Date.now();
                                hasNavigatedThisTableClickRef.current = false;
                                if (typeof window !== 'undefined')
                                    window.selectedGeneId = id;
                                setSelectedGeneId(id);
                            }, joinAttribute: joinAttribute }) }), showPanel ? (0, jsx_runtime_1.jsx)("div", {}) : null] })) : null] }));
}
exports.default = GeneViewer;
