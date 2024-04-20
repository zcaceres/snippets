// This type can be used to create a "named unit type" in TypeScript. For example, the CSVRow type is really just a string. But we may want it to be treated as a special string which, for example, has a unique format and can be the input to specific functions.

type Distinct<T, DistinctName> = T & { __TYPE__: DistinctName };
export type CSVRow = Distinct<string, "CSVRow">;
