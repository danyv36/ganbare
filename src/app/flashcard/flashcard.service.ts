import { Injectable } from '@angular/core';
import { IFlashcardVocab, IQuizResult, IResultsTally } from './flashcard-vocab.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { FlashcardFactory } from './flashcard.factory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor(private db: AngularFireDatabase) {}

  postVocab(currentResults: IResultsTally[], quizResults: IQuizResult[]): Promise<void> {
    const updatedResults = FlashcardFactory.setVocabPayload(currentResults, quizResults);
    console.log('will post this to the database::', updatedResults);
    return this.db.object(`/results/vocab`).set(updatedResults);
  }

  getVocab(): Observable<IResultsTally[]> {
    return this.db.object('/results/vocab').snapshotChanges().pipe(
      map((vocab) => {
        return (vocab.payload.val() as any as IResultsTally[]);
      })
    );
  }
}

export interface ICounterReq {
  results: IQuizResult[];
}

export interface IPostVocabRes {
  results: IFlashcardVocab[];
}
