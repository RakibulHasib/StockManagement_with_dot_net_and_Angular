import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../services/Product/product.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../service/Company/company.service';
import { Company } from '../../../models/company/company';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {


  companyId!: number;
  paramsSubscription!: Subscription;



  companies: Company[]=[];


  onDropdownSelectionChange(selectedValue: any) {
    console.log(selectedValue);
    this.fetchData(selectedValue);
  }



  productData: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.productData);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["productName", "price", "sequence", "description","IsActive", "actions"];
  startDate: string = '';
  endDate: string = '';

  constructor(
    private productDataSvc: ProductService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  
  )
  {
  // this.levelKeys = Object.keys(Company).filter(f => !isNaN(Number(f)));
  }





  ngOnInit() {

    const today = new Date();
    this.endDate = this.formatDate(today);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    this.startDate = this.formatDate(fifteenDaysAgo);
    if (true) {
      this.companyService.getCompany()
        .subscribe(data => {
          this.companies = data;
        }, err => {

          this._notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this._notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    }
    this.fetchData(1);

  }
  

  //ngOnDestroy() {
  //  this.paramsSubscription.unsubscribe();
  //}

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  

  fetchData(companyId:any) {
    if (true) {
      this.productDataSvc.getProductsListCompanyWise(companyId)
        .subscribe(data => {
          this.productData = data;
          this.dataSource.data = this.productData;
          console.log(data);
          console.log(this.dataSource.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.productData = [];
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
