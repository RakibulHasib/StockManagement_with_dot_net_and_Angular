import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Stock } from 'src/app/models/Stock/Stock';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StockService } from 'src/app/services/Stock/stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent {
  currentDate: Date = new Date();
  companyId! : number;
  savoyForm: FormGroup = new FormGroup({});
  savoyData: Stock[] = [];
  stockId!: number;


  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  
  constructor(
    private notificationSvc: NotificationService,
    private savoyService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){ }

  updateStock(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.savoyService.updateStock(this.companyId, this.savoyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/stock-view']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    this.stockId = this.activatedRoute.snapshot.params['id'];
    this.savoyService.getStockById(this.stockId)
      .subscribe(r => {
        this.savoyData = r;

        const companyIdFromSavoyData = this.savoyData[0]?.companyId;
        if (companyIdFromSavoyData !== undefined) {
            this.companyId = companyIdFromSavoyData;
        } else {
          this.notificationSvc.message("Company not laoded", "DISMISS");
        }

        this.generateFormFields();
      }, err => {
        this.notificationSvc.message("Failed to load Company", "DISMISS");
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
              required: true,
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
              required: true,
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
            }
            // expressions: {
            //   'model.total': 'parseInt(model.eja) + (model.newProduct ? parseInt(model.newProduct) : 0)',
            // }
          },
          {
            className: 'flex-1 width-115',
            type: 'input',
            key: 'salesQuantity',
            props: {
              label: 'Sales Quantity',
              required: true,
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
