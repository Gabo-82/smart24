import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchQuery: string = '';
  selectedCountry: string = '';
  newsArticles: any[] = []; // Array to store retrieved news articles
  countries: { code: string, name: string }[] = [
    { code: 'af', name: 'Afghanistan' },
    { code: 'bd', name: 'Bangladesh' },
    { code: 'cn', name: 'China' },
    { code: 'dk', name: 'Denmark' },
    { code: 'eg', name: 'Egypt' },
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'ht', name: 'Haiti' },
    { code: 'il', name: 'Israel' },
    { code: 'jo', name: 'Jordan' },
    { code: 'ke', name: 'Kenya' },
    { code: 'lb', name: 'Lebanon' },
    { code: 'ma', name: 'Morocco' },
    { code: 'kp', name: 'North Korea' },
    { code: 'ps', name: 'Palestine' },
    { code: 'qa', name: 'Qatar' },
    { code: 'ru', name: 'Russia' },
    { code: 'sy', name: 'Syria' },
    { code: 'tr', name: 'Turkey' },
    { code: 'us', name: 'United States of America' },
    { code: 'vi', name: 'Vietnam' },
    { code: 'ye', name: 'Yemen' },
    { code: 'zw', name: 'Zimbabwe' },
    
    // Add more countries as needed
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  performSearch(): void {
    // Implement your search logic using this.searchQuery and this.selectedCountry
    const query = this.searchQuery.trim();
    const country = this.selectedCountry;

    if (query !== '' && country !== '') {
      const apiUrl = `https://newsdataapi.com/api/news`;
      const apiKey = 'pub_43094074ea1e87e4c5a3d69ee4e5ef22dfb89'; // Replace 'YOUR_API_KEY' with your actual API key

      const params = {
        q: query,
        max_result: 3, // Adjust as needed
        country: country,
        language: 'en',
        apikey: apiKey
      };

      this.http.get<any>(apiUrl, { params }).subscribe(
        (response) => {
          console.log('News API Response:', response);
          this.newsArticles = response.results; // Assuming API response contains 'articles' array
        },
        (error) => {
          console.error('Error fetching news articles:', error);
        }
      );
    }
  }

  onCountryChange(): void {
    // Handle logic when the selected country changes
    console.log('Selected country:', this.selectedCountry);
    // You can trigger additional actions here based on the selected country
  }
}
