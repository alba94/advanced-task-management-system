import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskCommentsComponent } from '@lib/components/shared/task-comments/task-comments.component';
import { PriorityEnum, StatusEnum, TypeEnum } from '@lib/enums/task';
import { Task, TaskComment } from '@lib/interfaces/task';
import { Store } from '@ngrx/store';
import { TaskActions } from '@store/task-manager/task.actions';
import { selectNotAdminUsers, selectSystemUsers } from '@store/user/user.selectors';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    TaskCommentsComponent,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  public readonly _dialog = inject(MatDialog);
  public readonly _dialogRef = inject(MatDialogRef<TaskFormComponent>);
  isEditMode: boolean = false;

  users$ = this._store.select(selectNotAdminUsers);
  statusTypes = [
    { name: TypeEnum.BUG, id: 1 },
    { name: TypeEnum.TASK, id: 2 },
    { name: TypeEnum.STORY, id: 3 },
  ];
  priorityTypes = [
    { name: PriorityEnum.HIGH, id: 1 },
    { name: PriorityEnum.LOW, id: 2 },
    { name: PriorityEnum.MEDIUM, id: 3 },
  ];

  comments: TaskComment[] = this.data?.comments as TaskComment[];

  form = this._fb.group({
    id: 0,
    title: ['', Validators.required],
    description: [''],
    priority: [PriorityEnum.MEDIUM],
    status: [StatusEnum.TODO],
    type: [TypeEnum.STORY],
    dueDate: [''],
    assignedTo: this._fb.control<number>({ value: 1, disabled: false }),
    // assignedBy: this._fb.control<number>({ value: 1, disabled: false }),
    attachments: this._fb.array([]),
    comments: this._fb.array([this.comments]),
  });

  private createCommentFormGroup(comment: TaskComment): FormGroup {
    return this._fb.group({
      id: [comment.id],
      text: [comment.comment, Validators.required],
    });
  }

  get formValues() {
    return this.form.getRawValue();
  }

  get controls() {
    return this.form.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {}

  ngOnInit(): void {
    this._initializeFormValues();
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  get taskData() {
    return this.data;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const request = this.form.getRawValue();
      if (this.isEditMode) {
        request.id = this.data.id;
        this._store.dispatch(TaskActions.updateTask({ task: request }));
      } else {
        delete (request as any).id;
        this._store.dispatch(TaskActions.createTask({ task: request }));
      }
    }
    this.closeDialog();
  }

  private _initializeFormValues() {
    if (this.data) {
      console.log(this.data);
      this.isEditMode = true;
      this.form.patchValue(this.data);
    } else {
      this.isEditMode = false;
    }
  }

  onCommentEmit(updatedComments: TaskComment) {
    const commentsFormArray = this.form.get('comments') as FormArray;
    commentsFormArray.clear();

    commentsFormArray.push(this._fb.control(updatedComments));
  }

  delete(): void {
    this._store.dispatch(TaskActions.deleteTask({ id: this.taskData.id ?? 0 }));
    this.closeDialog();
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
