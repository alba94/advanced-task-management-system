import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { priorityTypesModel, statusTypesModel } from '@lib/constants/task.const';
import { PriorityEnum, StatusEnum, TypeEnum } from '@lib/enums/task';
import { Task, TaskComment } from '@lib/interfaces/task';
import { DateValidators } from '@lib/validators/date-validator';
import { Store } from '@ngrx/store';
import { TaskActions } from '@store/task-manager/task.actions';
import { selectNotAdminUsers, selectSystemUsers } from '@store/user/user.selectors';
import { selectAuthUser } from '@store/auth/auth.selectors';
import { UserRS } from '@lib/interfaces/user';

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
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(Store);
  public readonly _dialogRef = inject(MatDialogRef<TaskFormComponent>);
  isEditMode: boolean = false;
  selectedFile: File | null = null;

  users$ = this._store.select(selectNotAdminUsers);
  allUsers$ = this._store.select(selectSystemUsers);
  authUser$ = this._store.select(selectAuthUser);
  loggedUser: UserRS | null = null;
  usersList: UserRS[] = [];
  statusTypes = statusTypesModel;
  priorityTypes = priorityTypesModel;
  showAutocomplete = false;
  comments = this.data?.comments;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === '@') {
      this.showAutocomplete = true;
    }
  }

  form = this._fb.group({
    id: '',
    title: ['', Validators.required],
    description: [''],
    priority: [PriorityEnum.NONE, Validators.required],
    status: [StatusEnum.TODO, Validators.required],
    type: [TypeEnum.NONE, Validators.required],
    dueDate: this._fb.control<string>({ value: '', disabled: false }),
    startDate: this._fb.control<string>({ value: '', disabled: false }),
    assignedTo: this._fb.control<number>({ value: 1, disabled: false }),
    assignedBy: this._fb.control<number>({ value: 1, disabled: true }),
    attachments: '',
    comment: '',
  });

  get controls() {
    return this.form.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  ngOnInit(): void {
    this._initializeFormValues();
    this.authUser$.subscribe((user) => {
      this.loggedUser = user;
    });
    this.allUsers$.subscribe((users) => {
      this.usersList = users ?? [];
    });
  }

  dateNotPreviousThanToday = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };

  dateFilter = (date: Date | null): boolean => {
    const startDateValue = this.controls.startDate.value;
    const startDate = startDateValue ? new Date(startDateValue) : null;
    return (
      (!startDate || !date || date >= startDate) &&
      this.dateNotPreviousThanToday(date)
    );
  };

  startDateSelected(event: MatDatepickerInputEvent<Date>) {
    const selectedStartDate = event.value;
    if (selectedStartDate) {
      this.controls.dueDate.setValidators([
        DateValidators.endDateValidator(selectedStartDate),
      ]);
      this.controls.dueDate.updateValueAndValidity();
      this.controls.dueDate.markAsTouched();
    }
  }

  get taskData() {
    return this.data;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const request = this.form.getRawValue();
      const comments = this.getComments(request);
      if (this.isEditMode) {
        request.id = this.data.id;
        this._store.dispatch(
          TaskActions.updateTask({ task: { ...request, comments } }),
        );
      } else {
        delete (request as any).id;
        this._store.dispatch(
          TaskActions.createTask({ task: { ...request, comments } }),
        );
      }
    }
    this.closeDialog();
  }

  private getComments(request: any) {
    let comments: TaskComment[];
    const currComments = this.data?.comments ?? [];
    if (request.comment) {
      comments = [
        ...currComments,
        {
          comment: request.comment,
          commentedAt: new Date().toISOString(),
          commentedBy: Number(this.loggedUser?.id),
        },
      ];
    } else {
      comments = [...currComments];
    }
    return comments;
  }

  getUsernameForId(id: string) {
    return this.usersList.find((user) => user.id === id)?.username ?? '';
  }

  private _initializeFormValues() {
    if (this.data) {
      this.isEditMode = true;
      this.form.patchValue(this.data);
      this.form.controls.comment.reset();
    } else {
      this.isEditMode = false;
    }
  }

  delete(): void {
    this._store.dispatch(
      TaskActions.deleteTask({ id: this.taskData.id ?? '' }),
    );
    this.closeDialog();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
