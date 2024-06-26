import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PieceOfNews} from "./piece-of-news";

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsService {

  private apiUrl = 'http://localhost:5000' // flask get_articles endpoint



  constructor(private http: HttpClient) { }

  getArticle(id: number): Observable<PieceOfNews> {
    const url = `${this.apiUrl}/api/article/${id}`;
    const first = this.http.get<any>(url);
    first.subscribe(response => {console.log(response)})
    return this.http.get<PieceOfNews>(url).pipe(
      // tap(_ => console.log(_)),
      catchError(this.handleError<PieceOfNews>("getHeroes", ))
    )
  }

  getShortArticlesOld(country: string = "mexico", keyword: string = "Palestine"): Observable<PieceOfNews[]> {
    const url = `${this.apiUrl}/api/searchOnlineOld/${keyword}`;
    return this.http.get<PieceOfNews[]>(url).pipe(
      // tap(response => console.log(response)),
      catchError(this.handleError<PieceOfNews[]>("getShortArticles"))
    );
  }

  getShortArticlesNew(country: string = "mexico", keyword: string = "Palestine"): Observable<PieceOfNews[]> {
    const url = `${this.apiUrl}/api/searchOnlineNew/${keyword}`;
    return this.http.get<PieceOfNews[]>(url).pipe(
      // tap(response => console.log(response)),
      catchError(this.handleError<PieceOfNews[]>("getShortArticles"))
    );
  }

  getArticleByCountry(country: string): Observable<PieceOfNews> {
    const url = `${this.apiUrl}/country`;
    const first = this.http.get<any>(url);
    first.subscribe(response => {console.log(response)})
    return this.http.get<PieceOfNews>(url).pipe(
      tap(_ => console.log(_)),
      catchError(this.handleError<PieceOfNews>("getHeroes", ))
    )

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a NewsDetails message with the MessageService */
  private log(message: string) {
    /*this.messageService.add(`HeroService: ${message}`);*/
  }
}
