import { vocab } from '../flashcard-files/vocabulary';
import { Injectable } from '@angular/core';
import { IResultsTally } from './flashcard-vocab.model';

@Injectable()
export class FlashcardState {
  resultsTally: IResultsTally[];
  originalFlashcardSet = vocab;
  currentFlashcardSet = vocab;
  currentFlashcardIndex = 0;
  showingJapaneseSide = true;
  cardsShuffled = false;
  resultQuiz = [];

  quizStarted = false;
}
