import { Component, HostListener, OnInit } from '@angular/core';
import { NyTimesService } from '../ny-times.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit {
  predefinedCountries = ["Finland", "South Korea", "Chile", "Canada", "Japan"];
  ml5Version: string = "";
  articles: any[] = [];

  constructor(private nyTimesService: NyTimesService, public dialog: MatDialog) { }

  ngOnInit(): void {
<<<<<<< .merge_file_4FIY5d
    this.loadArticles();
=======
    // this.loadArticles();
    this.highlightCountries();
>>>>>>> .merge_file_adhPpG
  }

  onRegionClick(event: MouseEvent){
    const target = event.target as HTMLButtonElement;
    var clickedCountryName = target.getAttribute('countryName');
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
        title: countryName,
        date: "Dummy date",
        description: "Dummy description"
      }
    });
  }
  };
