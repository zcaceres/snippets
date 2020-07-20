
/**
 * Dedupes an array of primitive types (i.e. numbers, strings, bools, etc).
 */
export function dedupeArr(arr) {
    return Array.from(new Set(arr))
}

