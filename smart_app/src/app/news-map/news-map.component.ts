import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit {
  @ViewChild(CountryKeywordNewsListComponent) KeyWordListComponent: CountryKeywordNewsListComponent | undefined;
  predefinedCountries = new Set<string>();
  countryName: string | null = '';
  currentRoute: string;
  keyWords: CloudData[] = [];
  countriesToSend: string[] = [];

  // Previously in country-keyword-news-list
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);
  articles : PieceOfNews[] = [];
  filteredArticles : PieceOfNews[] | undefined;


  constructor(private cdr: ChangeDetectorRef, private newsDetailsService: NewsDetailsService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
  // constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    //this.currentRoute = router.url.split('/').pop()!;
    this.currentRoute = decodeURIComponent(router.url.split('/').pop()!);

  }

  ngOnInit(): void {
    this.getArticles();
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
  highlightCountries() {
    if (this.articles) {
      const sentimentCountByCountry: { [country: string]: { [sentiment: string]: number } } = {};
  
      // Count the number of articles with each sentiment for each country
      for (const article of this.articles) {
        const country = article.country.toLowerCase();
        const sentiment = article.sentiment.toLowerCase();
  
        // Initialize count object for the country if it doesn't exist
        if (!sentimentCountByCountry[country]) {
          sentimentCountByCountry[country] = {};
        }
  
        // Increment sentiment count for the country
        sentimentCountByCountry[country][sentiment] = (sentimentCountByCountry[country][sentiment] || 0) + 1;
      }
  
      // Determine the predominant sentiment for each country
      const predominantSentimentByCountry: { [country: string]: string } = {};
      for (const country in sentimentCountByCountry) {
        const sentiments = sentimentCountByCountry[country];
        let predominantSentiment = '';
        let maxCount = 0;
        for (const sentiment in sentiments) {
          if (sentiments[sentiment] > maxCount) {
            maxCount = sentiments[sentiment];
            predominantSentiment = sentiment;
          }
        }
        predominantSentimentByCountry[country] = predominantSentiment;
      }
  
      // Change the color of countries on the map based on the predominant sentiment
      const countries = document.querySelectorAll<SVGPathElement>('path.land');
      countries.forEach((country) => {
        const countryName = country.getAttribute('countryName');
        if (countryName) {
          const countryCode = countryName.toLowerCase();
          const predominantSentiment = predominantSentimentByCountry[countryCode];
          if (predominantSentiment) {
            // Set color based on predominant sentiment
            let color = '';
            switch (predominantSentiment) {
              case 'hopeful':
                color = 'green';
                break;
              case 'celebratory':
                color = 'yellow';
                break;
              case 'informative':
                color = 'blue';
                break;
              case 'critical':
                color = 'red';
                break;
              case 'angry':
                color = 'orange';
                break;
              case 'sad':
                color = 'purple';
                break;
              // Add more cases for other sentiments if needed
              default:
                color = 'grey'; // Default color if sentiment is unknown
            }
            country.style.fill = color;
          }
        }
      });
    }
   }

   getArticles(): void {
    this.newsDetailsService.getShortArticlesOld(this.countryName!, this.currentRoute)
      .subscribe(oldArticles => {
        console.log("Here are the articles from getShortArticlesOld: ");
        console.log(oldArticles);
  
        this.newsDetailsService.getShortArticlesNew(this.countryName!, this.currentRoute)
          .subscribe(newArticles => {
            // Combine old and new articles
            const allArticles = oldArticles.concat(newArticles);
            // Filter out duplicates based on article title
            const uniqueArticles = this.filterUniqueArticles(allArticles);
            // Update this.articles with unique articles
            this.articles = uniqueArticles;
            console.log("Here are the articles from getShortArticlesNew ");
            console.log(this.articles);
            this.manageKeywords();
            this.highlightCountries();
          });
      });
  }
  
  filterUniqueArticles(articles: any[]): any[] {
    // Create a set to keep track of unique titles
    const uniqueTitles = new Set();
    // Array to store unique articles
    const uniqueArticles = [];
  
    for (const article of articles) {
      if (!uniqueTitles.has(article.title)) {
        // If title is not in the set, add it to the set and push article to uniqueArticles
        uniqueTitles.add(article.title);
        uniqueArticles.push(article);
      }
    }
  
    return uniqueArticles;
  }

    
  manageKeywords(){
    const keywordCounts: { [keyword: string]: number } = {};

    // Extracting keywords and sending them to the map component
    if (this.articles) {
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
    }
    const newKeyWords: CloudData[] = [];
    for (const keyword in keywordCounts) {
      const text = `${keyword}`;
      const weight = keywordCounts[keyword];
      const color = this.getRandomColor();

      // Check if the text is "None", if not, add it to the newKeyWords array
      if ((text != "None")&&(text!="none")) {
        newKeyWords.push({ text, weight, color });
      }
    }

    // Sort the newKeyWords array based on the weight in descending order
    newKeyWords.sort((a, b) => b.weight - a.weight);

    // Determine the number of elements to display (minimum of 15 or the length of the array)
    const displayCount = Math.min(newKeyWords.length, 15);

    // Select the first 'displayCount' elements
    const limitedKeyWords = newKeyWords.slice(0, displayCount);

    // Create an observable from the limitedKeyWords array
    const changedData$: Observable<CloudData[]> = of(limitedKeyWords);

    // Subscribe to the observable and update keyWords when new data is emitted
    changedData$.subscribe(res => {
      this.keyWords = res; // Update keyWords with the new data
    });
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

