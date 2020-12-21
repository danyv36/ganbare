export interface IFlashcardVocab {
  Id: number;
  Japanese: string;
  Hiragana?: string;
  English: string;
  Sentence?: string;
  Tags?: string;
}

export interface IQuizResult extends IFlashcardVocab {
  Correct: boolean;
}
