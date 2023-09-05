import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Dailydatadbmodel } from '../../../models/DailyDataModel/dailydatadbmodel';
import { SavoyService } from '../../../services/Savoy/savoy.service';

@Component({
  selector: 'app-savoy-view',
  templateUrl: './savoy-view.component.html',
  styleUrls: ['./savoy-view.component.css']
})
export class SavoyViewComponent implements OnInit {
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

  columnList: string[] = ["createdDate", "totalSalesQuantity", "totalAmount"];
  startDate: string = '';
  endDate: string = '';

  constructor(
    private dailyDataSvc: SavoyService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.startDate = '';
    this.endDate = '';
  }

  fetchData() {
    if (this.startDate && this.endDate) {
      this.dailyDataSvc.getDashboardDataPerDay(this.startDate, this.endDate)
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

  //getCountryName(id: number) {
  //  let c = this.country.find(c => c.countryId == id);
  //  return c ? c.name : '';
  //}

  //applyFilter(event: Event) {
  //  const filterValue = (event.target as HTMLInputElement).value;
  //  this.dataSource.filter = filterValue.trim().toLowerCase();
  //}
}
