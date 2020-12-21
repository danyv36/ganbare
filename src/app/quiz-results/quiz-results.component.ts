import { Component, OnInit } from '@angular/core';
import { FlashcardState } from '../flashcard/flashcard.state';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  constructor(private state: FlashcardState) {}

  ngOnInit() {}
}
