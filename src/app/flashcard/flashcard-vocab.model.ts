export interface IFlashcardVocab {
  Id: number;
  Japanese: string;
  Hiragana?: string;
  English: string;
  Sentence?: string;
  Tags?: string;
  RightCounter?: number;
  WrongCounter?: number;
}

export interface IQuizResult extends IFlashcardVocab {
  Correct: boolean;
}

export interface IResultsTally extends IFlashcardVocab {
  WrongCounter: number;
  RightCounter: number;
}
