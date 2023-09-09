import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Dailydatadbmodel } from '../../../models/DailyDataModel/dailydatadbmodel';
import { DatePipe } from '@angular/common';
import { IglooService } from '../../../services/Igloo/igloo.service';


@Component({
  selector: 'app-igloo-view',
  templateUrl: './igloo-view.component.html',
  styleUrls: ['./igloo-view.component.css']
})

export class IglooViewComponent implements OnInit {
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
  dailyData: Dailydatadbmodel[] = [];
  dataSource: MatTableDataSource<Dailydatadbmodel> = new MatTableDataSource(this.dailyData);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["createdDate", "totalSalesQuantity", "totalAmount", "actions"];
  startDate: string = '';
  endDate: string = '';

  constructor(
    private dailyDataSvc: IglooService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private datePipe: DatePipe
  ) { }


  ngOnInit() {
    // Set startDate to 15 days ago
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    this.startDate = this.formatDate(fifteenDaysAgo);

    // Set endDate to today
    const today = new Date();
    this.endDate = this.formatDate(today);

    // Fetch data initially
    this.fetchData();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchData() {
    if (this.startDate && this.endDate) {
      this.dailyDataSvc.getIglooDashboardDataPerDay(this.startDate, this.endDate)
        .subscribe(data => {
          this.dailyData = data;
          this.dataSource.data = this.dailyData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this.notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //confirmDelete(data: Company) {
  // //console.log(data);
  // this.dialog.open(ConfirmDialogComponent, {
  //   width: '450px',
  //   enterAnimationDuration: '800ms'
  // }).afterClosed()
  //   .subscribe(result => {
  //     //console.log(result);
  //     if (result) {
  //       this.companySvc.delete(data)
  //         .subscribe({
  //           next: r => {
  //             this.notificationSvc.message('Demand removed', 'DISMISS');
  //             this.dataSource.data = this.dataSource.data.filter(c => c.companyId != data.companyId);
  //           },
  //           error: err => {
  //             this.notificationSvc.message('Failed to delete data', 'DISMISS');
  //             throwError(() => err);
  //           }
  //         })
  //     }
  //   })
  //}
}

