import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  // constructor(private dialogRef: MatDialogRef<YourDialogComponent>, private router: Router) {}
  constructor(
    private dialogRef: MatDialogRef<EventCardComponent>, // Corrected component name here
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to access data passed to the dialog
  ) {}

  redirect():void{
    this.router.navigate(["details"]);
  }

  onClickSubtopic_first_version(subtopic: string): void {
    // Implement logic based on the clicked subtopic (e.g., navigate, show content, etc.)
    console.log(`Clicked on subtopic: ${subtopic}`);
    // Add more logic as needed based on the clicked subtopic
  }

  onClickSubtopic(subtopic: string): void {
    if (subtopic.trim() !== '') {
      this.router.navigate(['/worldmap', subtopic.trim()]).then(() => {
        this.dialogRef.close();
      });
    }
  }
}  
