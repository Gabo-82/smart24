import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {PieceOfNews} from "../piece-of-news";
import {NewsDetailsService} from "../news-details.service";
@Component({
  selector: 'app-country-keyword-news-list',
  templateUrl: './country-keyword-news-list.component.html',
  styleUrl: './country-keyword-news-list.component.css'
})
export class CountryKeywordNewsListComponent implements AfterViewInit {
  @Output() sendCountryToMap = new EventEmitter<string[]>();
  predefinedCountries = new Set<string>();
  countriesToSend: string[] = [];
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
    this.articles = NEWS_DATA; //Using the dummy to test the highlighting function
    //this.getArticles();
    if (this.articles){
      for (const article of this.articles){
        this.predefinedCountries.add(article.country);
      }
      for (const country of this.predefinedCountries){
        this.countriesToSend.push(country.toLowerCase());
      }
      this.sendCountryToMap.emit(this.countriesToSend);
    }
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