export interface SearchKeyword {
  dbKey: string;
  value: number;
  searchWords: string | string[];
  searchPosition: "before" | "after";
  disabled?: boolean;
}
