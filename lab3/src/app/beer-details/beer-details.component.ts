import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss'],
})
export class BeerDetailsComponent {
  @Input() beer: any;
}
