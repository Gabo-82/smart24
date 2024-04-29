import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit{
  constructor(public dialog: MatDialog){}
  gfg: any[] = [];
     
  ngOnInit() {
      this.gfg = [
          {
            title: "1. Event",
            date: "26 May 2014 - Present",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#9C27B0",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(0);
            }
          },
          {
            title: "2.",
            date: "22 May 2004 to 26 May 2014",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#673AB7",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(1);
            }
          },
          {
            title: "3.",
            date: "19 March 1998 to 22 May 2004",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#FF9800",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(2);
            }
          },
          {
            title: "4.",
            date: "21 April 1997 to 19 March 1998",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#607D8B",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(3);
            }
          },
          {
            title: "5.",
            date: "1 June 1996 to 21 April 1997",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#99e2ff",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(4);
            }
          },
          {
            title: "6.",
            date: "16 May 1996 to 1 June 1996",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#99e200",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(5);
            }
          },
          {
            title: "7.",
            date: "26 May 2014 - Present",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#9C27B0",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(6);
            }
        },
        {
            title: "8.",
            date: "22 May 2004 to 26 May 2014",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#673AB7",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(7);
            }
        },
        {
            title: "9.",
            date: "19 March 1998 to 22 May 2004",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#FF9800",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(8);
            }
        },
        {
            title: "10.",
            date: "21 April 1997 to 19 March 1998",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#607D8B",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(9);
            }
        },
        {
            title: "11.",
            date: "1 June 1996 to 21 April 1997",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#99e2ff",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(10);
            }
        },
        {
            title: "12.",
            date: "16 May 1996 to 1 June 1996",
            description: "A brief description",
            Icon: PrimeIcons.SORT_UP,
            color: "#99e200",
            ButtonColor: "p-button-rounded p-button-warning",
            onClick: () => {
              this.openDialog(11);
            }
        }
      ];
  }

  openDialog(index: number){
    const dialogRef = this.dialog.open(EventCardComponent, {
      data: {
        title: this.gfg[index].title,
        date: this.gfg[index].date,
        description: this.gfg[index].description
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
