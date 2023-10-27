import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../models/Product/product';
import { SalesDistribution } from '../../../models/sales/sales-distribution';
import { SalesDistributionService } from '../../../services/sales/sales-distribution.service';
import { NotificationService } from '../../../services/Shared/notification.service';

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
        className: 'concernPerson width-80',
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
                options: this.salesService.getProduct(),
                valueProp:'productId',
                labelProp:'productName'
              },

              validation: {
                messages: { required: " " }
              }
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
              },
              validation: {
                messages: { required: " " }
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
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
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
                hideRequiredMarker: true,
              },
              validation: {
                messages: { required: " " }
              }
            }
          ],
        }
      }
    ]
  }

}
