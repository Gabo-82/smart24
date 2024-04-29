import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NyTimesService {

  private apiKey = 'lXuyqQuhY7AtT0MTRdsyrE7YwTOezxOT';
  private apiUrl = 'https://api.nytimes.com/svc/';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    const url = `${this.apiUrl}search/v2/articlesearch.json?api-key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}