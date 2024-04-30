import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsMapComponent } from './news-map/news-map.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'about', component: HomeComponent }, // Define AppComponent as the component for the root path
  { path: 'events/:title', component: NewsMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
