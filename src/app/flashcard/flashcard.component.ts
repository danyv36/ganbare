import { Component, OnInit, HostListener } from '@angular/core';
import { vocab } from '../vocab/vocabulary';
import * as _ from 'lodash';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  constructor() { }

  currentVocab;
  currentWordIndex = 0;
  showingJapaneseSide = true;
  cardsShuffled = false;

  ngOnInit() {
    this.currentVocab = _.shuffle(vocab);
  }

  get counter() {
    return `${this.currentWordIndex + 1}/${this.currentVocab.length}`
  }

  get currentWord() {
    return this.showingJapaneseSide ? this.currentVocab[this.currentWordIndex].Japanese : this.currentVocab[this.currentWordIndex].English;
  }

  get currentWordHiragana() {
    if (!this.showingJapaneseSide) {
      return '';
    }
    return this.currentVocab[this.currentWordIndex].Hiragana;
  }

  get shuffleBtnClass() {
    return this.cardsShuffled ? 'btn-primary' : 'btn-off';
  }

  prev() {
    if (this.currentWordIndex !== 0) {
      this.currentWordIndex--;
    } else {
      this.currentWordIndex = this.currentVocab.length - 1;
    }
  }

  next() {
    if (this.currentWordIndex < this.currentVocab.length - 1) {
      this.currentWordIndex++;
    } else {
      this.currentWordIndex = 0;
    }
  }

  flip() {
    this.showingJapaneseSide = !this.showingJapaneseSide;
  }

  shuffle() {
    this.cardsShuffled = !this.cardsShuffled;
    this.currentVocab = this.cardsShuffled ? _.shuffle(vocab) : vocab;
    this.currentWordIndex = 0;
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
