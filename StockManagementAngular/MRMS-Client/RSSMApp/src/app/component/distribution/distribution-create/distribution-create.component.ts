import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { SalesDistribution } from '../../../models/sales/sales-distribution';
import { SalesDistributionService } from '../../../services/sales/sales-distribution.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'app-distribution-create',
  templateUrl: './distribution-create.component.html',
  styleUrls: ['./distribution-create.component.css']
})
export class DistributionCreateComponent implements OnInit {
  


  currentDate: Date = new Date();
  distributeForm: FormGroup = new FormGroup({});
  formData: SalesDistribution[] = [{}];
  productData: Product[] = [];

  form = new FormGroup({});
  model = {
    concernPerson:'',
    formData: this.formData
  }
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  submit() {
    console.log("submitted");
  }

  constructor(
    private notificationSvc: NotificationService,
    private salesService: SalesDistributionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.generatedistributeFormFields();
  }



  insert(): void {
    console.log(this.model);
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.salesService.insert({
        concernPerson:this.model.concernPerson,
        salesDistribute: this.model.formData
    })
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }
  generatedistributeFormFields() {
    
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
          fieldGroup: [
          {
            className: 'concernPerson width-50-percent',
            type: 'input',
            key: 'concernPerson',
          props: {
          label: 'ConcernPerson',
          floatLabel: 'always',
          appearance: 'outline',
          required: true,
          hideRequiredMarker: true,
      
        },
        validation: {
          messages: { required: " " }
        }
          }
        ],  
      },
      {
        key: 'formData',
        type: 'product-distribution',
        fieldArray: {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'product flex-1 width-160',
              type: 'select',
              key: 'productId',
              templateOptions: {
                label: 'Product Name',
                options: this.salesService.getProduct().pipe(
                  map(
                    x => x.filter(a=>!this.formData
                          .filter(a => a !== undefined)
                          .map(a=>a.productId)
                        .includes(a.productId))       
                  )
                ),
                valueProp:'productId',
                labelProp:'productName'
              },

              validation: {
                messages: { required: " " }
              },
              // hooks:{
              //   onChanges:(field:FormlyFieldConfig)=>{
              //     const updatedOptions = this.salesService.getProduct().pipe(
              //       tap(value=>value.filter(
              //         x=>this.model.formData.some(d=>d.productId !== x.productId)
              //       ))
              //     );
              //     console.log(updatedOptions);
              //     // field.model.productId=updatedOptions;
              //     // console.log(updatedOptions)
                
              //   }
              // }
            },
            {
              className: 'price flex-1 width-160',
              type: 'input',
              key: 'price',
              props: {
                label: 'Price',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly: true
              },
              validation: {
                messages: { required: " " }
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.form?.get('productId')
                    ?.valueChanges.subscribe(value => {
                      this.salesService.getPrice(value)
                        .subscribe(r => {
                          field.formControl?.setValue(r.price);
                          console.log(r.price);
                          
                        }, err => {
                          this.notificationSvc.message("Failed to load price", "DISMISS");
                        })
                      })
                }
                }
            },
            {
              className: 'receiveQuantity flex-1 width-160',
              type: 'input',
              key: 'receiveQuantity',
              props: {
                label: 'ReceiveQuantity',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              }
            },
            {
              className: 'returnQuantity flex-1 width-160',
              type: 'input',
              key: 'returnQuantity',
              props: {
                label: 'ReturnQuantity',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              }
            },
            {
              className: 'salesQuantity flex-1 width-160',
              type: 'input',
              key: 'salesQuantity',
              props: {
                label: 'SalesQuantity',
                floatLabel: 'always',
                appearance: 'outline',
                readonly: true,
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.form?.get('receiveQuantity')?.valueChanges.subscribe({
                    next: (value) => {
                      const receiveQ = value;
                      const returnQ=(field.form?.get('returnQuantity')?.value || 0) 
                      field.formControl?.setValue(receiveQ - returnQ);
                    }
                  });
            
                  field.form?.get('returnQuantity')?.valueChanges.subscribe({
                    next: (value) => {
                      const returnQ = value;
                      const receiveQ=(field.form?.get('receiveQuantity')?.value || 0)
                      field.formControl?.setValue(receiveQ - returnQ);
                    }
                  });
                }
              }
       
            },
            {
              className: 'totalSalesPrice flex-1 width-160',
              type: 'input',
              key: 'totalSalesPrice',
              props: {
                label: 'TotalSalesPrice',
                floatLabel: 'always',
                appearance: 'outline',
                readonly: true,
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.form?.get('price')?.valueChanges.subscribe({
                    next: (value) => {
                      const price = value;
                      const salesQ=(field.form?.get('salesQuantity')?.value || 0)
                      field.formControl?.setValue(price * salesQ );
                    }
                  });
            
                  field.form?.get('salesQuantity')?.valueChanges.subscribe({
                    next: (value) => {
                      const salesQ = value;
                      const price=(field.form?.get('price')?.value || 0)
                      field.formControl?.setValue( price * salesQ);
                    }
                  });
                }
              }
            }
          ],
        }
      }
    ]
  }

}
