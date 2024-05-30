import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DistributorStatus } from 'src/app/enums/distributor-status.enum';
import { DailyDistributeStatus } from 'src/app/models/dailydistributeStatus/daily-distribute-status.model';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';

@Component({
  selector: 'app-distribution-status',
  templateUrl: './distribution-status.component.html',
  styleUrls: ['./distribution-status.component.css']
})
export class DistributionStatusComponent implements OnInit {

  dailyDistributeStatus: DailyDistributeStatus[] = [];
  distributorStatus = DistributorStatus;
  date: string = '';
  constructor(
    public _activeModal: NgbActiveModal,
    private salesService: SalesDistributionService,
    private _notificationSvc: NotificationService
  ) { }

  ngOnInit() {
    const today = new Date();
    this.date = this.formatDate(today);
    this.getDistributeStatus(this.date);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getDistributeStatus(date: string){
    this.salesService.getDistributeStatus(date).subscribe(
      (res) => {
        this.dailyDistributeStatus = res;
      },
      (err) => {
        this._notificationSvc.message("Failed to load data", "DISMISS");
      }
    )
  }

}
