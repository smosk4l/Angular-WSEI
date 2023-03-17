import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent {
  @Input() beerList: any;
  @Output() selectedBeer = new EventEmitter();

  protected onBeerSelect(beer: any) {
    this.selectedBeer.emit(beer);
  }
}
