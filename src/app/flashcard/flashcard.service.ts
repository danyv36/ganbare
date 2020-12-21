import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IFlashcardVocab } from './flashcard-vocab.model';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor(private http: HttpClient) {}

  postVocab(req: ICounterReq) {
    return this.http.post<IPostVocabRes>('http://localhost:3000/vocab', req);
  }

  getVocab() {
    return this.http.get<any>('http://localhost:3000/');
  }
}

export interface ICounterReq {
  results: IFlashcardVocab[];
}

export interface IPostVocabRes {
  results: IFlashcardVocab[];
}
