import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../services/Product/product.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { FormGroup, FormsModule } from '@angular/forms';
import { CompanyService } from '../../../service/Company/company.service';
import { Company } from '../../../models/company/company';
import { StateService } from 'src/app/services/Shared/state.service';
import Swal from 'sweetalert2';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {

  companyId!: number;
  paramsSubscription!: Subscription;
  companies: Company[] = [];
  selectedCompanyId: number = 1;

  onDropdownSelectionChange(companyId: any) {
    this.selectedCompanyId = companyId;
    this.fetchData();
  }

  currentDate: Date = new Date();
  companyNames!: string;
  
  products: Product = new Product;
  model = {
    productUnit: this.products
  }
 
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];


  productData: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.productData);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["productName", "price", "sequence", "description", "IsActive", "actions"];
  startDate: string = '';
  endDate: string = '';
  modalRef: any;
  private subscription: Subscription = new Subscription(); 

  constructor(
    private productDataSvc: ProductService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private stateService: StateService,
    private router: Router,
    private _modal: NgbModal,
  
  ) { }

  ngOnInit() {
    this.selectedCompanyId = this.stateService.getPreviousState(1)?.selectedCompanyId || 1;
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

     this.fetchCompanyData();
     this.fetchData();

  }
  

  ngOnDestroy() {
   
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  navigateToAddProduct() {
    this.stateUpdate();
    this.router.navigate(['/productAdd', this.selectedCompanyId]);
  }
  stateUpdate(): void {
    this.stateService.updateState({ selectedCompanyId: this.selectedCompanyId });
  }

   resetState(): void {
    this.stateService.resetState();
  }
  fetchCompanyData() {
    if (true) {
      this.companyService.getCompany()
        .subscribe(data => {
          this.companies = data;
      }, err => {

        this._notificationSvc.message("Failed to load data", "DISMISS");
      });
    }
  }
  fetchData() {
    if (true) {
      this.productDataSvc.getProductsListCompanyWise(this.selectedCompanyId)
        .subscribe(data => {
          this.productData = data;
          this.dataSource.data = this.productData;
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

  showConfirmationAlert(productId: number, data: any) {
    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
     text: " আপনি কি পণ্য নিষ্ক্রিয় করতে চান? ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'বাতিল করুন',
      confirmButtonText: 'হ্যাঁ, নিষ্ক্রিয় করুন!',
      focusCancel: true,
      focusConfirm: false,
      position: "top"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(this.productDataSvc.delete(productId, data).subscribe(r => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'পণ্যটি নিষ্ক্রিয় করা হল',
            timer: 2000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/productView']);
         
        }));
      }
      if (result.isDismissed) {
        Swal.fire({
          icon: 'warning',
          title: 'Warn!',
          text: 'পণ্য নিষ্ক্রিয় করার অনুমোদন টি বাদ দেয়া হল',
          timer: 2000,
          showConfirmButton: false,
          width: 400,
          position: "top",
        });
      }
    });
  }


   update(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
      return;
    }
   
    this.subscription.add(this.productDataSvc.update(this.products)
    .subscribe(r => {
      const productIndex = this.productData.findIndex(c => c.productId === r.productId);
      if (productIndex !== -1) {
        this.productData[productIndex] = r;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data update successfully.',
          timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
        customClass: {
          container: 'swal-top'
        }
      });
      
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/productView']);
      this.resetModal();
      this.form.reset();
      // this.producForm.reset();
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this._modal.dismissAll();
      // this.fetchData();
      // this.form.reset();
      // this.products = new Product();
      // console.log("Products",this.products)
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }));
  }

  onCreate(template: TemplateRef<any>) {
   // this.products = new Product();
    // this.resetModal();
    this.companies;
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
      return;
    }
    this.subscription.add(this.productDataSvc.insert(this.products)
    .subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data update successfully.',
          timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
        customClass: {
          container: 'swal-top'
        }
      }); 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/productView']);
      this.form.reset();
      this._modal.dismissAll();

      //  this.form.reset();
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this._modal.dismissAll();
      // this.fetchData();
      // this.resetModal();
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }));
   
  }


  onEdit(template: TemplateRef<any>, item: Product) {
    this.products = Object.assign({}, item);
    this.model.productUnit = this.products;
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  closeModal(modalRef: NgbActiveModal) {
    this.form.reset(); 
    modalRef.dismiss();
    this.resetModal();
    
  }
 async generateFormFields() {
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        key: 'productUnit',
        fieldGroup: [
          {
            
            className: 'flex-1',
            type: 'select',
            key: 'companyId',
            
            props: {
              label: 'Company Name',
              options: this.companies,
              valueProp: 'companyId',
              labelProp: 'companyName',
              appearance: 'outline',
              
            },
            expressionProperties: {
              'templateOptions.style': () => ({
                border: '2px solid #ff5722', 
                borderRadius: '5px', 
                padding: '5px 10px' 
              })
            },
            validation: {
              messages: { required: " " }
            },
            
            hooks: {
             
              onInit: (field: FormlyFieldConfig) => {
                this.model.productUnit.companyId = this.model.productUnit.companyId;
              }
              
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'productName',
            props: {
              label: 'Product Name',
              appearance: 'outline',
              floatLabel: 'always',
              required: true
            },
            validation: {
              messages: { required: " " }
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'price',
            props: {
              label: 'Price',
              required: true,
              appearance: 'outline',
              floatLabel: 'always',
            },
            validation: {
              messages: { required: "Have to add price" }
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'sequence',
            props: {
              label: 'Sequence',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages: { required: " " }
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'description',
            props: {
              label: 'Description',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            }
          },
          {
            className: 'flex-1',
            type: 'toggle',
            defaultValue: true,
            key: 'IsActive',
            props: {
              label: 'IsActive',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages: { required: " " }
            },
            expressions: {
              'model.IsActive': 'model.IsActive ? 1 : 0'

            },
          },
        ],

      }
    ]
    
    
  }
  

  resetModal() {
    this.products = new Product();
    this.model.productUnit = new Product;
  }
}
