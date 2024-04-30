import { Component, OnInit } from '@angular/core';
import { NyTimesService } from '../ny-times.service';

declare var ml5: any;

@Component({
  selector: 'app-news-map',
  templateUrl: './news-map.component.html',
  styleUrl: './news-map.component.css'
})
export class NewsMapComponent implements OnInit {

  ml5Version: string = "";
  articles: any[] = [];

  constructor(private nyTimesService: NyTimesService) { }

  ngOnInit(): void {
    // this.loadArticles();
    console.log('ml5 version: ', ml5.version);
  }

  loadArticles(): void {
    this.nyTimesService.getArticles().subscribe(response => {
      console.log(response.response.docs[0]);
    });
  }
}
