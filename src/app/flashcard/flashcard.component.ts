import { Component, OnInit, HostListener } from '@angular/core';
import { vocab } from '../flashcard-files/vocabulary';
import * as _ from 'lodash';
import {
  faChevronRight,
  faChevronLeft,
  faTimes,
  faCheck,
  faRandom,
} from '@fortawesome/free-solid-svg-icons';
import { FlashcardState } from './flashcard.state';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  constructor(private flashcardState: FlashcardState) {}

  /* Icons */
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTimes = faTimes;
  faCheck = faCheck;
  faRandom = faRandom;

  inputStart = 1; // inputs for what index to start the flashcards
  inputEnd: number; // inputs for what number to end the flashcards

  ngOnInit() {
    this.flashcardState.currentFlashcardSet = vocab;
    this.inputStart = 1;
    this.inputEnd = this.flashcardState.currentFlashcardSet.length;
    console.log('currentflashcardset::', this.flashcardState.currentFlashcardSet);
  }

  get counter() {
    return `${this.flashcardState.currentFlashcardIndex + 1}/${
      this.flashcardState.currentFlashcardSet.length
    }`;
  }

  get currentFlashcard() {
    return this.flashcardState.showingJapaneseSide
      ? this.flashcardState.currentFlashcardSet[this.flashcardState.currentFlashcardIndex].Japanese
      : this.flashcardState.currentFlashcardSet[this.flashcardState.currentFlashcardIndex].English;
  }

  get currentFlashcardHiragana() {
    if (!this.flashcardState.showingJapaneseSide) {
      return '';
    }
    return this.flashcardState.currentFlashcardSet[this.flashcardState.currentFlashcardIndex].Hiragana;
  }

  get shuffleBtnClass() {
    return this.flashcardState.cardsShuffled ? 'btn-primary' : 'btn-off';
  }

  updateStartIndex() {
    this.flashcardState.currentFlashcardIndex = this.inputStart - 1;
  }

  prev() {
    if (this.flashcardState.currentFlashcardIndex !== 0) {
      this.flashcardState.currentFlashcardIndex--;
    } else {
      this.flashcardState.currentFlashcardIndex = this.flashcardState.currentFlashcardSet.length - 1;
    }
  }

  next() {
    if (this.flashcardState.currentFlashcardIndex < this.inputEnd - 1) {
      this.inputStart = ++this.flashcardState.currentFlashcardIndex + 1;
    } else {
      this.flashcardState.currentFlashcardIndex = 0;
      this.inputStart = 1;
    }
    this.flashcardState.showingJapaneseSide = true;
  }

  flip() {
    this.flashcardState.showingJapaneseSide = !this.flashcardState.showingJapaneseSide;
  }

  shuffle() {
    this.flashcardState.cardsShuffled = !this.flashcardState.cardsShuffled;
    this.flashcardState.currentFlashcardSet = this.flashcardState.cardsShuffled ? _.shuffle(vocab) : vocab;
    this.flashcardState.currentFlashcardIndex = 0;
  }

  correct() {
    this.flashcardState.correctFlashcards.push(
      this.flashcardState.currentFlashcardSet[this.flashcardState.currentFlashcardIndex]
    );
  }

  wrong() {
    this.flashcardState.wrongFlashcards.push(
      this.flashcardState.currentFlashcardSet[this.flashcardState.currentFlashcardIndex]
    );
  }

  reset() {
    this.flashcardState.correctFlashcards = [];
    this.flashcardState.wrongFlashcards = [];
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.flip();
        break;
      case 'r':
        this.correct();
        break;
      case 'w':
        this.wrong();
        break;
      default:
    }
  }
}
