import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { ConcernPerson, ConcernPersonMapping } from 'src/app/models/concernPerson/concern-person';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StateService } from 'src/app/services/Shared/state.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistributionStatusComponent } from '../../shared/distribution-status/distribution-status.component';

@Component({
  selector: 'app-distribution-view',
  templateUrl: './distribution-view.component.html',
  styleUrls: ['./distribution-view.component.css'],
  encapsulation: ViewEncapsulation.None,
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
  concernPersonMapping: ConcernPersonMapping[] = [];
  selectedConcernPerson: number = 0;
  selectedCompany: number = 0;
  distibutionId : number = 0;

   onConcernPersonDropdownSelectionChange(selectedConcernPerson: number) {
    this.selectedConcernPerson=selectedConcernPerson;
    this.fetchDistributorData();
  }

   onCompanyDropdownSelectionChange(selectedConcernPerson: number) {
    this.selectedConcernPerson=selectedConcernPerson;
    this.fetchDistributorData();
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
    private stateService: StateService,
    private _modal: NgbModal
  ) { }

  ngOnInit() {
    this.selectedConcernPerson = this.stateService.getPreviousState(1)?.selectedConcernPerson || 0;
    this.distibutionId = this.stateService.getPreviousState(1)?.distibutionId || 1;

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

      this.fetchDistributorData();
      this.fetchConcernPersonData();
  }

  fetchConcernPersonData(){
    if(true){
      this.concernPersonSvc.getConcernPerson()
      .subscribe(data=>{
        this.concernPerson=data;
        const allConcernPerson = new ConcernPerson(0, "সব ডিস্ট্রিভিউটর");
        this.concernPerson.unshift(allConcernPerson);
      }, err => {
        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
    }
  }

  openDistributeStatus(){
    this._modal.open(DistributionStatusComponent);
  }

  navigateToAdddistribution() {
    this.stateUpdate();

    let params = {}
    if (this.selectedConcernPerson > 0)
      params = { ...params, concernPerson : this.selectedConcernPerson};

    if (this.selectedCompany)
      params = { ...params, company: this.selectedCompany };

    this.route.navigate(
      ['/sales-create'], { queryParams: params } );
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

  fetchDistributorData() {
    if (this.startDate && this.endDate) {
      this.salesService.getSalesDistributeDataPerDay(this.selectedConcernPerson,this.startDate, this.endDate)
        .subscribe(data => {
          this.dailyDistributeData = data;
          this.dataSource.data = this.dailyDistributeData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
          //fetch company data
          this.fetchCompanyData(this.selectedConcernPerson);
        }, err => {
          this.dailyDistributeData = [];
          this._notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this._notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    }
  }

    fetchCompanyData(distributorId: number) {
        this.concernPersonSvc.getConcernCompanyMapping(distributorId).subscribe(
      (res) => {
        this.concernPersonMapping = res;
      },
      (err) => {
        this._notificationSvc.message("Failed to load Company Data", "DISMISS");
      })
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
