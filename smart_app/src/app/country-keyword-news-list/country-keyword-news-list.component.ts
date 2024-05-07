import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
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
    hopeful: '#90f488',
    celebratory: '#fff684',
    informative: '#e1e8ea',
    critical: '#fa956c',
    angry: '#f85f52',
    sad: '#9eddff',
    n : 'white'

    // Add more sentiment-color mappings as needed
  };
  goodBadCategories = ['good', 'bad'];
  neutralBiasedCategories = ['neutral', 'biased'];

  // Button initialized state
  // isToggled = false;
  isToggled = {
    goodOrbad: false,
    biased: false
  }
  selectedSentiments = [];
  selectedOptionsGB = [];
  selectedOptionsBias = [];

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

  resetSentimentFilter(): void {
    this.filteredArticles = this.articles
    this.selectedOptionsGB = [];
    this.selectedOptionsBias = [];
    this.selectedSentiments = [];
  }

  filterArticlesByNeutralBiased(): void {
    console.log("START filterArticlesByNeutralBiased");
    console.log("All articles",this.articles);
    this.filteredArticles = this.articles
    console.log(this.selectedOptionsGB);
    if (this.selectedOptionsGB.length > 0) {
      // filter by if either selected option is a substring of article.bias
      this.filteredArticles = this.filteredArticles.filter(article => {
        return this.selectedOptionsGB.some((substring: string) => article.goodOrbad.trim().toLowerCase().indexOf(substring.toLowerCase()) > -1)
      });
    }
    // console.log(this.selectedOptionsBias);
    if (this.selectedOptionsBias.length > 0) {
      this.filteredArticles = this.filteredArticles.filter(article => {
        // console.log("ret", ret);
        return this.selectedOptionsBias.some((substring: string) => {
          // console.log("substring",substring);
          // console.log(article.bias);
          // const bigString = article.bias.trim().toLowerCase().indexOf(substring.toLowerCase());
          // console.log("bigString",bigString);
          // console.log(article.bias.trim().toLowerCase().indexOf(substring.toLowerCase()) > -1);
          return article.bias.trim().toLowerCase().indexOf(substring.toLowerCase()) > -1

        });
      })
    }
    console.log(this.articles);
    console.log(this.selectedSentiments);
    if(this.selectedSentiments.length > 0) {
      this.filteredArticles = this.filteredArticles.filter(article => {
        return this.selectedSentiments.some((substring: string) => {
          // console.log("inside some")
          // console.log(article.sentiment);
          return article.sentiment === substring;
        })
      })
    }
    console.log(this.filteredArticles);
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
