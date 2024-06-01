import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/Stock/Stock';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ProductService } from 'src/app/services/Product/product.service';
import { StockService } from 'src/app/services/Stock/stock.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { Company } from 'src/app/models/companyenum/company';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {
  currentDate: Date = new Date();
  companyId! : number;
  savoyForm: FormGroup = new FormGroup({});
  savoyData: Stock[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  previousDay? =  null;
  dateControl = new FormControl(new Date());
  createDateFilter = (days: number) => {
    return (d: Date | null): boolean => {
      const today = new Date();
      const dateToCheck = d || today;
      const daysAgo = new Date(today);
      daysAgo.setDate(today.getDate() - days);
      return dateToCheck >= daysAgo && dateToCheck <= today;
    };
  }; 
  dateFilter = this.createDateFilter(5);

  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private savoyService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  )
  {
    this.companyId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductsWithEja(this.companyId)
      .subscribe(r => {
        this.savoyData = r.map(x => ({
          productId: x.productId,
          productName: x.productName,
          price: x.price,
          eja: x.eja,
          newProduct: (x.newProduct ?? 0) - (x.eja ?? 0),
          salesQuantity: x.salesQuantity
        }));
        this.generateFormFields();
      }, err => {
        this.notificationSvc.message("Failed to load Company", "DISMISS");
      })
  }

  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.savoyService.insert(this.companyId, this.savoyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/stock-view']);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }


    generateFormFields() {
    this.fields = [
      {
        type: 'product-repeat',
        fieldArray: {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
            className: 'product-name flex-1 width-180',
            type: 'input',
            key: 'productName',
            props: {
              label: 'Product',
              readonly: true,
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1 width-100',
            type: 'input',
            key: 'price',
            props: {
              label: 'Price',
              readonly: true,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1 width-100',
            type: 'input',
            key: 'eja',
            props: {
              label: 'Eja',
              readonly: true,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1 width-110',
            type: 'input',
            key: 'newProduct',
            props: {
              label: 'New Product',
              readonly: true,
              
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1 width-100',
            type: 'input',
            key: 'total',
            props: {
              label: 'Total',
              readonly: true,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            },
            expressions: {
              'model.total': 'parseInt(model.eja) + (model.newProduct ? parseInt(model.newProduct) : 0)',
              'templateOptions.errorMessage': (field: FormlyFieldConfig) => {
                const salesQuantity = field.form?.get('salesQuantity')?.value;
                const totalQuantity = field.formControl?.value;

                if (salesQuantity > totalQuantity) {
                  field.formControl?.setErrors({ 'quantityExceeded': true });
                  return '';
                } else {
                  field.formControl?.setErrors(null);
                  return '';
                }
              }
            }
          },
          {
            className: 'flex-1 width-115',
            type: 'input',
            key: 'salesQuantity',
            props: {
              label: 'Sales Quantity',
              readonly: true,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1 width-120',
            type: 'input',
            key: 'totalAmount',
            props: {
              label: 'Total Amount',
              readonly: true,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            },
            expressions: {
              'model.totalAmount': 'parseInt(model.price) * (model.salesQuantity ? parseInt(model.salesQuantity) : 0)',
            }
            
          },
          {
            className: 'flex-1 width-140',
            type: 'input',
            key: 'damageQuantity',
            props: {
              label: 'Damage Quantity',
              required: false,
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            }
          },            
          ],
        }
      }
    ]
  }

}
