import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
})
export class BigCardComponent {
  @Input() title = '';
  @Input() content = '';
  @Input() number = '';
  @Input() isArrowUp = false;
}
