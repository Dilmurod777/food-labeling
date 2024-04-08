export type SearchPosition = "before" | "after";

export interface SearchKeyword {
  dbKey: string;
  value: number;
  searchWords: string | string[];
  searchPositions: SearchPosition[];
  disabled?: boolean;
}
