import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }
  message(message: string, actions: string, duration: number | null = null) {
    let config: MatSnackBarConfig = {
      duration: duration ?? 5000,
      panelClass: [],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    }
    this.snackBar.open(message, actions, config);
  }
}
