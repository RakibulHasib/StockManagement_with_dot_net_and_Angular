import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../models/Product/product';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ProductService } from '../../../services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../service/Company/company.service';
import { filter, map } from 'rxjs';
import { Company } from '../../../models/company/company';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  currentDate: Date = new Date();
  companyId!: number;
  
  producForm: FormGroup = new FormGroup({});
  productData: Product = new Product;

  companyData: Company[] = [];

  model = {
    productData: this.productData
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.companyId = this.activatedRoute.snapshot.params['id'];
  }


  getCompanyRoute(companyId: any): string {
    return `/productView`;
  }
  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.productService.insert(this.productData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/productView']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    //this.companyId = this.activatedRoute.snapshot.params['id'];
    /* this.productService.getProductsListCompanyWise(this.companyId)*/
    //.subscribe(r => {
    //  /*this.productData = r;*/
    //  this.generateFormFields();
    //}, err => {
    //  this.notificationSvc.message("Failed to load Company", "DISMISS");
    //})
    this.generateFormFields();
  }

  generateFormFields() {
    this.fields = [
      {

        fieldGroupClassName: 'display-flex',
        key: 'productData',
        fieldGroup: [

          {
            className: 'flex-1',
            type: 'select',
            key: 'companyId',
            defaultValue:1,

            props: {
              label: 'Company Name',
              options: this.companyService.getCompany(),
              valueProp: 'companyId',
              labelProp: 'companyName',
              appearance: 'outline'
              
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
              // onInit: (field: FormlyFieldConfig) => {
               
              //       // this.companyService.getCompany()
              //       //   .subscribe(r => {
              //       //     field.defaultValue=r[0].companyId;
              //       //     console.log(r[0].companyId);
              //       //   }, err => {
              //       //     this.notificationSvc.message("No Company ", "DISMISS");
              //       //   })
          
              // }
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
              hideRequiredMarker: true,
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
              hideRequiredMarker: true,
            },
            validation: {
              messages: { required: " " }
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
              required: true,
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
}
