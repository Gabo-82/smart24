
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PieceOfNews } from '../piece-of-news';
import { NewsDetailsService } from '../news-details.service';
import { NEWS_DATA } from '../country-keyword-news-list/country-keyword-news-list.component';

@Component({
  selector: 'app-fact-check',
  templateUrl: './fact-check.component.html',
  styleUrls: ['./fact-check.component.css']
})
export class FactCheckComponent implements OnInit {
  displayedColumns: string[] = ['title', 'factCheckScore', 'date', 'source'];
  dataSource = new MatTableDataSource<PieceOfNews>();

  constructor(private newsDetailsService: NewsDetailsService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    // Assuming you fetch fact-checked articles from your service or use the predefined data
    const factCheckedArticles: PieceOfNews[] = [ 
      // Sample PieceOfNews data (replace with actual data retrieval logic)
    ];

    // Assign the data source
    this.dataSource.data = (NEWS_DATA);
  }
}



