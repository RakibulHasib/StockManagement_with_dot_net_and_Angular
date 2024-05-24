import { Component } from '@angular/core';
import { NotificationService } from '../../services/Shared/notification.service';
import { DashboardServiceService } from 'src/app/services/dashboard/dashboard-service.service';
import { Dashboarddata } from 'src/app/models/dashboard/dashboarddata';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductStock } from 'src/app/models/dashboard/product-stock.model';
import { ProductService } from 'src/app/services/Product/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productStocks: ProductStock[] = [];
  dashboardModel: Dashboarddata[] = [];
  currentCompanyId!: number;
  currentCompany: string = "";
  currenProduct: string = "";
  newQuantity = null;
  constructor(
    private notificationSvc: NotificationService,
    private dashboardService: DashboardServiceService,
    private _modal: NgbModal,
    private _productSvc: ProductService
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
    this.currentCompanyId = companyId;
    this.getProductStock(companyId);
    this._modal.open(modalName, {size: 'lg'});
  }

  openCreateModal(modalName: any, item: ProductStock){
    this.currenProduct = item.productName;
    const modalRef = this._modal.open(modalName);

    modalRef.result.then(
      res => {
        const data = {
          productId: item.productId,
          newQuantity: Number(res)
        }
        this._productSvc.updateStockLog(data).subscribe(
          (res) => {
            this.notificationSvc.message("Successfully Updated!!!", "DISMISS");
            this.getProductStock(this.currentCompanyId);
            this.newQuantity = null;
          },
          (err) => {
            this.notificationSvc.message("Failed to Update!!!", "DISMISS");
          }
        )
      }
    )
    modalRef.dismissed.subscribe(
      result => {
        this.newQuantity = null;
      }
    )
  }
}
