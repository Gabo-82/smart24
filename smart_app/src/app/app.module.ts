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
import { AmChartsModule } from "@amcharts/amcharts3-angular";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        TimelineComponent,
        EventCardComponent,
        NewsMapComponent,
        HomeComponent,
        AboutComponent

    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
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
        AmChartsModule
    ]
})
export class AppModule {}
