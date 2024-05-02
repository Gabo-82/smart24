import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsMapComponent } from './news-map/news-map.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NewsDetailsComponent } from './news-details/news-details/news-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Define AppComponent as the component for the root path
  { path: 'worldmap/:keyword', component: NewsMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: AboutComponent }, // for now it just takes you to the About-page
  { path: 'details', component: NewsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
