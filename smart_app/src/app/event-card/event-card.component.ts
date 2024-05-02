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
    this.router.navigate(["details"]);
  }

  onClickSubtopic(subtopic: string): void {
    // Implement logic based on the clicked subtopic (e.g., navigate, show content, etc.)
    console.log(`Clicked on subtopic: ${subtopic}`);
    // Add more logic as needed based on the clicked subtopic
  }
}
