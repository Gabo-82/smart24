import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {PieceOfNews} from "../piece-of-news";

@Component({
  selector: 'app-country-keyword-news-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './country-keyword-news-list.component.html',
  styleUrl: './country-keyword-news-list.component.css'
})
export class CountryKeywordNewsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'date', 'url'];
  dataSource = new MatTableDataSource<PieceOfNews>(NEWS_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    console.log("DATA SOURCE:")
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator!;
    console.log("PAGINATOR:")
    console.log(this.paginator)
  }
}

const NEWS_DATA: PieceOfNews[] = [
  {id: 1, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 2, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 3, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 4, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 5, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 6, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 7, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 8, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 9, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 10, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
  {id: 11, title: "US: New York Police", country: "india", url: "https://thenewsmill.com", date: new Date("2024-05-01 09:05:32+05:30"), body: "Hello", summary: "Hi"},
]
