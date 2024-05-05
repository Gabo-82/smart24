import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PieceOfNews} from "../piece-of-news";
import {NewsDetailsService} from "../news-details.service";
import {DatePipe, SlicePipe} from "@angular/common";
import { CardOfNewsComponent } from '../card-of-news/card-of-news.component';

@Component({
  selector: 'app-country-keyword-news-list',
  templateUrl: './country-keyword-news-list.component.html',
  styleUrl: './country-keyword-news-list.component.css'
})
export class CountryKeywordNewsListComponent implements AfterViewInit, OnChanges{
  @Output() sendCountryToMap = new EventEmitter<string[]>();
  @Output() sendKeywordsToMap = new EventEmitter<{ [keyword: string]: number }>();
  sentimentCounts: { [key: string]: number } = {};
  predefinedCountries = new Set<string>();
  countriesToSend: string[] = [];
  displayedColumns: string[] = ['id', 'title', 'date', 'url'];
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);

  articles : PieceOfNews[] = [];
  filteredArticles : PieceOfNews[] | undefined;
  router: any;
  dialog: any;

  constructor(private newsDetailsService: NewsDetailsService) { }

  @Input({required: true}) countryStr!: string;
  @Input({required: true}) keywordStr!: string;

  ngOnChanges(): void {
    console.log("CountryKeywordNewsListComponent", this.countryStr);
    this.filteredArticles = this.articles!.filter((article: PieceOfNews ) => {
    return article.country.toLowerCase() === this.countryStr.toLowerCase();})
    this.dataSource.filter = (this.countryStr);
    console.log(this.dataSource.filteredData)
    // this.customFilter =
    // this.dataSourcefilter(article => article.country === this.countryStr.toLowerCase()
    // this.dataSource.filter((article: PieceOfNews) => article.country === this.countryStr.toLowerCase());
  }

  ngOnInit(): void {
    // this.loadArticles();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    // console.log("DATA SOURCE:")
    // console.log(this.dataSource);
    this.dataSource.paginator = this.paginator!;
    // this.dataSource.filterPredicate = (data:PieceOfNews, filter:string) => (data.country.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1)
    this.dataSource.filterPredicate = function (record : PieceOfNews,filter: string) {
      return record.country === filter;
    }
    // console.log("PAGINATOR:")
    // console.log(this.paginator)
    this.articles = NEWS_DATA;
    //this.getArticles();
    // console.log("After get request:")
    // console.log(this.articles)
    // console.log("ARTICLES:")
    // console.log(this.articles);
    this.displayCountry();
    this.evaluateAndSendKeywords();
  }

  customFilter(): (data: PieceOfNews, filter: string) => boolean {
    let filterFunction = function (data: PieceOfNews, filter: string): boolean {
      // return data.country.toLowerCase() == filter.toLowerCase();
      return true;
    }
    return filterFunction
  }


  getArticles(): void {
    this.newsDetailsService.getShortArticles(this.countryStr, this.keywordStr)
      .subscribe(response => {
        this.articles = response;
        // console.log("After subscribe")
        // console.log(this.articles);
        this.filteredArticles = this.articles;
        // with dummy: this.dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);
        this.dataSource = new MatTableDataSource<PieceOfNews>(this.articles);
      })
  }

  loadArticles(): void {
    // Assuming you fetch articles from your service or use the predefined data
    const articles: PieceOfNews[] = [
      // Sample PieceOfNews data (replace with actual data retrieval logic)
    ];

    // Calculate sentiment counts
    this.sentimentCounts = this.calculateSentimentCounts(articles);

    // Emit the list of sentiment categories to the parent component
    const sentimentCategories = Object.keys(this.sentimentCounts);
    this.sendCountryToMap.emit(sentimentCategories);
  }

  private calculateSentimentCounts(articles: PieceOfNews[]): { [key: string]: number } {
    const counts: { [key: string]: number } = {};

    // Count articles per sentiment category
    articles.forEach(article => {
      if (article.sentiment && article.sentiment.trim() !== '') {
        const sentiment = article.sentiment.toLowerCase();
        counts[sentiment] = (counts[sentiment] || 0) + 1;
      }
    });

    return counts;
  }

  getBubbleSize(sentiment: string): number {
    // Calculate bubble size based on article count for the given sentiment
    const count = this.sentimentCounts[sentiment] || 0;
    // Adjust scaling factor based on desired visual representation
    return count * 10; // Example scaling factor (adjust as needed)
  }

  clickNews(){
    this.router.navigate(["/details"]);
  }

  openDialog(){
    const dialogRef = this.dialog.open(CardOfNewsComponent, {
      data: {
        title: "News article with id",
        date: "Dummy date",
        description: "Dummy description"
      }
    });
  }

  displayCountry(){
    if (this.articles){
      for (const article of this.articles){
        this.predefinedCountries.add(article.country);
      }
      for (const country of this.predefinedCountries){
        this.countriesToSend.push(country.toLowerCase());
      }
      this.sendCountryToMap.emit(this.countriesToSend);
    }
  }

  evaluateAndSendKeywords(){
    const keywordCounts: { [keyword: string]: number } = {};
        
    // Extracting keywords and sending them to the map component
    if(this.articles){
      for (const article of this.articles) {
        let keywords: string[];

        // Check if keyWords contains '[' and ']'
        if (article.keyWords.includes("[") && article.keyWords.includes("]")) {
            // If so, remove '[' and ']', split the string by comma and trim whitespace
            keywords = article.keyWords
                .replace(/'/g, "")
                .replace("[", "")
                .replace("]", "")
                .split(",")
                .map((keyword: string) => keyword.trim());
        } else {
            // Otherwise, it's a single keyword
            keywords = [article.keyWords];
        }

        // Iterate through each keyword
        for (const keyword of keywords) {
            // If the keyword already exists in the keywordCounts object, increment its count
            // Otherwise, initialize its count to 1
            keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
        }
    }
    this.sendKeywordsToMap.emit(keywordCounts);
    }
  }


}
export const NEWS_DATA: PieceOfNews[] = [
  {id: 1, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 2, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 3, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 4, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 5, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 6, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 7, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 8, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 1, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 2, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 3, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 4, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 5, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 6, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 7, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 8, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 1, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 2, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'eden hazard']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 3, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 4, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 5, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 6, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['jude belligham', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 7, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 8, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 1, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 2, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 3, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 4, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 5, title: "US: New York Police 1", country: "peru", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "Finland is a country. You are always happy.", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 6, title: "US: New York Police 2", country: "india", url: "https://thenewsmill.com", keyWords: "['soccer', 'ronaldo']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 7, title: "US: New York Police 3", country: "mexico", url: "https://thenewsmill.com", keyWords: "soccer", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
  {id: 8, title: "US: New York Police 4", country: "russia", url: "https://thenewsmill.com", keyWords: "['soccer', 'zinedine zidane', 'messi']", date: new Date("2024-05-01 09:05:32+05:30"), imgUrl: "https://example.com", category: "Hello", description: "juuba", language: "en", body: "Hello", sentiment: "Happy"},
]
