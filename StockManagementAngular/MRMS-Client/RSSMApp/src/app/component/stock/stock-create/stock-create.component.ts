import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Savoy } from 'src/app/models/Savoy/Savoy';
import { ProductService } from 'src/app/services/Product/product.service';
import { StockService } from 'src/app/services/Savoy/savoy.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  companyId! : number;
  savoyForm: FormGroup = new FormGroup({});
  savoyData: Savoy[] = [];

  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];
  
  submit(){
    console.log("submitted");
  }
  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private savoyService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.savoyService.insert(this.companyId, this.savoyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/savoy']);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductsWithEja(this.companyId)
      .subscribe(r => {
        this.savoyData = r;
        this.generateFormFields();
      }, err => {
        this.notificationSvc.message("Failed to load Company", "DISMISS");
      })
  }

  updateProduct(updatedProduct: Savoy, index: number) {
    this.savoyData[index] = updatedProduct;
  }

  trackByProduct(index: number, product: Savoy): any {
    return product.productId;
  }

    generateFormFields() {
    this.fields = [
      {
        type: 'product-repeat',
        fieldArray: {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
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
              messages:{required:" "}
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
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'eja',
            props: {
              label: 'Eja',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1',
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
            className: 'flex-1',
            type: 'input',
            key: 'total',
            props: {
              label: 'Total',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1',
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
            className: 'flex-1',
            type: 'input',
            key: 'totalAmount',
            props: {
              label: 'Total Amount',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'dumping',
            props: {
              label: 'Dumping',
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
            className: 'flex-1',
            type: 'input',
            key: 'receive',
            props: {
              label: 'Receive',
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
            className: 'flex-1',
            type: 'input',
            key: 'remaining',
            props: {
              label: 'Remaining',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages:{required:" "}
            }
          }     
          ],
        }
      }
    ]
  }

}
