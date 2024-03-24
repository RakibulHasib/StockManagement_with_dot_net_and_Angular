import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { ConcernPerson } from 'src/app/models/concernPerson/concern-person';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StateService } from 'src/app/services/Shared/state.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';

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
  concernPerson: ConcernPerson[]=[];
  selectedConcernPerson: number=1;
  distibutionId : number = 0;

   onDropdownSelectionChange(selectedConcernPerson: number) {
    this.selectedConcernPerson=selectedConcernPerson;
    this.fetchData();
  }
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
    private concernPersonSvc: ConcernPersonService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.selectedConcernPerson = this.stateService.getPreviousState(1)?.selectedConcernPerson || 1;
    this.distibutionId=this.stateService.getPreviousState(1)?.distibutionId || 1;

    const today = new Date();
    this.endDate = this.formatDate(today);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    this.startDate = this.formatDate(fifteenDaysAgo);
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root;
        if (!currentRoute.snapshot.children.some(child => child.routeConfig?.path === 'sales-view'|| child.routeConfig?.path==='sales-report/:id' || child.routeConfig?.path === 'sales-create/:id')) {
          this.resetState();
        }
      }
    });

      this.fetchData();
      this.fetchConcernPersonData();
  }

  fetchConcernPersonData(){
    if(true){
      this.concernPersonSvc.getConcernPerson()
      .subscribe(data=>{
        this.concernPerson=data;
      }, err => {

        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
    }
  }

  navigateToAdddistribution() {
    this.stateUpdate();
    this.route.navigate(['/sales-create', this.selectedConcernPerson]);
  }
  navigateToViewistribution(distibutionId: number) {
    this.stateUpdate();
    this.route.navigate(['/sales-report', distibutionId ]);
  }
  stateUpdate():void{
    this.stateService.updateState({ selectedConcernPerson: this.selectedConcernPerson});
  }

   resetState(): void {
    this.stateService.resetState();
  }

 
  
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  fetchData() {
    if (this.startDate && this.endDate) {
      this.salesService.getSalesDistributeDataPerDay(this.selectedConcernPerson,this.startDate, this.endDate)
        .subscribe(data => {
          this.dailyDistributeData = data;
          this.dataSource.data = this.dailyDistributeData;
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

  confirmDelete(salesDistributeId: any) {
    this._dialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '400ms'
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.salesService.deleteDistribution(salesDistributeId)
            .subscribe({
              next: r => {
                this._notificationSvc.message('Distribution Deleted Successfully', 'DISMISS');
                 this.dataSource.data = this.dataSource.data.filter(c => c.salesDistributeId != salesDistributeId);
              },
              error: err => {
                this._notificationSvc.message('Failed to delete data', 'DISMISS');
                throwError(() => err);
              }
            })
        }
      })
  }
}
