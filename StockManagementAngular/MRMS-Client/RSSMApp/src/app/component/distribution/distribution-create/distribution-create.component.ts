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
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { StateService } from 'src/app/services/Shared/state.service';

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
    concernPersonId:0,
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
    private activatedRoute: ActivatedRoute,
    private concernPersonSvc: ConcernPersonService,
    private stateService:StateService
  ) { }

  ngOnInit(): void {

    // this.salesService.getProduct()
    // .subscribe(data=>{
    //   this.productData=data;
    // }, err => {

    //   this.notificationSvc.message("Failed to load data", "DISMISS");
    // });

    this.generatedistributeFormFields();
    this.model.concernPersonId =Number( this.activatedRoute.snapshot.params['id']);
    
  }

  insert(): void {
    console.log(this.model);
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.salesService.checkTodayConcernPersonDistribution(this.model.concernPersonId).toPromise().then(
      x => {
        if(x === true){
          this.notificationSvc.message("This data update not possible", "DISMISS");
        }
        else{
          this.salesService.insert({
            concernPersonId:this.model.concernPersonId,
              salesDistribute: this.model.formData
          })
            .subscribe(r => {
              this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
              this.stateService.updateState('concernPersonId');
              //this.router.navigate(['/sales-view']);
              const routeD = `/sales-view`;
              this.router.navigate([routeD]);
            }, err => {
              this.notificationSvc.message("Failed to save data!!!", "DISMISS");
          });
        }
      }
    );
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
              label: 'ডিস্ট্রিভিউটর',
              options: this.concernPersonSvc.getConcernPerson(),
              valueProp:'concernPersonId',
              labelProp:'concernPersonName'
            },
        validation: {
          messages: { required: " " }
        },
        hooks:{
          onInit:(field:FormlyFieldConfig)=>{
            field.form?.get('concernPersonId')//
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
                label: 'পণ্যের নাম',
                options: 
                
                // of(this.productData).pipe(
                //   map(
                //     x=>x.filter(a=>!this.formData
                //       .filter(a=>a!==undefined)
                //       .map(a=>a.productId)
                //       .includes(a.productId)
                //       )
                //   )
                // ),
                
                this.salesService.getProduct().pipe(
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
                label: 'মূল্য',
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
                label: 'গ্রহণ',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true
              },
              validation: {
                messages: { required: "Rececive Quantity required" }
              },
              hooks:{
                onInit:(field:FormlyFieldConfig)=>{
                  field.formControl?.setValue(0);
                }
              }
            },
            {
              className: 'returnQuantity flex-1 width-160',
              type: 'input',
              key: 'returnQuantity',
              props: {
                label: 'অবশিষ্ট',
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
                label: 'মোট',
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
                  field.form?.get('receiveQuantity')?.valueChanges.subscribe({
                    next:(value)=>{
                      const receiveQ = +value;
                      const returnQ=(field.form?.get('returnQuantity')?.value || 0)
                      field.formControl?.setValue(receiveQ + returnQ);
                    }
                  });
                  field.form?.get('returnQuantity')?.valueChanges.subscribe({
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
                label: 'বিক্রি',
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
                label: 'মোট বিক্রিত মূল্য',
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
