import {Component, Input, OnInit} from '@angular/core';

import { PieceOfNews} from "../../piece-of-news";
import { NewsDetailsService} from "../../news-details.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForOf, NgIf} from "@angular/common";

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit{
  selectedArticle: PieceOfNews | undefined;
  factCheckScore: number | undefined;
  @Input() article: any;

  constructor(private newsDetailsService: NewsDetailsService,
    private http: HttpClient
    ) { }
  ngOnInit(): void {
    this.getArticle();
  }
  getArticle(): void {
    this.newsDetailsService.getArticle(1)
      .subscribe(response => {
        this.selectedArticle = response;
      })
  }
  getArticle_dummy(): void {
    // Hard-coded dummy data
    const dummyData: PieceOfNews = {
      id: 1,
      title: 'Dummy Article',
      country: 'Dummy Country',
      url: 'https://dummyurl.com',
      keyWords: 'dummy, test, example',
      date: new Date(),
      imgUrl: 'https://dummyimageurl.com',
      category: 'Dummy Category',
      description: 'Finland is a country. We are happy.',
      language: 'English',
      body: 'This is a dummy article body.',
      sentiment: 'Neutral'
    };

    // Assigning the dummy data to selectedArticle
    this.selectedArticle = dummyData;
  }


  async factCheck(sentence: string| undefined): Promise<void> {
    // Check if sentence is not empty
    if (!sentence) {
      console.log('Sentence is empty');
      return;
    }

    // API endpoint and key
    const apiEndpoint = "https://idir.uta.edu/claimbuster/api/v2/score/text/";
    const apiKey = "4f80e4f3aaea4cb59be3a10d05dfd60d";

    // Prepare headers
    const headers = new HttpHeaders().set('x-api-key', apiKey);

    // Prepare payload
    const payload = { input_text: sentence };

    // Send POST request to API
    try {
      const response = await this.http.post<any>(apiEndpoint, payload, { headers }).toPromise();
      this.factCheckScore = response.results[0].score;
      console.log('Fact-check score:', this.factCheckScore);
    } catch (error) {
      console.error('Error while fact-checking:', error);
    }
  }
}
