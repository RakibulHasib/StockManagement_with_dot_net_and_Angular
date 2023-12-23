import { StateService } from 'src/app/services/Shared/state.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../models/Product/product';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ProductService } from '../../../services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../../service/Company/company.service';
import { filter, forkJoin, map, switchMap } from 'rxjs';
import { Company } from '../../../models/company/company';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  currentDate: Date = new Date();
  companyId!: number;
  companyNames!:string;
  
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
    private companyService: CompanyService,
    private ngZone: NgZone,
    private stateservice: StateService
  ) {
    
  }
 
  // getCompanyRoute(companyId: number): string {
  //   return `/productView/${companyNames}`;
  // }

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
        //this.router.navigate(['/productView', { companyId: r.companyId }]);
        const selectedCompanyId = this.productData.companyId;
        this.stateservice.updateState(this.productData.companyId);
      
      const routeWithCompanyId = `/productView`;
      console.log("CompanyID",selectedCompanyId);
      this.router.navigate([routeWithCompanyId]);

        console.log(r);
         
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    // this.companyService.getCompany().subscribe(
    //   data => {
    //     this.companyData = data;
    //     console.log("CompanyData",data);
    //   },
    //   error => {
    //     console.error('Error fetching company data:', error);
    //   }
    // );
    this.companyId =Number( this.activatedRoute.snapshot.params['id']);
    this.generateFormFields();
    
  }
  getCompanyName(companyId: number): string | undefined {
    const company = this.companyData.find(c => c.companyId === companyId);
    console.log("CompanyName in method",company)
    return company ? company.companyName : undefined;
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
            
            props: {
              label: 'Company Name',
              options: this.companyService.getCompany(),

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
                
                // setTimeout(() => {
                //   const companyIdFromRoute =this.companyId;
                //   if (companyIdFromRoute) {
                //     field.formControl?.setValue(+companyIdFromRoute);
                //   }
                // });

                    field.formControl?.setValue(this.companyId);
                    
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




// generateFormFields() {
  //   this.activatedRoute.params.pipe(
  //     switchMap((routeParams) => {
  //       const companyIdFromRoute = routeParams['id'];
  //       return this.companyService.getCompany().pipe(
  //         switchMap((companies) => {
  //           console.log('Companies from service:', companies)
  //           console.log('CompanyId from route:', companyIdFromRoute);
  //           this.fields = [
  //             {
  //               fieldGroupClassName: 'display-flex',
  //               key: 'productData',
  //               fieldGroup: [
  //                 {
  //                   className: 'flex-1',
  //                   type: 'select',
  //                   key: 'companyId',
  //                   props: {
  //                     label: 'Company Name',
  //                     options: companies,
  //                     valueProp: 'companyId',
  //                     labelProp: 'companyName',
  //                     appearance: 'outline'
  //                   },
  //                   expressionProperties: {
  //                     'templateOptions.style': () => ({
  //                       border: '2px solid #ff5722',
  //                       borderRadius: '5px',
  //                       padding: '5px 10px'
  //                     })
  //                   },
  //                   validation: {
  //                     messages: { required: ' ' }
  //                   },
  //                   hooks: {
  //                     onInit: (field: FormlyFieldConfig) => {
  //                       this.ngZone.run(() => {
  //                         if (companyIdFromRoute) {
  //                           const companyIdNumber = +companyIdFromRoute; // Ensure the correct type
  //                           field.formControl?.setValue(companyIdNumber);
  //                         } else if (companies.length > 0) {
  //                           field.formControl?.setValue(companies[0].companyId);
  //                         }
  //                       });
  //                       // console.log('CompanyId from route:', companyIdFromRoute);
  //                       // if (companyIdFromRoute) {
  //                       //   const companyIdNumber = +companyIdFromRoute;
  //                       //   field.formControl?.setValue(companyIdFromRoute);
  //                       //   console.log('Setting selected company:', companyIdNumber);
  //                       // } else if (companies.length > 0) {
  //                       //   field.formControl?.setValue(companies[0].companyId);
  //                       //   console.log('Setting default company:', companies[0].companyId);
  //                       // }
  //                     }
  //                   }
  //                 },
  //                 {
  //                   className: 'flex-1',
  //                   type: 'input',
  //                   key: 'productName',
  //                   props: {
  //                     label: 'Product Name',
  //                     appearance: 'outline',
  //                     floatLabel: 'always',
  //                     hideRequiredMarker: true,
  //                   },
  //                   validation: {
  //                     messages: { required: " " }
  //                   }
  //                 },
  //                 {
  //                   className: 'flex-1',
  //                   type: 'input',
  //                   key: 'price',
  //                   props: {
  //                     label: 'Price',
  //                     required: true,
  //                     appearance: 'outline',
  //                     floatLabel: 'always',
  //                     hideRequiredMarker: true,
  //                   },
  //                   validation: {
  //                     messages: { required: " " }
  //                   }
  //                 },
  //                 {
  //                   className: 'flex-1',
  //                   type: 'input',
  //                   key: 'sequence',
  //                   props: {
  //                     label: 'Sequence',
  //                     appearance: 'outline',
  //                     floatLabel: 'always',
  //                     hideRequiredMarker: true,
  //                   },
  //                   validation: {
  //                     messages: { required: " " }
  //                   }
  //                 },
  //                 {
  //                   className: 'flex-1',
  //                   type: 'input',
  //                   key: 'description',
  //                   props: {
  //                     label: 'Description',
  //                     required: true,
  //                     appearance: 'outline',
  //                     floatLabel: 'always',
  //                     hideRequiredMarker: true,
  //                   },
  //                   validation: {
  //                     messages: { required: " " }
  //                   }
  //                 },
  //                 {
  //                   className: 'flex-1',
  //                   type: 'toggle',
  //                   defaultValue: true,
  //                   key: 'IsActive',
  //                   props: {
  //                     label: 'IsActive',
  //                     appearance: 'outline',
  //                     floatLabel: 'always',
  //                     hideRequiredMarker: true,
  //                   },
  //                   validation: {
  //                     messages: { required: " " }
  //                   },
  //                   expressions: {
  //                     'model.IsActive': 'model.IsActive ? 1 : 0'
        
  //                   },
  //                 },
  //               ]
  //             }
  //           ];
  //           return [];
  //         })
  //       );
  //     })
  //   ).subscribe();
  // }
