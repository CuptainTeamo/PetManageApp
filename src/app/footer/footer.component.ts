import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() name: string = 'Sheridan College';
  today: Date;
  constructor() {
    this.today = new Date();
  }
}
