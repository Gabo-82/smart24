import { Component } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { ForefrontSentimentService } from '../forefront-sentiment.service';

@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent {
  articles: any[] = [];

  constructor(private nyTimesService: NyTimesService, private forefrontSentimentService: ForefrontSentimentService) { }

  ngOnInit(): void {
    this.loadArticles();
    this.testApiHttp();
  }

  loadArticles(): void {
    this.nyTimesService.getArticles().subscribe(response => {
      console.log(response.response.docs[0]);
    });
  }

  testApiHttp(): void {
    this.forefrontSentimentService.getSentimentHttp().subscribe( response => {
      console.log(response);
      console.log("hello");
    });
  }
}
