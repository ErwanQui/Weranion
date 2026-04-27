import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogParameters } from '../models/utils.models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog: MatDialog = inject(MatDialog);

  /** Display a generic dialog using the same model as SnackBarService
   * 
   * @param dialogParameters The parameters of the dialog
   */
  openDialog<T, S>(dialogParameters: DialogParameters<T, S>): MatDialogRef<T, S> {
    return this.dialog.open(dialogParameters.component, {
      width: dialogParameters.width || '80%',
      data: dialogParameters.data || null
    });
  }

  // /** Display a fail dialog with error styling
  //  * 
  //  * @param dialogParameters The parameters of the dialog
  //  */
  // failDialog(dialogParameters: DialogParameters): void {
  //   this.openDialog(dialogParameters);
  // }
}