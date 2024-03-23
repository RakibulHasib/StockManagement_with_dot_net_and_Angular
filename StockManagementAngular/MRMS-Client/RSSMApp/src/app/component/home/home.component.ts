import { Component } from '@angular/core';
import { NotificationService } from '../../services/Shared/notification.service';
import { DashboardServiceService } from 'src/app/services/dashboard/dashboard-service.service';
import { Dashboarddata } from 'src/app/models/dashboard/dashboarddata';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductStock } from 'src/app/models/dashboard/product-stock.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productStocks: ProductStock[] = [];
  dashboardModel: Dashboarddata[] = [];
  currentCompany: string = "";
  constructor(
    private notificationSvc: NotificationService,
    private dashboardService: DashboardServiceService,
    private _modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardData()
     .subscribe(x => {
       this.dashboardModel = x;
       console.log(x);
     }, err => {
       this.notificationSvc.message("Failed to load data!!!", "DISMISS");
     });
  }

  getProductStock(companyId: number){
    this.dashboardService.getProductStock(companyId).subscribe(
      (res) => {
        this.productStocks = res;
      },
      (err) => {
        this.notificationSvc.message("Failed to load data!!!", "DISMISS");
        console.log(err);
      }
    )
  }
  openModal(modalName: any, companyId: number, companyName: any){
    this.currentCompany = companyName;
    this.getProductStock(companyId);
    this._modal.open(modalName, {size: 'lg'});
  }
}
