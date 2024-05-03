// sentiment-bubble.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadSentimentCounts();
  }

  loadSentimentCounts() {
    // Make HTTP request to fetch sentiment counts from backend API
    this.http.get<any>('/api/sentiment').subscribe(
      (sentimentData: any) => {
        this.sentimentCounts = sentimentData; // Assuming sentimentData is in the format { "hopeful": 10, "celebratory": 5, ... }
      },
      (error) => {
        console.error('Error fetching sentiment counts:', error);
      }
    );
  }

  getBubbleSize(sentiment: string): number {
    return this.sentimentCounts[sentiment] || 0; // Return count of articles for the given sentiment
  }

  getBubbleColor(sentiment: string): string {
    return this.sentimentColors[sentiment] || 'gray'; // Return color based on sentiment
  }

}
