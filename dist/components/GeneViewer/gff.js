"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryGffRegion = exports.fetchFirstFaiRef = void 0;
const generic_filehandle_1 = require("generic-filehandle");
const tabix_1 = require("@gmod/tabix");
async function fetchFirstFaiRef(faiUrl) {
    const res = await fetch(faiUrl);
    if (!res.ok) {
        throw new Error(`Failed to fetch FAI: ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    const line = text.split(/\r?\n/).find((l) => l.trim());
    if (!line) {
        throw new Error('FAI is empty');
    }
    const [refName, lengthStr] = line.split('\t');
    const length = Number(lengthStr);
    if (!refName || !Number.isFinite(length)) {
        throw new Error('Invalid FAI format');
    }
    return { refName, length };
}
exports.fetchFirstFaiRef = fetchFirstFaiRef;
function parseGffAttributes(attrString) {
    const attrs = {};
    const pairs = attrString.split(';').map((s) => s.trim()).filter(Boolean);
    for (const pair of pairs) {
        const eq = pair.indexOf('=');
        if (eq === -1)
            continue;
        const key = pair.slice(0, eq).trim();
        const val = pair.slice(eq + 1).trim();
        if (!key)
            continue;
        attrs[key] = val;
    }
    return attrs;
}
async function queryGffRegion(opts) {
    var _a;
    const file = new tabix_1.TabixIndexedFile({
        filehandle: new generic_filehandle_1.RemoteFile(opts.gffUrl),
        tbiFilehandle: new generic_filehandle_1.RemoteFile(opts.tbiUrl),
    });
    const wantedTypes = ((_a = opts.featureTypes) === null || _a === void 0 ? void 0 : _a.length) ? new Set(opts.featureTypes) : null;
    const features = [];
    await file.getLines(opts.refName, opts.start, opts.end, (line) => {
        if (!line || line.startsWith('#'))
            return;
        const parts = line.split('\t');
        if (parts.length < 9)
            return;
        const [refName, source, type, start1, end1, score, strandChar, phase, attrString] = parts;
        if (wantedTypes && !wantedTypes.has(type))
            return;
        // GFF is 1-based inclusive. Convert to 0-based interbase: [start-1, end]
        const start = Math.max(0, Number(start1) - 1);
        const end = Math.max(start, Number(end1));
        const strand = strandChar === '+'
            ? 1
            : strandChar === '-'
                ? -1
                : 0;
        const attributes = parseGffAttributes(attrString);
        const id = attributes.ID;
        const locus_tag = attributes.locus_tag;
        features.push({
            refName,
            source,
            type,
            start,
            end,
            score,
            strand,
            phase,
            attributes,
            id,
            locus_tag,
        });
    });
    return features;
}
exports.queryGffRegion = queryGffRegion;
