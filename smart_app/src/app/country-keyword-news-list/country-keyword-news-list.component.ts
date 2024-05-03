import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PieceOfNews} from "../piece-of-news";
import {NewsDetailsService} from "../news-details.service";
import {DatePipe, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-country-keyword-news-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, SlicePipe, DatePipe],
  templateUrl: './country-keyword-news-list.component.html',
  styleUrl: './country-keyword-news-list.component.css'
})
export class CountryKeywordNewsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'date', 'url'];
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);

  articles : PieceOfNews[] | undefined;

  constructor(private newsDetailsService: NewsDetailsService) { }

  @Input("country") countryStr!: string;
  @Input("keyword") keywordStr!: string;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    console.log("DATA SOURCE:")
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator!;
    console.log("PAGINATOR:")
    console.log(this.paginator)
    this.getArticles();
    console.log("ARTICLES:")
    console.log(this.articles);
  }

  getArticles(): void {
    this.newsDetailsService.getShortArticles(this.countryStr, this.keywordStr)
      .subscribe(response => {
        this.articles = response;
        this.dataSource = new MatTableDataSource<PieceOfNews>(this.articles);
      })
  }
}

const NEWS_DATA: PieceOfNews[] = [
  {id: 1, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", keyWords: "Koira, Hauva", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", body: "Hello"},
  {id: 1, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", keyWords: "Koira, Hauva", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", body: "Hello"},
  {id: 1, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", keyWords: "Koira, Hauva", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", body: "Hello"},
  {id: 1, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", keyWords: "Koira, Hauva", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", body: "Hello"},
]
