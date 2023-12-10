import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ConcernPerson } from 'src/app/models/concernPerson/concern-person';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';

@Component({
  selector: 'app-concern-create',
  templateUrl: './concern-create.component.html',
  styleUrls: ['./concern-create.component.css']
})
export class ConcernCreateComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  currentDate: Date = new Date();
  companyForm:FormGroup=new FormGroup({});
  concernpersonData:ConcernPerson=new ConcernPerson;

  model = {
    concernpersonData: this.concernpersonData
  }

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationSvc: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private concernPersonService: ConcernPersonService,
    private ref:MatDialogRef<ConcernPerson>,
  ){
    this.generateFormFields();
  }

  // getConcernPersonRoute() {
  //   this.router.navigate(['/concernpersonview']);
  // }

  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    this.concernPersonService.insert(this.concernpersonData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS")
        this.closeModal();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/concernpersonview']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }
  
  ngOnInit(): void {
    this.generateFormFields();
  }
  onSubmit() {
    
    this.formSubmit.emit(this.concernpersonData);
  }
  closeModal(){
    this.ref.close();
  }
  
  
  generateFormFields() {
    this.fields = [
      {
        fieldGroupClassName: 'display-flex',
        key: 'concernpersonData',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'concernPersonName',
            props: {
              label: 'Person Name',
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
