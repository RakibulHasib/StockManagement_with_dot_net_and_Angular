import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import {Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Dailydatadbmodel } from '../../../models/DailyDataModel/dailydatadbmodel';
import { StockService } from '../../../services/Stock/stock.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DamageaddComponent } from '../../modal/damageadd/damageadd.component';
import { CommisionaddComponent } from '../../modal/commisionadd/commisionadd.component';
import { CompanyService } from 'src/app/service/Company/company.service';
import { Company } from 'src/app/models/company/company';
import { StateService } from 'src/app/services/Shared/state.service';
import { Stock } from 'src/app/models/Stock/Stock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DistributionStatusComponent } from '../../shared/distribution-status/distribution-status.component';
import { DateFormat } from 'src/app/Shared/date-fromat.model';




@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css'],
  animations: [
    trigger('expandCollapse', [ // This defines an animation trigger named 'expandCollapse'
      state('collapsed', style({ height: '0px', display: 'none' })), // This is the 'collapsed' state configuration
      state('expanded', style({ height: '*', display: 'block' })), // This is the 'expanded' state configuration
      transition('collapsed <=> expanded', animate('0.3s ease-in-out')) // This is the transition between the states
    ])
  ]
})
export class StockViewComponent implements OnInit, OnDestroy {
  showExpandButton = false;
  companyId!: number;
  paramsSubscription! : Subscription;
  companies: Company[] = [];

  dailyData: Dailydatadbmodel[] = [];
  dataSource: MatTableDataSource<Dailydatadbmodel> = new MatTableDataSource(this.dailyData);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["companyName", "createdDate", "totalSalesQuantity", "totalAmount","actions"];
  startDate: string = '';
  endDate: string = '';
  selectedCompany: number= 0;
  selectedCompanyName? = '';
  stock: Stock[]=[];

  constructor(
    private dailyDataSvc: StockService,
    private companySvc: CompanyService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService,
    private router: Router,
    private _modal: NgbModal
  ) { }


  ngOnInit() {
    const formateDate = new DateFormat();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);
    this.selectedCompany = this.stateService.getPreviousState(1)?.selectedCompany || 0;
    this.startDate = this.stateService.getPreviousState(1)?.startDate || formateDate.formatDate(thirtyDaysAgo);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root;
        if (!currentRoute.snapshot.children.some(child => child.routeConfig?.path === 'stock-create/:id' || child.routeConfig?.path === 'stock-view' || child.routeConfig?.path === 'stock-report/:id' || child.routeConfig?.path === 'stock-edit/:id')) {
          this.resetState();
        }
      }
    });

    const today = new Date();
    this.endDate = formateDate.formatDate(today);
    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      this.fetchCompanyData();
      this.fetchData();
    });
  }

  stateUpdate():void{
    this.stateService.updateState({ selectedCompany: this.selectedCompany,startDate:this.startDate});
  }

  resetState(): void {
    this.stateService.resetState();
  }

  fetchCompanyData(){
      this.companySvc.getCompany()
      .subscribe(data => {
        this.companies=data;
        const allCompany = new Company(0, "সব কোম্পানি");
        this.companies.unshift(allCompany);
      }, err => {
        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
  }

  navigateToCreate(){
    this.stateUpdate();
    this.router.navigate(['/stock-create', this.selectedCompany]);
  }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

  onDropdownSelectionChange(selectedCompany: number) {
    this.selectedCompany=selectedCompany;
    this.selectedCompanyName = this.companies.find(x => x.companyId == selectedCompany)?.companyName;
    this.fetchData();
  }

  fetchData() {
    if (this.startDate && this.endDate) {
      this.dailyDataSvc.getDashboardDataPerDay(this.selectedCompany, this.startDate, this.endDate)
        .subscribe(data => {
          this.dailyData = data;
          this.dataSource.data = this.dailyData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.dailyData = [];
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

  
  openDamageDialog(stockId: any){
    const dialogRef = this._dialog.open(DamageaddComponent,{
      enterAnimationDuration: '400ms',
      data:{
        stockId:stockId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.UpdateDamage(stockId, Number(result));
    });
  }

  UpdateDamage(stockId : number,amount : number) {
    if (stockId && amount) {
      this.dailyDataSvc.updateDamage(stockId, amount)
        .subscribe(data => {
          this._notificationSvc.message("Successfully Updated", "DISMISS");
        }, err => {
          this._notificationSvc.message("Failed to update data", "DISMISS");
        });
    }
  }

  openCommissionDialog(stockId: any){
    const dialogRef = this._dialog.open(CommisionaddComponent,{
      enterAnimationDuration: '400ms',
      data:{
        stockId:stockId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.UpdateCommission(stockId, Number(result));
    });
  }

  UpdateCommission(stockId : number,commission : number) {
    if (stockId && commission) {
      this.dailyDataSvc.updateCommission(stockId, commission)
        .subscribe(data => {
          this._notificationSvc.message("Successfully Updated", "DISMISS");
        }, err => {
          this._notificationSvc.message("Failed to update data", "DISMISS");
        });
    }
  }

  openDistributeStatus(){
    this._modal.open(DistributionStatusComponent);
  }

}

