import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WeranionEvent } from '../../models/history.models';

@Component({
  selector: 'app-history-event-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './history-event-dialog.html',
  styleUrl: './history-event-dialog.css',
})
export class HistoryEventDialog implements OnInit {
  private dialogRef: MatDialogRef<HistoryEventDialog> = inject(MatDialogRef);
  data?: WeranionEvent = inject(MAT_DIALOG_DATA);
  form!: WeranionEvent;

  /** HistoryEventDialog init */
  ngOnInit(): void {
    if (this.data) {
      this.form.title = this.data.title;
      this.form.details = this.data.details;
    } else {
      this.form = {
        title: '',
        details: ''
      };
    }
  }

  /** Close the dialog without result */
  close(): void {
    this.dialogRef.close(null);
  }

  /** Confirm and close the dialog */
  confirm(): void {
    this.dialogRef.close(this.form);
  }
}
