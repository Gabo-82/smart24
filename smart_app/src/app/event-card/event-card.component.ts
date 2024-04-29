import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  redirect():void{
    this.router.navigate(["events/"+ this.data.title]);
  }
}
