import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Product } from '../../../models/Product/product';
import { SalesDistribution } from '../../../models/sales/sales-distribution';
import { SalesDistributionService } from '../../../services/sales/sales-distribution.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';
import { ConcernPerson, ConcernPersonMapping } from 'src/app/models/concernPerson/concern-person';
import { Company } from 'src/app/models/company/company';
import { DateFormat } from 'src/app/Shared/date-fromat.model';
import { DailyDistributeStatus } from 'src/app/models/Enum/DailyDistributeStatus.enum';

@Component({
  selector: 'app-distribution-create',
  templateUrl: './distribution-create.component.html',
  styleUrls: ['./distribution-create.component.css'],
})
export class DistributionCreateComponent implements OnInit {
  companies: Company[] = [];
  concernPerson: ConcernPerson[] = [];
  concernPersonMapping: ConcernPersonMapping[] = [];
  selectedConcernPerson: number = 0;
  selectedCompany: number = 0;
  currentDate: Date = new Date();
  distrbuteDate: Date | null = null;

  formData: SalesDistribution[] = [];
  productData: Product[] = [];
  templateOptions: any = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  minDate: Date | null = null;
  maxDate: Date | null = null;

  isLoading = false;

  constructor(
    private notificationSvc: NotificationService,
    private salesService: SalesDistributionService,
    private activatedRoute: ActivatedRoute,
    private concernPersonSvc: ConcernPersonService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const concernPersonId: number = +params['concernPerson'] || 0;
      const companyId: number = +params['company'] || 0;

      if (concernPersonId && concernPersonId > 0) {
        this.fetchConcernPersonData();
        this.selectedConcernPerson = concernPersonId;
        this.fetchCompanyDataByConcernPerson(concernPersonId);

        if (companyId && companyId > 0) {
          this.selectedCompany = companyId;
          this.loadDistributeAvailability();
        }
      } else {
        this.fetchConcernPersonData();
      }
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  resetDistributionDate(): void {
    this.minDate = null;
    this.maxDate = null;
    this.distrbuteDate = null;
  }

  onConcernPersonDropdownSelectionChange(selectedConcernPerson: number) {
    this.formData = [];
    this.resetDistributionDate();

    this.selectedConcernPerson = selectedConcernPerson;
    this.fetchCompanyDataByConcernPerson(selectedConcernPerson);
  }

  onCompanyDropdownSelectionChange(): void {
    this.formData = [];
    this.resetDistributionDate();

    this.loadDistributeAvailability();
  }

  loadDistributeAvailability(): void {
    this.salesService
      .GetDistributeAvailabilty(
        this.selectedConcernPerson,
        this.selectedCompany
      )
      .subscribe(
        (data) => {
          if (data) {
            this.maxDate = new Date(data.today);
            if (data?.lastDistribute) {
              if (data?.lastDistribute?.lastDistributeStatus === DailyDistributeStatus.Created) {
                this.notificationSvc.message(
                  'Please create stock before make a distribution',
                  'DISMISS',
                  10000
                );
              } else if (data?.lastDistribute?.lastDistributeStatus === DailyDistributeStatus.StockComplete) {
                // check if last distribute is today
                const isDistributedToday = new DateFormat().areDatesEqual(new Date(data.today), new Date(data?.lastDistribute?.lastDistributeDay));
                if (isDistributedToday){
                  this.minDate = null;
                  this.maxDate = null;
                  return;
                }
                this.minDate = new Date(
                  data?.lastDistribute?.lastDistributeDay
                );
                this.minDate.setDate(this.minDate.getDate() + 1);
                this.loadProductData();
              }
            } else {
              this.maxDate = new Date(data.today);
              this.minDate = new Date(data.today);
              this.loadProductData();
            }
          }
        },
        (err) => {
          this.notificationSvc.message(
            'Failed to fetch availbility',
            'DISMISS'
          );
        }
      );
  }

  loadProductData() {
    this.generatedistributeFormFields();
    this.salesService
      .GetProductInfoByCompany(
        this.selectedCompany
      )
      .subscribe(
        (data) => {
          this.formData = data.map((x) => ({
            productId: x.productId,
            productName: x.productName,
            price: x.price,
            stock: x.stock,
            receiveQuantity: 0,
            salesQuantity: 0,
          }));

          if (this.formData.length === 0) this.resetDistributionDate();
        },
        (err) => {
          this.notificationSvc.message(
            'Failed to load product data',
            'DISMISS'
          );
        }
      );
  }

  fetchConcernPersonData() {
    this.concernPersonSvc.getConcernPerson().subscribe(
      (data) => {
        this.concernPerson = data;
      },
      (err) => {
        this.notificationSvc.message(
          'Failed to load concern person data',
          'DISMISS'
        );
      }
    );
  }

  fetchCompanyDataByConcernPerson(concernPersonId: number) {
    this.concernPersonMapping = [];
    this.selectedCompany = 0;
    this.concernPersonSvc.getConcernCompanyMapping(concernPersonId).subscribe(
      (data) => {
        this.concernPersonMapping = data;
      },
      (err) => {
        this.notificationSvc.message('Failed to load company data', 'DISMISS');
      }
    );
  }

  insert(): void {
    if (this.form.invalid) {
      this.notificationSvc.message('Please fill up data before submit', 'DISMISS');
      return;
    }
    if (this.distrbuteDate === null) {
      this.notificationSvc.message('Please select distribute date', 'DISMISS');
      return;
    }

    this.distrbuteDate = new Date(
      this.distrbuteDate.toDateString() + ' ' + new Date().toLocaleTimeString()
    );

    const formatDate = new DateFormat();
    const distrbuteDate = formatDate.formatDateWithTime(
      new Date(this.distrbuteDate)
    );

    this.formData = this.formData.map((x) => ({
      ...x,
      returnQuantity: x.remaining = x.remaining ?? 0,
      receiveQuantity: x.receiveQuantity = x.receiveQuantity ?? 0,
      salesQuantity: x.salesQuantity = x.salesQuantity ?? 0,
    }));

    const data = this.formData.filter(
      (x) => (x.receiveQuantity !== 0 || x.salesQuantity !== 0)
    );

    if (data.length === 0) {
      this.notificationSvc.message(
        'Please fill-up receive or sell quantity',
        'DISMISS'
      );
      return;
    }

    this.isLoading = true;

    this.salesService
      .insert({
        concernPersonId: this.selectedConcernPerson,
        distributionTime: distrbuteDate,
        companyId: this.selectedCompany,
        salesDistribute: data,
      })
      .subscribe(
        (r) => {
          this.notificationSvc.message('Successfully distributed.', 'DISMISS');
          this.onConcernPersonDropdownSelectionChange(this.selectedConcernPerson);
          this.isLoading = false;
        },
        (err) => {
          this.notificationSvc.message('Failed to save data!!!', 'DISMISS');
          this.isLoading = false;
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
                readonly: true,
              },
            },
            {
              className: 'price mdc-hide-focus-outline flex-1 width-120',
              type: 'input',
              key: 'price',
              props: {
                label: 'মূল্য',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly: true,
              },
              validation: {
                messages: { required: ' ' },
              },
            },
            {
              className: 'price mdc-hide-focus-outline flex-1 width-80',
              type: 'input',
              key: 'stock',
              props: {
                label: 'স্টক',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly: true,
              },
            },
            {
              className: 'receiveQuantity flex-1 width-100',
              type: 'input',
              key: 'receiveQuantity',
              props: {
                type: 'number',
                label: 'গ্রহণ',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: 'Rececive Quantity required' },
              },
              expressions: {
                'templateOptions.onChange': (field: FormlyFieldConfig) => {
                  const stockQ = field.form?.get('stock')?.value || 0;
                  if (field.formControl?.value > stockQ) {
                    this.notificationSvc.message(
                      'আপনি স্টক অতিক্রম করেছেন!',
                      'DISMISS'
                    );
                    field.formControl?.setErrors({
                      invalidQuantity: true,
                    });
                  } else {
                    field.formControl?.setErrors(null);
                  }
                },
              },
            },
            {
              className:
                'totalQuantity mdc-hide-focus-outline flex-1 width-100',
              type: 'input',
              key: 'totalQuantity',
              props: {
                label: 'মোট',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                readonly: true,
              },
              expressions: {
                'templateOptions.onChange': (field: FormlyFieldConfig) => {
                  const receiveQ =
                    field.form?.get('receiveQuantity')?.value || 0;
                  const remainQ = field.form?.get('remaining')?.value || 0;
                  field.formControl?.setValue(
                    parseInt(receiveQ) + parseInt(remainQ)
                  );
                },
              },
            },
            {
              className: 'salesQuantity flex-1 width-100',
              type: 'input',
              key: 'salesQuantity',
              props: {
                type: 'number',
                label: 'বিক্রি',
                floatLabel: 'always',
                appearance: 'outline',
                hideRequiredMarker: true,
                required: true,
              },
              validation: {
                messages: { required: ' ' },
              },
              expressions: {
                'templateOptions.onChange': (field: FormlyFieldConfig) => {
                  const totalQ = field.form?.get('totalQuantity')?.value || 0;
                  if (field.formControl?.value > totalQ) {
                    this.notificationSvc.message(
                      'মোট পরিমাণের চেয়ে বিক্রয়ের পরিমাণ বেশি!',
                      'DISMISS'
                    );
                    field.formControl?.setErrors({
                      invalidQuantity: true,
                    });
                  } else {
                    field.formControl?.setErrors(null);
                  }
                },
              },
            },
            {
              className:
                'totalSalesPrice mdc-hide-focus-outline flex-1 width-160',
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
                messages: { required: ' ' },
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.form?.get('price')?.valueChanges.subscribe({
                    next: (value) => {
                      const price = value;
                      const salesQ =
                        field.form?.get('salesQuantity')?.value || 0;
                      field.formControl?.setValue(price * salesQ);
                    },
                  });

                  field.form?.get('salesQuantity')?.valueChanges.subscribe({
                    next: (value) => {
                      const salesQ = value;
                      const price = field.form?.get('price')?.value || 0;
                      field.formControl?.setValue(price * salesQ);
                    },
                  });
                },
              },
            },
          ],
        },
      },
    ];

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
