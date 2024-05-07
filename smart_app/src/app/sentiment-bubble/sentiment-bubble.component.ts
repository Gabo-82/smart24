// sentiment-bubble.component.ts

import {Component, Input, OnInit} from '@angular/core';
import { PieceOfNews } from '../piece-of-news';
import { NEWS_DATA } from '../country-keyword-news-list/country-keyword-news-list.component'; // Import NEWS_DATA from the appropriate file
// import { CountryKeywordNewsListComponent } from '../country-keyword-news-list/country-keyword-news-list.component';

@Component({
  selector: 'app-sentiment-bubble',
  templateUrl: './sentiment-bubble.component.html',
  styleUrls: ['./sentiment-bubble.component.css']
})
export class SentimentBubbleComponent implements OnInit {

  sentimentCategories = ['hopeful', 'celebratory', 'informative', 'critical', 'angry', 'sad'];
  sentimentCounts: { [key: string]: number } = {};
  sentimentColors: { [key: string]: string } = {
    hopeful: '#90f488',
    celebratory: '#fff684',
    informative: '#e1e8ea',
    critical: '#fa956c',
    angry: '#f85f52',
    sad: '#9eddff',
    // Add more sentiment-color mappings as needed
  };

  defaultBubbleSize = 40; // Set a default bubble size for sentiments with count 1
  selectedSentiment: string | null = null;

  constructor() { }

  @Input({required: true}) articles2!: PieceOfNews[];

  ngOnChange(): void {
    this.calculateSentimentCounts()
  }

  ngOnInit(): void {
    this.calculateSentimentCounts();
  }

  calculateSentimentCounts(): void {
    const articles = this.articles2 // Access articles from CountryKeywordNewsListComponent

    if (articles) {
      this.sentimentCounts = {}; // Clear existing counts

      articles.forEach(article => {
        const sentiment = article.sentiment?.toLowerCase();

        if (sentiment && this.sentimentCategories.includes(sentiment)) {
          this.sentimentCounts[sentiment] = (this.sentimentCounts[sentiment] || 0) + 1;
        }
      });
    }
  }

  getBubbleSize(sentiment: string): number {
    const count = this.sentimentCounts[sentiment] || 0;

    // Calculate bubble size based on the count of articles for the given sentiment
    // Use a larger default size for sentiments with count 1
    const size = count > 0 ? this.defaultBubbleSize + (count - 1) * 10 : this.defaultBubbleSize;

    return size;
  }

  getBubbleColor(sentiment: string): string {
    return this.sentimentColors[sentiment] || 'gray'; // Return color based on sentiment
  }

  onSelectSentiment(sentiment: string) {
    this.selectedSentiment = sentiment;
  }

  resetSelection() {
    this.selectedSentiment = null;
  }

  getArticlesBySentiment(sentiment: string): PieceOfNews[] {
    if (!sentiment) {
      return []; // Return an empty array if sentiment is null or undefined
    }
    return NEWS_DATA.filter(article => article.sentiment?.toLowerCase() === sentiment);
  }
}
