import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/Product/product';
import { SalesDistribution } from 'src/app/models/sales/sales-distribution';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';

@Component({
  selector: 'app-distribution-edit',
  templateUrl: './distribution-edit.component.html',
  styleUrls: ['./distribution-edit.component.css']
})
export class DistributionEditComponent {
  distributeForm: FormGroup = new FormGroup({});
  formData: SalesDistribution[] = [{}];
  productData: Product[] = [];
  salesDistributeId!: number;

  model = {
    concernPersonId:0,
    formData: this.formData
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    private notificationSvc: NotificationService,
    private salesService: SalesDistributionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private concernPersonSvc: ConcernPersonService
  ) { }

  ngOnInit(): void{
    this.salesDistributeId = this.activatedRoute.snapshot.params['id'];
    this.salesService.getDistributionById(this.salesDistributeId)
      .subscribe(r => {
        this.model.concernPersonId = r.concernPersonID;
        this.model.formData=r.salesDistribute;

        this.generatedistributeFormFields();
      }, err => {
        this.notificationSvc.message("Failed to load data", "DISMISS");
      })
  }

  generatedistributeFormFields() {
    
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
          fieldGroup: [
          {
            className: 'concernPerson width-50-percent',
            type: 'select',
            key: 'concernPersonId',
            templateOptions: {
              label: 'Concern Person',
              options: this.concernPersonSvc.getConcernPerson(),
              valueProp:'concernPersonId',
              labelProp:'concernPersonName'
            },
        validation: {
          messages: { required: " " }
        },
        hooks:{
          onInit:(field:FormlyFieldConfig)=>{
            field.form?.get('concernPersonId')
              ?.valueChanges.subscribe(value =>{
                this.salesService.checkTodayConcernPersonDistribution(value).toPromise().then(
                  x => {
                    console.log(x)
                    if(x === true){
                      this.notificationSvc.message("This person distribution already updated", "DISMISS");
                    }
                  }
                );
            })

          }
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
                hideRequiredMarker: true
              },
              validation: {
                messages: { required: "Rececive Quantity required" }
              }
            },
            {
              className: 'returnQuantity flex-1 width-160',
              type: 'input',
              key: 'returnQuantity',
              props: {
                label: 'RemainingQuantity',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly:true
              },
              validation: {
                messages: { required: " " }
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                    field.form?.get('productId')?.valueChanges
                    .subscribe((value: number)=>{
                        this.salesService.getRemaining(value,this.model.concernPersonId)
                          .subscribe(r => {
                            field.formControl?.setValue(r);                     
                          }, err => {
                            this.notificationSvc.message("Failed to load remaining", "DISMISS");
                          })
                        }
                    )}
                                
                }
            },
            {
              className: 'totalQuantity flex-1 width-160',
              type: 'input',
              key: 'totalQuantity',
              props: {
                label: 'TotalQuantity',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly:true
              },
              validation: {
                messages: { required: " " }
              },
              hooks:{
                onInit:(field:FormlyFieldConfig)=>{
                  const receiveQField = field.form?.get('receiveQuantity');
                  const returnQField = field.form?.get('returnQuantity');
                  field.formControl?.setValue(receiveQField?.value || 0 + returnQField?.value || 0);

                  receiveQField?.valueChanges.subscribe({
                    next:(value)=>{
                      const receiveQ = +value;
                      const returnQ=(field.form?.get('returnQuantity')?.value || 0)
                      field.formControl?.setValue(receiveQ + returnQ);
                    }
                  });
                  returnQField?.valueChanges.subscribe({
                    next:(value)=>{
                      const returnQ= +value;
                      const receiveQ=(field.form?.get('receiveQuantity')?.value || 0)
                      field.formControl?.setValue(receiveQ+returnQ);
                    }
                  })
                }
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
                hideRequiredMarker: true,
                required:true
              },
              validation: {
                messages: { required: "Sales quantity required" }
              },
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
