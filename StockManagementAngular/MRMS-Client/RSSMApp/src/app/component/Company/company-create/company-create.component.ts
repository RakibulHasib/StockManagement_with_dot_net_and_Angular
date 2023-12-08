import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Company } from 'src/app/models/company/company';
import { CompanyService } from 'src/app/service/Company/company.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  currentDate: Date = new Date();
  companyForm:FormGroup=new FormGroup({});
  companyData:Company=new Company;

  model = {
    companyData: this.companyData
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationSvc: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private ref:MatDialogRef<CompanyCreateComponent>,
  ) { 
    this.generateFormFields();
  }
 

  getCompanyRoute(): string {
    return `/companyview`;
  }
  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.companyService.insert(this.companyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.closeModal();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/companyview']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }
  
  ngOnInit(): void {
    this.generateFormFields();
  }
  onSubmit() {
    
    this.formSubmit.emit(this.companyData);
  }
  closeModal(){
    this.ref.close();
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
            key: 'companyname',
            props: {
              label: 'Company Name',
              appearance: 'outline',
              floatLabel: 'always',
              hideRequiredMarker: true,
            },
            validation: {
              messages: { required: " " }
            }
          },
          
        ],

      }
    ]
  }
}
