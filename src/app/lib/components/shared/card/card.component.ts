import { UpperCasePipe } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, TranslateModule, UpperCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() color: string = '';

  @HostBinding('class')
  get classes(): string {
    return `border border-primary-lighter bg-gray-lighter rounded block`;
  }

  get borderClass(): string {
    if (this.color === '') {
      return 'border-primary';
    }
    return 'border-primary';
  }
}
