// sentiment-bubble.component.ts

import { Component, OnInit } from '@angular/core';
import { PieceOfNews } from '../piece-of-news';
import { NEWS_DATA } from '../country-keyword-news-list/country-keyword-news-list.component'; // Import NEWS_DATA from the appropriate file

@Component({
  selector: 'app-sentiment-bubble',
  templateUrl: './sentiment-bubble.component.html',
  styleUrls: ['./sentiment-bubble.component.css']
})
export class SentimentBubbleComponent implements OnInit {

  sentimentCategories = ['hopeful', 'celebratory', 'informative', 'critical', 'angry', 'sad'];
  sentimentCounts: { [key: string]: number } = {};
  sentimentColors: { [key: string]: string } = {
    hopeful: 'green',
    celebratory: 'gold',
    informative: 'blue',
    critical: 'red',
    angry: 'orange',
    sad: 'purple'
    // Add more sentiment-color mappings as needed
  };

  defaultBubbleSize = 40; // Set a default bubble size for sentiments with count 1
  selectedSentiment: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.calculateSentimentCounts();
  }

  calculateSentimentCounts() {
    // Initialize counts for each sentiment category
    this.sentimentCategories.forEach(sentiment => {
      this.sentimentCounts[sentiment] = 0;
    });

    // Calculate sentiment counts based on NEWS_DATA
    console.log(NEWS_DATA);
    NEWS_DATA.forEach((article : PieceOfNews) => {
      const sentiment = article.sentiment?.toLowerCase();
      console.log(sentiment);
      if (sentiment && this.sentimentCategories.includes(sentiment)) {
        this.sentimentCounts[sentiment] += 1;
        console.log(this.sentimentCounts[sentiment]);
      }
    });
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
