import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company/company';
import { CompanyService } from 'src/app/service/Company/company.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.css']
})
export class CompanyUpdateComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  currentDate: Date = new Date();
  companyForm: FormGroup=new FormGroup({});
  companyData: Company=new Company;

  model = {
    companyData: this.companyData
  };
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];
  private subscription: Subscription = new Subscription(); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationSvc: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private ref:MatDialogRef<CompanyUpdateComponent>,
  ) { 
    this.companyData=this.data
  }

  getCompanyRoute(): string {
    return `/companyview`;
  }
  update(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.subscription.add(this.companyService.update(this.companyData)
    .subscribe(r => {
      this.notificationSvc.message("Data update successfully!!!", "DISMISS");
      this.closeModal();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/companyview']);
    }, err => {
      this.notificationSvc.message("Failed to save data!!!", "DISMISS");
    }))
  }
  
  ngOnInit(): void {
    this.model.companyData = this.companyData;
    this.generateFormFields();
  }

  onSubmit() {
    this.formSubmit.emit(this.companyData);
  }
  closeModal(){
    this.ref.close();
    this.form.reset();
  }
  
  generateFormFields() {
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        key: 'companyData',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'companyName',
            props: {
              label: 'Company Name',
              appearance: 'outline',
              floatLabel: 'always',
              required:true,
              minLength: 3
            },
            validation: {
              messages: { required: "Need to add Company Name " }
            }
          },
          
        ],

      }
    ]
  }
  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
  
}
