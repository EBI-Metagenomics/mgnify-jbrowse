import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { COLORS, TABLE_STYLES } from '../constants';
function Field(props) {
    return (_jsxs("div", { style: { marginBottom: 10 }, children: [_jsx("div", { style: { fontSize: 11, color: COLORS.textMuted, marginBottom: 2 }, children: props.label }), _jsx("div", { style: { fontSize: 13, wordBreak: 'break-word' }, children: props.children })] }));
}
export function FeaturePanel(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const f = props.feature;
    if (!f) {
        return (_jsx("div", { style: { padding: 12, color: COLORS.textMuted, fontSize: 13 }, children: "Select a gene to see details." }));
    }
    const attrs = (_a = f.attributes) !== null && _a !== void 0 ? _a : {};
    const locusTag = (_c = (_b = attrs.locus_tag) !== null && _b !== void 0 ? _b : f.locus_tag) !== null && _c !== void 0 ? _c : '—';
    const name = (_f = (_e = (_d = attrs.Name) !== null && _d !== void 0 ? _d : attrs.gene) !== null && _e !== void 0 ? _e : attrs.ID) !== null && _f !== void 0 ? _f : '—';
    const product = (_h = (_g = attrs.product) !== null && _g !== void 0 ? _g : attrs.Product) !== null && _h !== void 0 ? _h : '—';
    return (_jsxs("div", { style: { padding: 12 }, children: [_jsx("div", { style: { fontWeight: 800, marginBottom: 10 }, children: "Feature Details" }), _jsx(Field, { label: "Locus Tag", children: locusTag }), _jsx(Field, { label: "Name", children: name }), _jsx(Field, { label: "Product", children: product }), _jsx(Field, { label: "Type", children: f.type }), _jsxs(Field, { label: "Location", children: [f.refName, ":", f.start + 1, "..", f.end, " (", f.strand === 1 ? '+' : f.strand === -1 ? '-' : '.', ")"] }), props.essentiality ? (_jsx(Field, { label: "Essentiality Status", children: _jsxs("span", { style: { display: 'inline-flex', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: {
                                width: 12,
                                height: 12,
                                borderRadius: 2,
                                backgroundColor: props.essentiality.color,
                                display: 'inline-block',
                            } }), _jsx("span", { "aria-hidden": "true", children: props.essentiality.icon }), _jsx("span", { style: { fontWeight: 600 }, children: props.essentiality.status })] }) })) : null, _jsx("div", { style: { marginTop: 14, fontWeight: 700, marginBottom: 6, fontSize: TABLE_STYLES.fontSize }, children: "Attributes" }), _jsx("div", { style: { border: `1px solid ${COLORS.border}`, borderRadius: 6 }, children: _jsx("table", { style: { width: '100%', borderCollapse: 'collapse', fontSize: TABLE_STYLES.fontSize }, children: _jsx("tbody", { children: Object.entries(attrs).map(([k, v]) => (_jsxs("tr", { children: [_jsx("td", { style: { padding: TABLE_STYLES.cellPadding, borderBottom: `1px solid ${COLORS.borderLight}`, width: 120, color: COLORS.textPrimary }, children: k }), _jsx("td", { style: { padding: TABLE_STYLES.cellPadding, borderBottom: `1px solid ${COLORS.borderLight}`, color: COLORS.textDark }, children: v || '—' })] }, k))) }) }) })] }));
}
