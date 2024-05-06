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
            title: "Israel-Palestine Conflict",
            description: "Stay informed about the complex and evolving dynamics of the Israel-Palestine conflict, with in-depth coverage of geopolitical tensions, peace efforts, and humanitarian issues affecting the region. Explore diverse perspectives and ongoing developments shaping this enduring conflict.",
            ButtonColor: "custom-button-israel",
            imageUrl: "../../assets/images/israel-palestine.jpg",
            subtopics: ["Palestine", "Gaza Strip", "West Bank", "Two-state solution", "Jerusalem tensions", "Palestinian refugee crisis"],
            onClick: () => {
              this.openDialog(0);
            }
          },
          {
            title: "Technology",
            description: "Explore the forefront of technology with updates on artificial intelligence, cybersecurity, and the latest achievements in space exploration!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/technology.jpeg",
            subtopics: ["Artificial intelligence", "Cybersecurity", "Tech startups", "Blockchain developments", "Internet of Things"],
            onClick: () => {
              this.openDialog(1);
            }
          },
          {
            title: "Politics",
            description: "Delve into the world of politics with insights into elections, diplomatic relations, and discussions on government policies reshaping societies!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/politics.png",
            subtopics: ["Global diplomacy", "Election updates", "Government policies", "International relations", "Political scandals"],
            onClick: () => {
              this.openDialog(2);
            }
          },
          {
            title: "Business",
            description: "Navigate the world of finance with in-depth analyses of stock market trends, entrepreneurial success stories, and global economic developments!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/business.jpeg",
            subtopics: ["Stock market", "Entrepreneurship", "Corporate sustainability", "Economic forecasts", "Business mergers"],
            onClick: () => {
              this.openDialog(3);
            }
          },
          {
            title: "Arts and Culture",
            description: "Immerse yourself in the realm of arts and culture with highlights on film, literature, and captivating exhibitions from around the world!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/arts-culture.png",
            subtopics: ["Film  industry", "Art exhibitions", "Cultural festivals", "Book releases", "Music industry"],
            onClick: () => {
              this.openDialog(4);
            }
          },
          {
            title: "Science and Discoveries",
            description: "Uncover fascinating scientific breakthroughs, from discoveries in physics and chemistry to exciting archaeological findings and biodiversity updates!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/science.jpg",
            subtopics: ["Space exploration", "Climate change", "Medical science", "Archaeological discoveries", "Renewable energy"],
            onClick: () => {
              this.openDialog(5);
            }
          },
          {
            title: "Sports",
            description: "Get in the game with the latest updates on major sporting events, athlete profiles, and controversies rocking the sports world!",
            ButtonColor: "p-button-rounded p-button-warning",
            imageUrl: "../../assets/images/sports.png",
            subtopics: ["Sporting events", "Athlete interviews", "Sports team trades", "Olympic Games", "Sports industry controversies"],
            onClick: () => {
              this.openDialog(6);
            }
        },
      ];
  }

  openDialog(index: number){
    const dialogRef = this.dialog.open(EventCardComponent, {
      data: {
        title: this.gfg[index].title,
        description: this.gfg[index].description,
        imageUrl: this.gfg[index].imageUrl,
        subtopics: this.gfg[index].subtopics
      }
    });
  }
}
