import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StockService } from 'src/app/services/Stock/stock.service';

@Component({
  selector: 'app-commisionadd',
  templateUrl: './commisionadd.component.html',
  styleUrls: ['./commisionadd.component.css']
})
export class CommisionaddComponent implements OnInit{
  commission!:number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref:MatDialogRef<CommisionaddComponent>,
    private dailyDataSVC:StockService,
    private _notificationSvc: NotificationService
  ) {}
    ngOnInit(): void {
      this.getCommissionByStockId(this.data.stockId)
    }
  
    closeModal(){
      this.ref.close();
    }

    getCommissionByStockId(stockId : number) {
      if (stockId) {
        this.dailyDataSVC.getCommissionById(stockId)
          .subscribe(data => {
            this.commission=data;
          }, err => {
            this._notificationSvc.message("Failed to load data", "DISMISS");
          });
      } else {
        this._notificationSvc.message("Damage amount not found", "DISMISS");
      }
    }
}
