import { Component } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import {ForerontSentimentService} from "../foreront-sentiment.service";
import {Router} from "@angular/router";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent {
  articles: any[] = [];


  constructor(private nyTimesService: NyTimesService, private forefrontSentimentService: ForerontSentimentService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.nyTimesService.getArticles().subscribe(response => {
      console.log(response.response.docs[0]);
    });
  }
  // testApi(): void {
  //   this.forefrontSentimentService.getSentimentHttp().then(
  //     response => console.log(response));
  // }
  testApiHttp(): void {
    this.forefrontSentimentService.getSentimentHttp().subscribe( response => {
      console.log(response)
    });
  }
}
