import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent {
  private readonly _snackBar = inject(MatSnackBar);


  openSnackBar() {
    // this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
  }
}
