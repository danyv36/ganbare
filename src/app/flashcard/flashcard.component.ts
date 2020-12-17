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
  correctFlashcards;
  wrongFlashcards;

  ngOnInit() {
    this.currentFlashcardSet = vocab;
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

  prev() {
    if (this.currentFlashcardIndex !== 0) {
      this.currentFlashcardIndex--;
    } else {
      this.currentFlashcardIndex = this.currentFlashcardSet.length - 1;
    }
  }

  next() {
    if (this.currentFlashcardIndex < this.currentFlashcardSet.length - 1) {
      this.currentFlashcardIndex++;
    } else {
      this.currentFlashcardIndex = 0;
    }
  }

  flip() {
    this.showingJapaneseSide = !this.showingJapaneseSide;
  }

  shuffle() {
    this.cardsShuffled = !this.cardsShuffled;
    this.currentFlashcardSet = this.cardsShuffled ? _.shuffle(vocab) : vocab;
    this.currentFlashcardIndex = 0;
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
      default:
    }
  }

}
