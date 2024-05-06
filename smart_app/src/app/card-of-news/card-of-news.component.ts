import { Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent} from '@angular/material/dialog';

import { Router } from '@angular/router';
import { NewsDetailsService } from '../news-details.service';
import { PieceOfNews } from '../piece-of-news';


@Component({
  selector: 'app-card-of-news',
  templateUrl: './card-of-news.component.html',
  styleUrls: ['./card-of-news.component.css'],
})
/*export class CardOfNewsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

}*/

export class CardOfNewsComponent implements OnInit{
  selectedArticle: PieceOfNews | undefined;
 // router: any;
 // constructor(private newsDetailsService: NewsDetailsService) { }

  constructor(
    private newsDetailsService: NewsDetailsService,
    private router: Router // Inject Router
  ) {}
  ngOnInit(): void {
    // this.getArticle();
  }
  getArticle(): void {
    this.newsDetailsService.getArticle(1)
      .subscribe(response => {
        this.selectedArticle = response;
      })
  }

  redirect():void{
    this.router.navigate(["details"]);
  }
}

