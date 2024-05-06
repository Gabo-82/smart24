import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PieceOfNews} from "../piece-of-news";
import {NewsDetailsService} from "../news-details.service";

@Component({
  selector: 'app-country-keyword-news-list',
  templateUrl: './country-keyword-news-list.component.html',
  styleUrl: './country-keyword-news-list.component.css'
})
export class CountryKeywordNewsListComponent implements AfterViewInit, OnChanges {
  @Output() sendCountryToMap = new EventEmitter<string[]>();
  @Output() sendKeywordsToMap = new EventEmitter<{ [keyword: string]: number }>();
  sentimentCounts: { [key: string]: number } = {};
  predefinedCountries = new Set<string>();
  countriesToSend: string[] = [];
  displayedColumns: string[] = ['id', 'title', 'date', 'url'];
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);

  articles : PieceOfNews[] = [];
  filteredArticles : PieceOfNews[] = [];
  router: any;
  dialog: any;

  sentimentCategories = ['hopeful', 'celebratory', 'informative', 'critical', 'angry', 'sad','n'];

  sentimentColors: { [key: string]: string } = {
    hopeful: 'green',
    celebratory: 'gold',
    informative: 'blue',
    critical: 'red',
    angry: 'orange',
    sad: 'purple',
    n : 'grey'
  };

  constructor(private newsDetailsService: NewsDetailsService) {
  }

  @Input({required: true}) countryStr!: string;
  @Input({required: true}) keywordStr!: string;
  @Input({required: true}) articles2: PieceOfNews[] = [];

  ngOnChanges(): void {
    console.log("CountryKeywordNewsListComponent", this.countryStr);
    this.articles = this.articles2;
    this.filteredArticles = this.articles;
    if (this.filteredArticles && this.filteredArticles.length > 0) {
      this.filteredArticles = this.articles!.filter((article: PieceOfNews) => {
        if (this.countryStr === "") {
          return true;
        } else {
          return article.country.toLowerCase() === this.countryStr.toLowerCase();
        }
      })
    }
    this.dataSource.filter = (this.countryStr);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.filterPredicate = function (record: PieceOfNews, filter: string) {
      return record.country === filter;
    }
    this.articles = this.articles2;
    this.filteredArticles = this.articles;
  }

  filterArticlesBySentiment(sentiment: string): void {
    this.filteredArticles = this.articles!.filter(article => article.sentiment === sentiment);
  }

  getBubbleSize(sentiment: string): number {
    // Calculate bubble size based on article count for the given sentiment
    const count = this.sentimentCounts[sentiment] || 0;
    // Adjust scaling factor based on desired visual representation
    return count * 10; // Example scaling factor (adjust as needed)
  }

  clickNews() {
    this.router.navigate(["/details"]);
  }
}
export const NEWS_DATA: PieceOfNews[] = [
  {id: 1, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 2, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 3, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 4, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 5, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 6, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 7, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 8, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 1, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 2, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 3, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 4, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 5, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 6, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 7, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 8, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 1, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 2, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'eden hazard']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 3, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 4, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 5, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 6, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['jude belligham', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 7, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 8, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 1, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 2, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 3, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 4, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 5, title: "US: New York Police 1",score: 5, goodOrbad: "bad", bias: "neutral", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 6, title: "US: New York Police 2",score: 5, goodOrbad: "bad", bias: "neutral", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 7, title: "US: New York Police 3",score: 5, goodOrbad: "bad", bias: "neutral", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
  {id: 8, title: "US: New York Police 4",score: 5, goodOrbad: "bad", bias: "neutral", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", summary: "Hello", sentiment: "Happy", factCheckScore: 0.1},
]
