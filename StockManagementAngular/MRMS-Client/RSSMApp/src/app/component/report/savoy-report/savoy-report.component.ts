import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SavoyReportModel } from '../../../models/Savoy/savoy-report';
import { SavoyService } from '../../../services/Savoy/savoy.service';
import { NotificationService } from '../../../services/Shared/notification.service';

@Component({
  selector: 'app-savoy-report',
  templateUrl: './savoy-report.component.html',
  styleUrls: ['./savoy-report.component.css']
})

export class SavoyReportComponent implements OnInit {
  public get dialog(): MatDialog {
    return this._dialog;
  }
  public set dialog(value: MatDialog) {
    this._dialog = value;
  }
  public get notificationSvc(): NotificationService {
    return this._notificationSvc;
  }
  public set notificationSvc(value: NotificationService) {
    this._notificationSvc = value;
  }
  savoyReportData: SavoyReportModel[] = [];
  dataSource: MatTableDataSource<SavoyReportModel> = new MatTableDataSource(this.savoyReportData);


  columnList: string[] = ["savoyIceCreamId", "productId", "productName", "price", "companyId", "eja", "newProduct", "total", "salesQuantity", "totalAmount", "dumping", "receive", "remaining","createdDate"];
  createdDate: string = '';

  constructor(
    private reportDataSvc: SavoyService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private datePipe: DatePipe
  ) { }


  ngOnInit() {
    this.createdDate = new Date().toISOString();
    // Fetch data initially
    this.fetchReportData();
  }


  fetchReportData() {
    if (this.createdDate) {
      this.reportDataSvc.getSavoyReportData(this.createdDate)
        .subscribe(data => {
          this.savoyReportData = data;
          this.dataSource.data = this.savoyReportData;
          console.log('Received data:', data);
        }, err => {
          this.notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this.notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    }
  }


}
