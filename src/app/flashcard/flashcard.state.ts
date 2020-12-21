import { vocab } from '../flashcard-files/vocabulary';
import { Injectable } from '@angular/core';

@Injectable()
export class FlashcardState {
  currentFlashcardSet = vocab;
  currentFlashcardIndex = 0;
  showingJapaneseSide = true;
  cardsShuffled = false;
  correctFlashcards = [];
  wrongFlashcards = [];

  quizStarted = false;
}
