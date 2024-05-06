
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PieceOfNews } from '../piece-of-news';
import { NewsDetailsService } from '../news-details.service';
import { NEWS_DATA } from '../country-keyword-news-list/country-keyword-news-list.component';

@Component({
  selector: 'app-fact-check',
  templateUrl: './fact-check.component.html',
  styleUrls: ['./fact-check.component.css']
})
export class FactCheckComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['title', 'factCheckScore', 'date', 'source'];
  dataSource = new MatTableDataSource<PieceOfNews>();
  articles: PieceOfNews[] = [];
  filteredArticles : PieceOfNews[] | undefined;

  constructor(private newsDetailsService: NewsDetailsService) { }
  @Input({required: true}) countryStr!: string;
  @Input({required: true}) keywordStr!: string;
  @Input({required: true}) articles2!: PieceOfNews[];

  ngOnChanges(): void {
    this.articles = this.articles2;
    // for (let i = 0; i < this.articles.length; i++) {
    //    this.articles[i].factCheckScore = Math.random();
    // }
    this.filteredArticles = this.articles;
    if (this.filteredArticles && this.filteredArticles.length > 0) {
      this.filteredArticles = this.articles!.filter((article: PieceOfNews) => {
        return article.country.toLowerCase() === this.countryStr.toLowerCase();
      })
    }
    console.log("factCheckComponent", this.filteredArticles);

  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    // Assuming you fetch fact-checked articles from your service or use the predefined data
    const factCheckedArticles: PieceOfNews[] = [
      // Sample PieceOfNews data (replace with actual data retrieval logic)
    ];

    // Assign the data source
    this.dataSource.data = (NEWS_DATA);
  }
}



