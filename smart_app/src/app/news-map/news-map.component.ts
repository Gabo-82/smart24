import { Component, HostListener, OnInit } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CardOfNewsComponent } from '../card-of-news/card-of-news.component';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit {
  predefinedCountries = ["Finland", "South Korea", "Chile", "Canada", "Japan"];
  ml5Version: string = "";
  articles: any[] = [];
  countryName: string | null = "hello";
  currentRoute: string;

  constructor(private nyTimesService: NyTimesService, public dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentRoute = router.url.split('/').pop()!;
  }

  ngOnInit(): void {
    // this.loadArticles();
    this.highlightCountries();
  }
  onRegionClick(event: MouseEvent){
    const target = event.target as HTMLButtonElement;
    let clickedCountryName = target.getAttribute('countryName');
    this.countryName = clickedCountryName;
    alert("You clicked on: " + clickedCountryName);
    if(clickedCountryName){
      this.openDialog(clickedCountryName);
    // Redirect to Otso's component that presents data
    }
  }

   // 미리 정의된 국가들을 찾아서 지도상에서 강조하여 표시하는 함수
  highlightCountries() {
    // SVG 내의 모든 국가들을 가져옴
    const countries = document.querySelectorAll<SVGPathElement>('path.land');
    countries.forEach((country)=>{
      const countryName = country.getAttribute('countryName');
      // 미리 정의된 국가 배열에 해당 국가가 포함되어 있는지 확인
      if ((countryName) && (this.predefinedCountries.includes(countryName))){
        // 미리 정의된 국가를 강조하기 위해 색상을 변경
        country.style.fill = 'yellow';
      }
    })
   }

   openDialog(countryName: string){
    const dialogRef = this.dialog.open(EventCardComponent, {
      data: {
        title: "News artiles from " + countryName,
        date: "Dummy date",
        description: "Dummy description"
      }
    });
  }
  }

