import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CardOfNewsComponent } from '../card-of-news/card-of-news.component';
import {ActivatedRoute, Router} from "@angular/router";
import { CountryKeywordNewsListComponent } from '../country-keyword-news-list/country-keyword-news-list.component';


@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit {
  @ViewChild(CountryKeywordNewsListComponent) KeyWordListComponent: CountryKeywordNewsListComponent | undefined;
  predefinedCountries = new Set<string>();
  ml5Version: string = "";
  articles: any[] = [];
  countryName: string | null = "India";
  currentRoute: string;

  constructor(private nyTimesService: NyTimesService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    //this.currentRoute = router.url.split('/').pop()!;
    this.currentRoute = decodeURIComponent(router.url.split('/').pop()!);

  }

  ngOnInit(): void {
    // this.loadArticles();
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

  
  

  highlightCountries(countryList: string[]) {
    const countries = document.querySelectorAll<SVGPathElement>('path.land');
    countries.forEach((country)=>{
      const countryName = country.getAttribute('countryName');
      if ((countryName) && (countryList.includes(countryName.toLowerCase()))){
        country.style.fill = 'yellow';
      }
    })
   }

   openDialog(countryName: string){
    const dialogRef = this.dialog.open(CardOfNewsComponent, {
      data: {
        title: "News artiles from " + countryName,
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
}


