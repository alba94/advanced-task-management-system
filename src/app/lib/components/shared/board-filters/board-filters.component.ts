import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { TypeEnum } from '@lib/enums/task';
import { Store } from '@ngrx/store';
import { TaskActions } from '@store/task-manager/task.actions';
import { FilterState } from '@store/task-manager/task.reducer';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-board-filters',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './board-filters.component.html',
  styleUrl: './board-filters.component.css',
})
export class BoardFiltersComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _fb = inject(FormBuilder);

  statusTypes = [
    { name: TypeEnum.BUG, id: 1 },
    { name: TypeEnum.TASK, id: 2 },
    { name: TypeEnum.STORY, id: 3 },
  ];

  form = this._fb.group({
    search: [''],
    type: [[]],
  });

  get controls() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form.controls.search.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter((term): term is string => term !== null && term !== undefined),
      )
      .subscribe((term) => {
        this.updateFilter({ searchValue: term });
      });
  }

  updateFilter(filters: Partial<FilterState>): void {
    this._store.dispatch(TaskActions.setSearchAndFiltersParams({ filters }));
  }

  onChange(selectedOptions: MatSelectChange): void {
    this.updateFilter({ type: selectedOptions.value });
  }

  resetAll() {
    this._store.dispatch(TaskActions.resetFilters());
  }
}
