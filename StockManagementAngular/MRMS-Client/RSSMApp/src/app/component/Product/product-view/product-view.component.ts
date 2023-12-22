import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../services/Product/product.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../service/Company/company.service';
import { Company } from '../../../models/company/company';
import { StateService } from 'src/app/services/Shared/state.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {


  companyId!: number;
  paramsSubscription!: Subscription;
  companies: Company[]=[];
  selectedCompany: number= 1;
  selectedCompanyId: any;

  // onDropdownSelectionChange(selectedValue: any) {
  //   console.log(selectedValue);
  //   this.fetchData(selectedValue);
  // }


  onDropdownSelectionChange(companyId: any) {
    this.selectedCompanyId = companyId;
    this.fetchData(companyId);
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
    private companyService: CompanyService,
    private stateService: StateService,
    private router: Router,
  
  )
  {
  // this.levelKeys = Object.keys(Company).filter(f => !isNaN(Number(f)));
  }





  ngOnInit() {
    this.selectedCompany = this.stateService.getPreviousState(1)?.selectedCompany || 1;
    const today = new Date();
    this.endDate = this.formatDate(today);
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
    this.startDate = this.formatDate(fifteenDaysAgo);
   
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.root;
        if (!currentRoute.snapshot.children.some(child => child.routeConfig?.path === 'productView' || child.routeConfig?.path === 'productAdd/:id')) {
          this.resetState();
        }
      }
    });

    this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
      const companyKey = params['id'];
      // this.companyId = +Company[companyKey];
      this.fetchCompanyData();
    
      // Call the company service inside the paramsSubscription
      this.companyService.getCompany().subscribe(
        data => {
          this.companies = data;
          this.selectedCompanyId = this.companies.length > 0 ? this.companies[0].companyId : null;
    
          this.fetchData(this.selectedCompanyId);
        },
        err => {
          this._notificationSvc.message("Failed to load data", "DISMISS");
        }
      );
    });

    // this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
    //   const companyKey = params['company'];
    //   // this.companyId = +Company[companyKey];
    //   this.fetchCompanyData();
      
    // });
    // this.companyService.getCompany()
    // .subscribe(data => {
    //   this.companies = data;
    //   this.selectedCompanyId = this.companies.length > 0 ? this.companies[0].companyId : null;

    //   this.fetchCompanyData();
    //   this.fetchData(this.selectedCompany);
    // }, err => {
    //   this._notificationSvc.message("Failed to load data", "DISMISS");
    // });
    // this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
    //   const companyKey = params['company'];
    //   const selectedCompany = this.companies.find(company => company.companyId === companyKey);
    //   this.selectedCompanyId = selectedCompany ? selectedCompany.companyId : null;
    //   this.fetchCompanyData();
    //   this.fetchData(this.selectedCompanyId);
    // });

    // this.paramsSubscription = this.activatedRoute.params.subscribe((params) => {
    //   const companyKey = params['company'];
    //   // this.companyId = +Company[companyKey];
    //   this.fetchCompanyData();
    //   this.fetchData(this.selectedCompany);
    // });
    // if (true) {
    //   this.companyService.getCompany()
    //     .subscribe(data => {
    //       this.companies = data;
    //     }, err => {

    //       this._notificationSvc.message("Failed to load data", "DISMISS");
    //     });
    // } else {
    //   this._notificationSvc.message("Please provide both Start Date and End Date", "DISMISS");
    // }
    //this.fetchData(1);

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
  navigateToAddProduct() {
   
    this.router.navigate(['/productAdd', this.selectedCompany]);
  }

   resetState(): void {
    this.stateService.resetState();
  }
  fetchCompanyData(){
    if(true){
      this.companyService.getCompany()
      .subscribe(data=>{
        this.companies=data;
      }, err => {

        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
    }
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
