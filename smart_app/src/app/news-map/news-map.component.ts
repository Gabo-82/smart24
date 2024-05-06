import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CardOfNewsComponent } from '../card-of-news/card-of-news.component';
import {ActivatedRoute, Router} from "@angular/router";
import {
  CountryKeywordNewsListComponent,
  NEWS_DATA
} from '../country-keyword-news-list/country-keyword-news-list.component';
import { CloudData } from 'angular-tag-cloud-module'
import {PieceOfNews} from "../piece-of-news";
import {MatTableDataSource} from "@angular/material/table";
import {NewsDetailsService} from "../news-details.service";


@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit, AfterViewInit {
  @ViewChild(CountryKeywordNewsListComponent) KeyWordListComponent: CountryKeywordNewsListComponent | undefined;
  predefinedCountries = new Set<string>();
  ml5Version: string = "";
  // articles: any[] = [];
  countryName: string | null = "India";
  currentRoute: string;
  keyWords: CloudData[] = [];

  // Previously in country-keyword-news-list
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);
  articles : PieceOfNews[] = [];
  filteredArticles : PieceOfNews[] | undefined;


  constructor(private newsDetailsService: NewsDetailsService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    //this.currentRoute = router.url.split('/').pop()!;
    this.currentRoute = decodeURIComponent(router.url.split('/').pop()!);

  }

  ngOnInit(): void {
    // this.loadArticles();
    this.getArticles();
  }

  ngAfterViewInit() {

  }

  onRegionClick_first_version(event: MouseEvent){
    const target = event.target as HTMLButtonElement;
    let clickedCountryName = target.getAttribute('countryName');
    this.countryName = clickedCountryName;
    // alert("You clicked on: " + clickedCountryName);
    if(clickedCountryName){
       this.openDialog(clickedCountryName);
    // Redirect to Otso's component that presents data

    }
  }

  onRegionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    let clickedCountryName = target.getAttribute('countryName');
    this.countryName = clickedCountryName;

    if (clickedCountryName) {
      //this.openDialog(clickedCountryName);
      // Scroll to the component
      const element = document.querySelector('app-country-keyword-news-list');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
   // 미리 정의된 국가들을 찾아서 지도상에서 강조하여 표시하는 함수
  highlightCountries(countryList: string[]) {
    const countries = document.querySelectorAll<SVGPathElement>('path.land');
    countries.forEach((country)=>{
      const countryName = country.getAttribute('countryName');
      if ((countryName) && (countryList.includes(countryName.toLowerCase()))){
        country.style.fill = 'yellow';
      }
    })
   }

  getArticles(): void {
    this.newsDetailsService.getShortArticles(this.countryName!, this.currentRoute)
      .subscribe(response => {
        this.articles = response;
        // for (let i = 0; i < this.articles.length; i++) {
        //   this.articles[i].sentiment = this.sentimentCategories[~~(Math.random() * this.sentimentCategories.length)];
        // }
        this.articles.forEach((article: PieceOfNews) => {
          article.sentiment = 'hopeful'
        })
        console.log("After subscribe")
        console.log(this.articles);
        // console.log("After subscribe")
        // console.log(this.articles);
        // this.filteredArticles = this.articles;
        // with dummy: this.dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);
        // this.dataSource = new MatTableDataSource<PieceOfNews>(this.articles);
        // this.displayCountry();
        // this.evaluateAndSendKeywords();
      })
  }

  manageKeywords(keyWordList: { [keyword: string]: number }){
    const rootURL = 'https://localhost:4200/';
    for (const keyword in keyWordList) {
      const text = `${keyword}`;
      const weight = keyWordList[keyword];
      const color = this.getRandomColor();
      this.keyWords.push({ text, weight, color});
    }
  }

   openDialog(countryName: string){
    const dialogRef = this.dialog.open(CardOfNewsComponent, {
      data: {
        title: "News articles from " + countryName,
        date: "Dummy date",
        description: "Dummy description"
      }
    });
  }

    //clicking the button to show sentimental clustering
    showSentimentalContent: boolean = false;
    showFactCheck: boolean = false;
    showNewsList: boolean = true;


    openSentimental() {
      this.showSentimentalContent = true;
      this.showFactCheck = false;
      this.showNewsList = false;
    }

    goBack() {
      this.showSentimentalContent = false;
      this.showFactCheck = false;
      this.showNewsList = true;
    }

    openFactCheck() {
      this.showFactCheck = true;
      this.showSentimentalContent = false;
      this.showNewsList = false;
    }

    goBackfromFact() {
      this.showFactCheck = false;
      this.showSentimentalContent = false;
      this.showNewsList = true;
    }

    getRandomColor() {
      // Generate random values for RGB components
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // Convert RGB values to hexadecimal format
      const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

      return color;
  }

}

