import { Component } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { ForefrontSentimentService } from '../foreront-sentiment.service';

@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent {
  articles: any[] = [];

  constructor(private nyTimesService: NyTimesService, private forefrontService: ForefrontSentimentService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.nyTimesService.getArticles().subscribe(response => {
      console.log(response.response.docs[0]);
    });
  }

  loadSentimentAnalysis(): void{
    console.log(this.forefrontService.getSentiment());
  }
}
