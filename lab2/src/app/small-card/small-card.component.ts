import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
})
export class SmallCardComponent {
  @Input() title = '';
  @Input() price = '';
  @Input() color = 'green';
}
