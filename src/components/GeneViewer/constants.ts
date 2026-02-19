/** Default bp to show in the initial viewport. User can scroll through the full contig. */
export const DEFAULT_INITIAL_VISIBLE_BP = 20000;

/** After a table click, skip syncing from session.selection for this many ms. */
export const TABLE_SELECTION_COOLDOWN_MS = 2000;

/**
 * Cap on visible bp range for the "genes in view" GFF query.
 * Only applied when the computed visible range exceeds this (e.g. very zoomed-out view).
 * Set high so users can scroll and see genes across large regions.
 */
export const MAX_VISIBLE_BP = 5_000_000;
