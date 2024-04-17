export type SearchPosition = "before" | "after";

export interface SearchKeyword {
  dbKey: string;
  value: number;
  searchWords: string | string[];
  searchPositions: SearchPosition[];
  disabled?: boolean;
}

export interface Word {
  text: string;
  box: BoxPosition[];
  confidence: number;
}

export interface BoxPosition {
  x: number;
  y: number;
}

export interface PapagoOCRResponse {
  data: {
    sourceLang: string;
    targetLang: string;
    sourceText: string;
    targetText: string;
    renderedImage: string;
    blocks: {
      sourceLang: string;
      sourceText: string;
      targetText: string;
      LB: BoxPosition;
      LT: BoxPosition;
      RB: BoxPosition;
      RT: BoxPosition;
      lines: {
        LB: BoxPosition;
        LT: BoxPosition;
        RB: BoxPosition;
        RT: BoxPosition;
        words: {
          sourceText: string;
          LB: BoxPosition;
          LT: BoxPosition;
          RB: BoxPosition;
          RT: BoxPosition;
        }[];
      }[];
    }[];
  };
}
