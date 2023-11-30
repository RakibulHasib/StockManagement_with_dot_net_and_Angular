import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogActions } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StockService } from 'src/app/services/Stock/stock.service';

@Component({
  selector: 'app-damageadd',
  templateUrl: './damageadd.component.html',
  styleUrls: ['./damageadd.component.css']
})
export class DamageaddComponent implements OnInit{
  amount!:number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref:MatDialogRef<DamageaddComponent>,
    private dailyDataSVC:StockService,
    private _notificationSvc: NotificationService
  ) {}

  ngOnInit(): void {
    this.getDamageByStockId(this.data.stockId);
  }
  
 closeModal(){
  this.ref.close();
 }

 getDamageByStockId(stockId : number) {
  if (stockId) {
    this.dailyDataSVC.getDamageById(stockId)
      .subscribe(data => {
        this.amount=data;
      }, err => {
        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
  } else {
    this._notificationSvc.message("Damage amount not found", "DISMISS");
  }
}

}
