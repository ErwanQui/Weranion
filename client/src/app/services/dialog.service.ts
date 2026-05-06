import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialog } from '../components/alert-dialog/alert-dialog';
import { DialogParameters } from '../models/utils.models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog: MatDialog = inject(MatDialog);

  /** Display a generic dialog using the same model as SnackBarService
   * 
   * @param dialogParameters The parameters of the dialog
   * @returns A reference to the opened dialog
   */
  openDialog<T, S>(dialogParameters: DialogParameters<T, S>): MatDialogRef<T, S> {
    return this.dialog.open(dialogParameters.component, {
      width: dialogParameters.width || '80%',
      data: dialogParameters.data || null
    });
  }

  /** Display a confirm alert dialog
   * 
   * @param title The title of the confirm alert
   * @param message The message of the confirm alert
   * @returns An observable that emits true if the user confirmed, false otherwise
   */
  openConfirmAlert(title: string, message: string): Observable<boolean> {
    return this.dialog.open(AlertDialog, {
      data: { title, message }
    }).afterClosed();
  }
}