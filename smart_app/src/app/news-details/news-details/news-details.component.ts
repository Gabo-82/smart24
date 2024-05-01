import {Component, OnInit} from '@angular/core';

import { PieceOfNews} from "../../piece-of-news";
import { NewsDetailsService} from "../../news-details.service";

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit{
  selectedArticle: PieceOfNews | undefined;
  constructor(private newsDetailsService: NewsDetailsService) { }
  ngOnInit(): void {
    this.getArticle();
  }
  getArticle(): void {
    this.newsDetailsService.getArticle(1)
      .subscribe(response => {
        this.selectedArticle = response;
      })
  }
}
