import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarParameters } from '../models/utils.models';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  /** Display a fail snack bar
   *
   * @param SnackBarParameters The parameters of the snack bar
   */
  failSnackBar(SnackBarParameters: SnackBarParameters): void {
    this.snackBar.open(SnackBarParameters.message, SnackBarParameters.action, {
      duration: SnackBarParameters.duration || 2000,
      panelClass: ['snackbarFail']
    });
  }
}