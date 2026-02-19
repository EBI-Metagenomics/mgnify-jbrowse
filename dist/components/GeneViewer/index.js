"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneViewer = exports.TABLE_SELECTION_COOLDOWN_MS = exports.MAX_VISIBLE_BP = exports.DEFAULT_INITIAL_VISIBLE_BP = exports.normalizeEssentialityStatus = exports.getIconForEssentiality = exports.getColorForEssentiality = exports.buildEssentialityIndexFromCsv = exports.DEFAULT_ESSENTIALITY_COLOR_MAP = void 0;
var essentiality_1 = require("./essentiality");
Object.defineProperty(exports, "DEFAULT_ESSENTIALITY_COLOR_MAP", { enumerable: true, get: function () { return essentiality_1.DEFAULT_ESSENTIALITY_COLOR_MAP; } });
Object.defineProperty(exports, "buildEssentialityIndexFromCsv", { enumerable: true, get: function () { return essentiality_1.buildEssentialityIndexFromCsv; } });
Object.defineProperty(exports, "getColorForEssentiality", { enumerable: true, get: function () { return essentiality_1.getColorForEssentiality; } });
Object.defineProperty(exports, "getIconForEssentiality", { enumerable: true, get: function () { return essentiality_1.getIconForEssentiality; } });
Object.defineProperty(exports, "normalizeEssentialityStatus", { enumerable: true, get: function () { return essentiality_1.normalizeEssentialityStatus; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "DEFAULT_INITIAL_VISIBLE_BP", { enumerable: true, get: function () { return constants_1.DEFAULT_INITIAL_VISIBLE_BP; } });
Object.defineProperty(exports, "MAX_VISIBLE_BP", { enumerable: true, get: function () { return constants_1.MAX_VISIBLE_BP; } });
Object.defineProperty(exports, "TABLE_SELECTION_COOLDOWN_MS", { enumerable: true, get: function () { return constants_1.TABLE_SELECTION_COOLDOWN_MS; } });
var GeneViewer_1 = require("./GeneViewer");
Object.defineProperty(exports, "GeneViewer", { enumerable: true, get: function () { return __importDefault(GeneViewer_1).default; } });
