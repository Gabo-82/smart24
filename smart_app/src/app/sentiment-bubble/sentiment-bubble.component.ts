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

  // Adjust this value to control the maximum size of the bubble
  MAX_BUBBLE_SIZE = 100; // Example: Maximum bubble size in pixels

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
    NEWS_DATA.forEach((article : PieceOfNews) => {
      const sentiment = article.sentiment?.toLowerCase();
      if (sentiment && this.sentimentCategories.includes(sentiment)) {
        this.sentimentCounts[sentiment] += 1;
      }
    });
  }

  getBubbleSize(sentiment: string): number {
    const count = this.sentimentCounts[sentiment] || 0;

    // Calculate bubble size based on the count of articles for the given sentiment
    // Use a logarithmic scaling factor to determine the bubble size
    const maxSize = Math.log(this.getMaxCount() + 1); // Apply logarithm to ensure scaling is more even
    const size = (Math.log(count + 1) / maxSize) * this.MAX_BUBBLE_SIZE;

    return size;
  }

  getMaxCount(): number {
    // Find the maximum count among all sentiment categories
    return Math.max(...this.sentimentCategories.map(sentiment => this.sentimentCounts[sentiment] || 0));
  }

  getBubbleColor(sentiment: string): string {
    return this.sentimentColors[sentiment] || 'gray'; // Return color based on sentiment
  }

}
