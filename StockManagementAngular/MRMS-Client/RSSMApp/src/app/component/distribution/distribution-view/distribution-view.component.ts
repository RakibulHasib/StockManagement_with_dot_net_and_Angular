import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';

@Component({
  selector: 'app-distribution-view',
  templateUrl: './distribution-view.component.html',
  styleUrls: ['./distribution-view.component.css'],
  animations: [
    trigger('expandCollapse', [ // This defines an animation trigger named 'expandCollapse'
      state('collapsed', style({ height: '0px', display: 'none' })), // This is the 'collapsed' state configuration
      state('expanded', style({ height: '*', display: 'block' })), // This is the 'expanded' state configuration
      transition('collapsed <=> expanded', animate('0.3s ease-in-out')) // This is the transition between the states
    ])
  ]
})
export class DistributionViewComponent {
  showExpandButton = false;
  companyId!: number;

  dailyDistributeData: DailyDistributionModel[] = [];
  dataSource: MatTableDataSource<DailyDistributionModel> = new MatTableDataSource(this.dailyDistributeData);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["concernPerson","totalReceive", "totalReturn","totalSales","totalPrice","grandTotal","creationTime","actions"];
  startDate: string = '';
  endDate: string = '';

  constructor(
    private salesService: SalesDistributionService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const today = new Date();
    this.endDate = this.formatDate(today);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    this.startDate = this.formatDate(fifteenDaysAgo);

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
      this.salesService.getSalesDistributeDataPerDay(this.startDate, this.endDate)
        .subscribe(data => {
          this.dailyDistributeData = data;
          this.dataSource.data = this.dailyDistributeData;
          console.log(this.dataSource);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.dailyDistributeData = [];
          this._notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this._notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}