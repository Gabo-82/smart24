import { Component, OnInit } from '@angular/core';
import { NyTimesService } from '../ny-times.service';

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
  }

  loadArticles(): void {
    this.nyTimesService.getArticles().subscribe(response => {
      console.log(response.response.docs[0]);
    });
  }
}
