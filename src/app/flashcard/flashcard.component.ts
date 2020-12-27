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
import { FlashcardService, ICounterReq } from './flashcard.service';
import { IResultsTally } from './flashcard-vocab.model';
import clone from 'lodash/clone';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
})
export class FlashcardComponent implements OnInit {
  constructor(
    private state: FlashcardState,
    private service: FlashcardService
  ) { }

  /* Icons */
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTimes = faTimes;
  faCheck = faCheck;
  faRandom = faRandom;

  inputStart = 1; // inputs for what index to start the flashcards
  inputEnd: number; // inputs for what number to end the flashcards

  ngOnInit() {
    this.service.getVocab().subscribe((results: IResultsTally[]) => {
      console.log('results from db::', results);
      this.state.resultsTally = results;
    });
    this.state.quizStarted = false;
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

  updateCards() {
    if (
      _.toNumber(this.inputStart) !== 0 ||
      _.toNumber(this.inputEnd) !== this.state.originalFlashcardSet.length
    ) {
      const slicedCards = this.state.originalFlashcardSet.slice(
        this.inputStart - 1,
        this.inputEnd
      );
      this.state.currentFlashcardSet = slicedCards;
      this.state.currentFlashcardIndex = 0;
    }
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
    if (
      this.state.currentFlashcardIndex <
      this.state.currentFlashcardSet.length - 1
    ) {
      this.state.currentFlashcardIndex++;
    } else {
      if (this.state.quizStarted) {
        this.startQuiz(); // end the quiz
      }
      this.state.currentFlashcardIndex = 0;
    }
    this.state.showingJapaneseSide = true;
  }

  flip() {
    this.state.showingJapaneseSide = !this.state.showingJapaneseSide;
  }

  shuffle() {
    this.state.cardsShuffled = !this.state.cardsShuffled;
    console.log('inputs', this.inputStart, this.inputEnd);
    const cardChunk = this.state.originalFlashcardSet.slice(
      this.inputStart - 1,
      this.inputEnd
    );
    console.log('will shuffle this set: ', cardChunk);
    this.state.currentFlashcardSet = this.state.cardsShuffled
      ? _.shuffle(cardChunk)
      : cardChunk;
    this.state.currentFlashcardIndex = 0;
    console.log('shuffled...', this.state.currentFlashcardIndex);
  }

  correct() {
    this.state.resultQuiz.push({
      ...this.state.currentFlashcardSet[this.state.currentFlashcardIndex],
      Correct: true,
    });
    this.next();
  }

  wrong() {
    this.state.resultQuiz.push({
      ...this.state.currentFlashcardSet[this.state.currentFlashcardIndex],
      Correct: false,
    });
    this.next();
  }

  async startQuiz() {
    if (this.state.quizStarted) {
      // quiz ended, record results
      console.log('wat.....nan??::', JSON.stringify(this.state.resultQuiz));
      const quizResults = clone(this.state.resultQuiz);
      await this.service.postVocab(this.state.resultsTally, quizResults);
      console.log('result quiz after...::', JSON.stringify(this.state.resultQuiz));
    } else {
      this.reset();
    }
    this.state.quizStarted = !this.state.quizStarted;
  }

  reset() {
    this.state.resultQuiz = [];
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
