  import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { SalesDistribution } from '../../../models/sales/sales-distribution';
import { SalesDistributionService } from '../../../services/sales/sales-distribution.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { StateService } from 'src/app/services/Shared/state.service';
import { ConcernPerson, ConcernPersonMapping } from 'src/app/models/concernPerson/concern-person';
import { CompanyService } from 'src/app/service/Company/company.service';
import { Company } from 'src/app/models/company/company';

@Component({
  selector: 'app-distribution-create',
  templateUrl: './distribution-create.component.html',
  styleUrls: ['./distribution-create.component.css']
})
export class DistributionCreateComponent implements OnInit {

  companies: Company[] = [];
  concernPerson: ConcernPerson[]=[];

  concernPersonMapping: ConcernPersonMapping[] = [];
  selectedConcernPerson: number = 0;
  selectedCompany: number = 0;
  distibutionId : number = 0;

  currentDate: Date = new Date();
  distributeForm: FormGroup = new FormGroup({});
  formData: SalesDistribution[] = [];
  productData: Product[] = [];  
  templateOptions: any = {};
  form = new FormGroup({});
  model = {
    concernPersonId: 0,
    companyId: 0,
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
    private stateService:StateService,
    private companySvc: CompanyService,
  ) { }

  ngOnInit(): void {
    this.fetchConcernPersonData();    
    this.generatedistributeFormFields();
    
  }

  onConcernPersonDropdownSelectionChange(selectedConcernPerson: number) {
    this.selectedConcernPerson = selectedConcernPerson;
    this.fetchCompanyDataByConcernPerson(selectedConcernPerson);
  }

  onCompanyDropdownSelectionChange(selectedCompany: number) {

    this.salesService.GetProductInfoByConcernPerson(this.selectedConcernPerson, selectedCompany)
    .subscribe(data => {
        this.formData = data.map(x => ({
          productId: x.productId,
          productName: x.productName,
          price: x.price,
          stock: x.stock,
          remaining: x.remaining,
        }));
    }, err => {
      this.notificationSvc.message("Failed to load product data", "DISMISS");
    })
  }

  fetchConcernPersonData(){
    this.concernPersonSvc.getConcernPerson()
    .subscribe(data => {
      this.concernPerson = data;
    }, err => {
        this.notificationSvc.message("Failed to load concern person data", "DISMISS");
    });
  }

  fetchCompanyDataByConcernPerson(concernPersonId: number){
    this.concernPersonMapping = [];
    this.selectedCompany = 0;
    this.concernPersonSvc.getConcernCompanyMapping(concernPersonId)
      .subscribe(data => {
          this.concernPersonMapping = data;
        }, err => {
          this.notificationSvc.message("Failed to load company data", "DISMISS");
        });
  }

  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.salesService.checkTodayConcernPersonDistribution(this.model.concernPersonId).toPromise().then(
      x => {
        if(x === true){
          this.notificationSvc.message("এই ব্যাক্তির আজকের ডিস্ট্রিভিউসান নামানো হয়ে গেছে!!!", "DISMISS");
        }
        else{
          debugger
          if(this.model.concernPersonId == 0){
            this.notificationSvc.message("একটি ডিস্ট্রিভিউটর বাছাই করুন!!!", "DISMISS");
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
      }
    );
  }
  generatedistributeFormFields() {

    this.fields = [
      {
        type: 'product-repeat',
        fieldArray: {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'product flex-1 width-500',
              type: 'input',
              key: 'productName',
              props: {
                label: 'পণ্যের নাম',
                readonly: true
              }
            },
            {
              className: 'price flex-1 width-120',
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
              }
            },
            {
              className: 'price flex-1 width-80',
              type: 'input',
              key: 'stock',
              props: {
                label: 'স্টক',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly: true
              }
            },
            {
              className: 'receiveQuantity flex-1 width-100',
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
                  field.formControl?.valueChanges.subscribe(value =>{
                    const stock = field.form?.get('stock')?.value;
                    if (value > stock){
                      this.notificationSvc.message("আপনি স্টক অতিক্রম করেছেন!", "DISMISS");
                      field.formControl?.setErrors({ 'stock': true });
                    }
                  })
                }
              }
            },
            {
              className: 'returnQuantity flex-1 width-80',
              type: 'input',
              key: 'remaining',
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
              className: 'totalQuantity flex-1 width-100',
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
              className: 'salesQuantity flex-1 width-100',
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
                messages: { required: " " }
              },
              hooks:{
                onInit: (field: FormlyFieldConfig)=>{
                  const salesQuantityControl = field.formControl;
                  const totalQuantityControl = field.form?.get('totalQuantity');
            
                  if (salesQuantityControl && totalQuantityControl) {
                    salesQuantityControl.valueChanges.subscribe({
                      next: (value) => {
                        const totalQuantity = totalQuantityControl.value;
                        if (totalQuantity !== null && value !== null && totalQuantity < value) {
                          salesQuantityControl.setErrors({ 'invalidQuantity': true });
                        } else {
                          salesQuantityControl.setErrors(null);
                        }
                      }
                    });
                  }
                }
              }
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
          ]
        }
      }
    ]











    // this.fields = [
    //   {
    //     fieldGroupClassName: 'd-flex align-items-center',
    //       fieldGroup: [
    //       {
    //         className: 'concernPerson width-50-percent p-2',
    //         type: 'select',
    //         key: 'concernPersonId',
    //         templateOptions: {
    //           label: 'ডিস্ট্রিভিউটর',
    //           options: this.concernPersonSvc.getConcernPerson(),
    //           valueProp:'concernPersonId',
    //           labelProp:'concernPersonName'
    //         },
    //         validation:{
    //           messages: {
    //             required: " "
    //           }
    //         },
    //         hooks:{
    //           onInit:(field:FormlyFieldConfig)=>{
    //             field.form?.get('concernPersonId')
    //               ?.valueChanges.subscribe(value =>{
    //                 this.salesService.checkTodayConcernPersonDistribution(value).toPromise().then(
    //                   x => {
    //                     if(x === true){
    //                       this.notificationSvc.message("এই ব্যাক্তির আজকের ডিস্ট্রিভিউসান নামানো হয়ে গেছে!!", "DISMISS");
    //                     }
    //                   }
    //                 );
    //             })
    //           }
    //         }
    //       },
    //       {
    //         className: 'width-50-percent p-2',
    //         type: 'select',
    //         key: 'companyId',
    //         templateOptions: {
    //           label: 'কোম্পানি',
    //           options: [],
    //           valueProp:'companyId',
    //           labelProp:'companyName'
    //         },
    //         hooks:{
    //           onInit:(field: FormlyFieldConfig) => {
    //             field?.form?.get('concernPersonId')!
    //               .valueChanges.subscribe(value =>{
    //                 this.concernPersonSvc.getConcernCompanyMapping(value).subscribe(x => {
    //                   if (field.props?.options){
    //                         field.props.options = x;
    //                   }
    //                 });
    //             }
    //           )
    //           }
    //         }
    //       }
    //     ],  
    //   },
    //   {
    //     key: 'formData',
    //     className: 'width-50-percent',
    //     type: 'product-distribution',
    //     fieldArray: {
    //       fieldGroupClassName: 'display-flex',
    //       fieldGroup: [
    //         {
    //           className: 'product flex-1 width-500',
    //           type: 'select',
    //           key: 'productId',
    //           templateOptions: {
    //             label: 'পণ্যের নাম',
    //             options: [],
    //             valueProp:'productId',
    //             labelProp:'productName'
    //           },
    //           validation: {
    //             messages: { required: " " }
    //           },
    //           hooks: {
    //             onInit:(field:FormlyFieldConfig) => {
    //               this.productData = [];
    //               this.form.get('companyId')
    //                 ?.valueChanges.subscribe(value => {
    //                     const selectedProducts = this.formData.filter(a => a !== undefined).map(x => x.productId) as number[];
    //                     this.salesService.getProductByCompanyId(value).subscribe(x => {
    //                       x.filter(x => !selectedProducts.includes(x.productId!));
                          
    //                       if (field.props?.options){
    //                           field.props.options = x;
    //                       }
    //                     });
    //               })
    //             }
    //           },
    //           // hooks:{
    //           //   onChanges:(field:FormlyFieldConfig)=>{
    //           //     const updatedOptions = this.salesService.getProduct().pipe(
    //           //       tap(value=>value.filter(
    //           //         x=>this.model.formData.some(d=>d.productId !== x.productId)
    //           //       ))
    //           //     );
    //           //     console.log(updatedOptions);
    //           //     // field.model.productId=updatedOptions;
    //           //     // console.log(updatedOptions)
                
    //           //   }
    //           // }
    //         },
    //         {
    //           className: 'price flex-1 width-120',
    //           type: 'input',
    //           key: 'price',
    //           props: {
    //             label: 'মূল্য',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             hideRequiredMarker: true,
    //             readonly: true
    //           },
    //           validation: {
    //             messages: { required: " " }
    //           },
    //           hooks: {
    //             onInit: (field: FormlyFieldConfig) => {
    //               field.form?.get('productId')
    //                 ?.valueChanges.subscribe(value => {
    //                   this.salesService.getPrice(value)
    //                     .subscribe(r => {
    //                       field.formControl?.setValue(r.price);                          
    //                     }, err => {
    //                       this.notificationSvc.message("Failed to load price", "DISMISS");
    //                     })
    //                   })
    //               }
    //             }
    //         },
    //         {
    //           className: 'receiveQuantity flex-1 width-120',
    //           type: 'input',
    //           key: 'receiveQuantity',
    //           props: {
    //             label: 'গ্রহণ',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             hideRequiredMarker: true
    //           },
    //           validation: {
    //             messages: { required: "Rececive Quantity required" }
    //           },
    //           hooks:{
    //             onInit:(field:FormlyFieldConfig)=>{
    //               field.formControl?.setValue(0);
    //             }
    //           }
    //         },
    //         {
    //           className: 'returnQuantity flex-1 width-120',
    //           type: 'input',
    //           key: 'returnQuantity',
    //           props: {
    //             label: 'অবশিষ্ট',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             hideRequiredMarker: true,
    //             readonly:true
    //           },
    //           validation: {
    //             messages: { required: " " }
    //           },
    //           hooks: {
    //             onInit: (field: FormlyFieldConfig) => {
    //                 field.form?.get('productId')?.valueChanges
    //                 .subscribe((value: number)=>{
    //                     this.salesService.getRemaining(value,this.model.concernPersonId)
    //                       .subscribe(r => {
    //                         field.formControl?.setValue(r);                     
    //                       }, err => {
    //                         this.notificationSvc.message("Failed to load remaining", "DISMISS");
    //                       })
    //                     }
    //                 )}
                                
    //             }
    //         },
    //         {
    //           className: 'totalQuantity flex-1 width-140',
    //           type: 'input',
    //           key: 'totalQuantity',
    //           props: {
    //             label: 'মোট',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             hideRequiredMarker: true,
    //             readonly:true
    //           },
    //           validation: {
    //             messages: { required: " " }
    //           },
    //           hooks:{
    //             onInit:(field:FormlyFieldConfig)=>{
    //               field.form?.get('receiveQuantity')?.valueChanges.subscribe({
    //                 next:(value)=>{
    //                   const receiveQ = +value;
    //                   const returnQ=(field.form?.get('returnQuantity')?.value || 0)
    //                   field.formControl?.setValue(receiveQ + returnQ);
    //                 }
    //               });
    //               field.form?.get('returnQuantity')?.valueChanges.subscribe({
    //                 next:(value)=>{
    //                   const returnQ= +value;
    //                   const receiveQ=(field.form?.get('receiveQuantity')?.value || 0)
    //                   field.formControl?.setValue(receiveQ+returnQ);
    //                 }
    //               })
    //             }
    //           }
    //         },
    //         {
    //           className: 'salesQuantity flex-1 width-160',
    //           type: 'input',
    //           key: 'salesQuantity',
    //           props: {
    //             label: 'বিক্রি',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             hideRequiredMarker: true,
    //             required:true
    //           },
    //           validation: {
    //             messages: { required: "Sales quantity required" }
    //           },
    //           hooks:{
    //             onInit: (field: FormlyFieldConfig)=>{
    //               const salesQuantityControl = field.formControl;
    //               const totalQuantityControl = field.form?.get('totalQuantity');
            
    //               if (salesQuantityControl && totalQuantityControl) {
    //                 salesQuantityControl.valueChanges.subscribe({
    //                   next: (value) => {
    //                     const totalQuantity = totalQuantityControl.value;
    //                     if (totalQuantity !== null && value !== null && totalQuantity < value) {
    //                       salesQuantityControl.setErrors({ 'invalidQuantity': true });
    //                     } else {
    //                       salesQuantityControl.setErrors(null);
    //                     }
    //                   }
    //                 });
    //               }
    //             }
    //           }
    //         },
    //         {
    //           className: 'totalSalesPrice flex-1 width-160',
    //           type: 'input',
    //           key: 'totalSalesPrice',
    //           props: {
    //             label: 'মোট বিক্রিত মূল্য',
    //             floatLabel: 'always',
    //             appearance: 'outline',
    //             readonly: true,
    //             hideRequiredMarker: true,
    //           },
    //           validation: {
    //             messages: { required: " " }
    //           },
    //           hooks: {
    //             onInit: (field: FormlyFieldConfig) => {
    //               field.form?.get('price')?.valueChanges.subscribe({
    //                 next: (value) => {
    //                   const price = value;
    //                   const salesQ=(field.form?.get('salesQuantity')?.value || 0)
    //                   field.formControl?.setValue(price * salesQ );
    //                 }
    //               });
            
    //               field.form?.get('salesQuantity')?.valueChanges.subscribe({
    //                 next: (value) => {
    //                   const salesQ = value;
    //                   const price=(field.form?.get('price')?.value || 0)
    //                   field.formControl?.setValue( price * salesQ);
    //                 }
    //               });
    //             }
    //           }
    //         }
    //       ],
    //     }
    //   }
    // ]
  }

}
