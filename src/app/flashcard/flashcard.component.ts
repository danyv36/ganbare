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
  constructor(private state: FlashcardState) {}

  /* Icons */
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTimes = faTimes;
  faCheck = faCheck;
  faRandom = faRandom;

  inputStart = 1; // inputs for what index to start the flashcards
  inputEnd: number; // inputs for what number to end the flashcards

  ngOnInit() {
    this.state.currentFlashcardSet = vocab;
    this.inputStart = 1;
    this.inputEnd = this.state.currentFlashcardSet.length;
    console.log('currentflashcardset::', this.state.currentFlashcardSet);
  }

  get counter() {
    return `${this.state.currentFlashcardIndex + 1}/${
      this.state.currentFlashcardSet.length
    }`;
  }

  get currentFlashcard() {
    return this.state.showingJapaneseSide
      ? this.state.currentFlashcardSet[this.state.currentFlashcardIndex]
          .Japanese
      : this.state.currentFlashcardSet[this.state.currentFlashcardIndex]
          .English;
  }

  get currentFlashcardHiragana() {
    if (!this.state.showingJapaneseSide) {
      return '';
    }
    return this.state.currentFlashcardSet[this.state.currentFlashcardIndex]
      .Hiragana;
  }

  get shuffleBtnClass() {
    return this.state.cardsShuffled ? 'btn-primary' : 'btn-off';
  }

  get quizStarted() {
    return this.state.quizStarted;
  }

  get quizLabel() {
    return this.state.quizStarted ? 'stop quiz' : 'start quiz';
  }

  updateStartIndex() {
    this.state.currentFlashcardIndex = this.inputStart - 1;
  }

  prev() {
    if (this.state.currentFlashcardIndex !== 0) {
      this.state.currentFlashcardIndex--;
    } else {
      this.state.currentFlashcardIndex =
        this.state.currentFlashcardSet.length - 1;
    }
  }

  next() {
    if (this.state.currentFlashcardIndex < this.inputEnd - 1) {
      this.inputStart = ++this.state.currentFlashcardIndex + 1;
    } else {
      this.state.currentFlashcardIndex = 0;
      this.inputStart = 1;
    }
    this.state.showingJapaneseSide = true;
  }

  flip() {
    this.state.showingJapaneseSide = !this.state.showingJapaneseSide;
  }

  shuffle() {
    this.state.cardsShuffled = !this.state.cardsShuffled;
    this.state.currentFlashcardSet = this.state.cardsShuffled
      ? _.shuffle(vocab)
      : vocab;
    this.state.currentFlashcardIndex = 0;
  }

  correct() {
    this.state.correctFlashcards.push(
      this.state.currentFlashcardSet[this.state.currentFlashcardIndex].Id
    );
    this.next();
  }

  wrong() {
    this.state.wrongFlashcards.push(
      this.state.currentFlashcardSet[this.state.currentFlashcardIndex].Id
    );
    this.next();
  }

  startQuiz() {
    this.state.quizStarted = true;
  }

  reset() {
    this.state.correctFlashcards = [];
    this.state.wrongFlashcards = [];
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
        if (this.quizStarted) {
          this.correct();
        }
        break;
      case 'w':
        if (this.quizStarted) {
          this.wrong();
        }
        break;
      default:
    }
  }
}
