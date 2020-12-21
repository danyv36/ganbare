import { vocab } from '../flashcard-files/vocabulary';
import { Injectable } from '@angular/core';

@Injectable()
export class FlashcardState {
  originalFlashcardSet = vocab;
  currentFlashcardSet = vocab;
  currentFlashcardIndex = 0;
  showingJapaneseSide = true;
  cardsShuffled = false;
  resultQuiz = [];

  quizStarted = false;
}
