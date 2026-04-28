import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WeranionHistory, WeranionHistoryData } from '../../models/history.models';

@Component({
  selector: 'app-history-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './history-dialog.html',
  styleUrl: './history-dialog.css',
})
export class HistoryDialog implements OnInit {
  private dialogRef: MatDialogRef<HistoryDialog> = inject(MatDialogRef);
  data: WeranionHistory = inject(MAT_DIALOG_DATA);
  form!: WeranionHistoryData;

  /** HistoryDialog init */
  ngOnInit(): void {
    this.form = {
      title: this.data.title,
      details: this.data.details
    };
  }

  /** Close the dialog without result */
  close(): void {
    this.dialogRef.close(null);
  }

  /** Confirm and close the dialog */
  confirm(): void {
    this.dialogRef.close(this.form);
  }}
