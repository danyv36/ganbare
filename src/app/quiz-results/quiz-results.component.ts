import { Component, OnInit } from '@angular/core';
import { FlashcardState } from '../flashcard/flashcard.state';
import { IQuizResult } from '../flashcard/flashcard-vocab.model';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  constructor(private state: FlashcardState) {}

  ngOnInit() {}

  getCardClass(result: IQuizResult) {
    return result.Correct ? 'result-correct' : 'result-wrong';
  }
}
