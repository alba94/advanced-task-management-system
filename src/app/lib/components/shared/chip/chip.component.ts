import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
})
export class ChipComponent {
  @Input() color: string = '';

  @HostBinding('class')
  get classes(): string {
    return `h-5 px-2 ${this.appearanceClass} gap-1 text-xs inline-flex justify-content whitespace-nowrap font-bold box-border border items-center select-none rounded-full`;
  }

  get appearanceClass(): string {
    if (this.color === '') {
      return `text-primary bg-primary-lighter border-primary`;
    }
    return 'border-info';
  }
}
