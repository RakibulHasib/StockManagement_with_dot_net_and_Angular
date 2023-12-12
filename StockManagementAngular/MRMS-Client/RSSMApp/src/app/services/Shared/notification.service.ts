import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
  ) { }
  message(message: string, actions: string) {
    let config: MatSnackBarConfig = {
      duration: 4000,
      panelClass: [],
      //duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }
    this.snackBar.open(message, actions, config);
  }
}
