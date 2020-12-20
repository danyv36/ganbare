import { Component, OnInit, HostListener } from '@angular/core';
import { vocab } from '../flashcard-files/vocabulary';
import * as _ from 'lodash';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  constructor() { }

  currentFlashcardSet;
  currentFlashcardIndex = 0;
  showingJapaneseSide = true;
  cardsShuffled = false;
  correctFlashcards = [];
  wrongFlashcards = [];

  inputStart = 1; // inputs for what index to start the flashcards
  inputEnd: number; // inputs for what number to end the flashcards

  ngOnInit() {
    this.currentFlashcardSet = vocab;
    this.inputStart = 1;
    this.inputEnd = this.currentFlashcardSet.length;
    console.log('currentflashcardset::', this.currentFlashcardSet);
  }

  get counter() {
    return `${this.currentFlashcardIndex + 1}/${this.currentFlashcardSet.length}`
  }

  get currentFlashcard() {
    return this.showingJapaneseSide ? this.currentFlashcardSet[this.currentFlashcardIndex].Japanese : this.currentFlashcardSet[this.currentFlashcardIndex].English;
  }

  get currentFlashcardHiragana() {
    if (!this.showingJapaneseSide) {
      return '';
    }
    return this.currentFlashcardSet[this.currentFlashcardIndex].Hiragana;
  }

  get shuffleBtnClass() {
    return this.cardsShuffled ? 'btn-primary' : 'btn-off';
  }

  updateStartIndex() {
    this.currentFlashcardIndex = this.inputStart - 1;
  }

  prev() {
    if (this.currentFlashcardIndex !== 0) {
      this.currentFlashcardIndex--;
    } else {
      this.currentFlashcardIndex = this.currentFlashcardSet.length - 1;
    }
  }

  next() {
    if (this.currentFlashcardIndex < this.inputEnd - 1) {
      this.inputStart = (++this.currentFlashcardIndex) + 1;
    } else {
      this.currentFlashcardIndex = 0;
      this.inputStart = 1;
    }
    this.showingJapaneseSide = true;
  }

  flip() {
    this.showingJapaneseSide = !this.showingJapaneseSide;
  }

  shuffle() {
    this.cardsShuffled = !this.cardsShuffled;
    this.currentFlashcardSet = this.cardsShuffled ? _.shuffle(vocab) : vocab;
    this.currentFlashcardIndex = 0;
  }

  correct() {
    this.correctFlashcards.push(this.currentFlashcardSet[this.currentFlashcardIndex]);
  }

  wrong() {
    this.wrongFlashcards.push(this.currentFlashcardSet[this.currentFlashcardIndex]);
  }

  reset() {
    this.correctFlashcards = [];
    this.wrongFlashcards = [];
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
