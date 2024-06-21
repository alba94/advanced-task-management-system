import { AbstractControl } from '@angular/forms';

export class DateValidators {
  static endDateValidator(selectedStartDate: Date) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const endDate = new Date(control.value);

      return endDate && endDate < selectedStartDate
        ? { invalidEndDate: true }
        : null;
    };
  }
}
