import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';


@Component({
  selector: 'app-card-of-news',
  templateUrl: './card-of-news.component.html',
  styleUrls: ['./card-of-news.component.css'],
})
export class CardOfNewsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  redirect():void{
    this.router.navigate(["details"]);
  }

}
