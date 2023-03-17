import { Component, OnInit } from '@angular/core';
import { BeerAPIService } from './beer-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  protected beerList: any;
  protected selectedBeer: any;

  constructor(private beerApi: BeerAPIService) {}

  ngOnInit(): void {
    this.beerApi.getData().subscribe((res) => {
      this.beerList = res;
    });
  }
  onBeerSelect(beer: any) {
    this.selectedBeer = beer;
  }
}
