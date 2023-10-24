import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../models/Product/product';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ProductService } from '../../../services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../models/companyenum/company';

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
  

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.companyId = this.activatedRoute.snapshot.params['id'];
  }


  getCompanyRoute(companyId: any): string {
    return `/stock/${Company[companyId]}`;
  }
  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.productService.insert( this.productData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/prductView', this.companyId]);
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
          fieldGroup: [
     
            {
              className: 'flex-1',
              type: 'input',
              key: 'productName',
              props: {
                label: 'Product Name',
                appearance:'outline',
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
              defaultValue:true,
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
