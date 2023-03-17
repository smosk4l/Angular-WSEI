import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BeerAPIService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://api.punkapi.com/v2/beers?page=1&per_page=20');
  }
}
