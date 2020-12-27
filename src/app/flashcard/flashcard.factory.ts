import { IResultsTally, IQuizResult } from './flashcard-vocab.model';
import clone from 'lodash/clone';

export class FlashcardFactory {
    static setVocabPayload(currentResults: IResultsTally[], quizResults: IQuizResult[]): IResultsTally[] {
        console.log('quizResults::', quizResults);
        let results = currentResults.map((a) => {
            const wordIndex = quizResults.findIndex((v) => v.Id === a.Id);
            if (wordIndex >= 0) {
                if (quizResults[wordIndex].Correct) {
                    a.RightCounter = a.RightCounter ? ++a.RightCounter : 1;
                } else {
                    a.WrongCounter += a.WrongCounter ? ++a.WrongCounter : 1;
                }
                quizResults.splice(wordIndex, 1);
            }
            return a;
        });

        if (quizResults.length > 0) {
            // new words which hadn't been quizzed yet
            const newResults = quizResults.filter((r) => !!r).map((r) => {
                if (r.Correct) {
                    r.RightCounter = 1;
                } else {
                    r.WrongCounter = 1;
                }
                delete r.Correct;
                return r as IResultsTally;
            });
            results = results.concat(newResults);
        }

        return results;
    }
}
