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
    CountryKeywordNewsListComponent
    //CardOfNewsComponent,
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
    MatTableModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
