import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardGroupComponent } from '../card-group/card-group.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CardComponent,
    CardGroupComponent,
  ],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragDropComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
