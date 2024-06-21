import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { ChipComponent } from '../chip/chip.component';
import { Task } from '@lib/interfaces/task';

@Component({
  selector: 'app-card-group',
  standalone: true,
  imports: [MatCardModule, ChipComponent,CommonModule, TranslateModule, UpperCasePipe],
  templateUrl: './card-group.component.html',
  styleUrl: './card-group.component.css',
})
export class CardGroupComponent {
  @Input() title: string = '';
  @Input() totalItems!: Task[] | null;
}
