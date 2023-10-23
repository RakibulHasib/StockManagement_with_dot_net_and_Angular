import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../models/Product/product';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ProductService } from '../../../services/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  companyId!: number;
  producForm: FormGroup = new FormGroup({});
  productData: Product[] = [];

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
  //getCompanyRoute(companyId: Number): string {
  //  //return `/stock/${companyId}`;
  //}

  generateFormFields() {
    this.fields = [
      {
        fieldArray: {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              type: 'input',
              key: 'productId',
              props: {
                label: 'Product ID',

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
              key: 'productName',
              props: {
                label: 'Product',

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
              type: 'input',
              key: 'IsActive',
              props: {
                label: 'IsActive',
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
              key: 'IsDeleted',
              props: {
                label: 'IsDeleted',
                required: true,
                appearance: 'outline',
                floatLabel: 'always',
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              }
            },
            
            
           
          ],
        }
      }
    ]
  }
}
