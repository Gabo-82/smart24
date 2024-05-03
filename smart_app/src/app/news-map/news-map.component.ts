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
    this.currentRoute = router.url.split('/').pop()!;
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

  
  

   // 미리 정의된 국가들을 찾아서 지도상에서 강조하여 표시하는 함수
  highlightCountries(countryList: string[]) {
    // SVG 내의 모든 국가들을 가져옴
    const countries = document.querySelectorAll<SVGPathElement>('path.land');
    countries.forEach((country)=>{
      const countryName = country.getAttribute('countryName');
      // 미리 정의된 국가 배열에 해당 국가가 포함되어 있는지 확인
      if ((countryName) && (countryList.includes(countryName.toLowerCase()))){
        // 미리 정의된 국가를 강조하기 위해 색상을 변경
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
  }


