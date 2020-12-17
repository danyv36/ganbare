import { Component, OnInit } from '@angular/core';
import { vocab } from '../vocab/vocabulary';
import * as _ from 'lodash';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  constructor() { }

  shuffledVocab;
  currentWordIndex = 0;
  showingJapaneseSide = true;

  ngOnInit() {
    this.shuffledVocab = _.shuffle(vocab);
  }

  prev() {
    if (this.currentWordIndex !== 0) {
      this.currentWordIndex--;
    }
  }

  next() {
    if (this.currentWordIndex < this.shuffledVocab.length) {
      this.currentWordIndex++;
      console.log('next!!', this.currentWordIndex);
    }
  }

  get counter() {
    return `${this.currentWordIndex + 1}/${this.shuffledVocab.length}`
  }

  get currentWord(){
    return this.showingJapaneseSide ? this.shuffledVocab[this.currentWordIndex].Japanese : this.shuffledVocab[this.currentWordIndex].English;
  }

  flip() {
    this.showingJapaneseSide = !this.showingJapaneseSide;
  }

}
