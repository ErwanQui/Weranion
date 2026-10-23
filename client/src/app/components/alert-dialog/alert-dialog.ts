import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialog {
  private dialogRef: MatDialogRef<AlertDialog> = inject(MatDialogRef);
  
  data: {
    title: string;
    message: string;
  } = inject(MAT_DIALOG_DATA);

  /** Close the alert dialog with a false result */
  close(): void {
    this.dialogRef.close(false);
  }

  /** Close the alert dialog with a true result */
  confirm(): void {
    this.dialogRef.close(true);
  }
}
