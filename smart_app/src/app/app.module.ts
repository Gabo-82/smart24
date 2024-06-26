import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventCardComponent } from './event-card/event-card.component';
import { NewsMapComponent } from './news-map/news-map.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { NewsDetailsComponent } from "./news-details/news-details/news-details.component";
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CardOfNewsComponent } from './card-of-news/card-of-news.component';
import { CountryKeywordNewsListComponent } from "./country-keyword-news-list/country-keyword-news-list.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SentimentBubbleComponent } from './sentiment-bubble/sentiment-bubble.component';
import { FactCheckComponent } from './fact-check/fact-check.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { KeywordHistogramComponent } from './keyword-histogram/keyword-histogram.component';
import { TagCloudComponent } from 'angular-tag-cloud-module'
import {MatDivider} from "@angular/material/divider";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TimelineComponent,
    EventCardComponent,
    NewsMapComponent,
    HomeComponent,
    AboutComponent,
    SearchbarComponent,
    CountryKeywordNewsListComponent,
    CardOfNewsComponent,
    SentimentBubbleComponent,
    FactCheckComponent,
    NewsMapComponent,
    KeywordHistogramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    NewsDetailsComponent,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    TagCloudComponent,
    MatDivider,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
