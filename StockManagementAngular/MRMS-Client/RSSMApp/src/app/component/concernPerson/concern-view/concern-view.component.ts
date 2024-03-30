import { ConcernPersonService } from './../../../services/concernPerson/concern-person.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcernPerson } from 'src/app/models/concernPerson/concern-person';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Subscription, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concern-view',
  templateUrl: './concern-view.component.html',
  styleUrls: ['./concern-view.component.css']
})
export class ConcernViewComponent {

  concernPersondata:ConcernPerson[]=[];
  dataSource: MatTableDataSource<ConcernPerson>= new MatTableDataSource(this.concernPersondata);
  @ViewChild(MatSort,{static:false}) sort!:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator!:MatPaginator;
  columnList: string[]=["concernpersonName","actions"]

  currentDate: Date = new Date();
  Form: FormGroup = new FormGroup({});
  concernpersonData: ConcernPerson = new ConcernPerson;

  model = {
    concernpersonData: this.concernpersonData
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  modalRef: any;
  private subscription: Subscription = new Subscription(); 

 

  constructor(
    private concernPersonDataSvc: ConcernPersonService,
    private _notifitions:NotificationService,
    private router: Router,
    private _modal: NgbModal,
  ){}

  ngOnInit(){
    this.getConcernPerson();
  }
 getConcernPerson(){
  this.concernPersonDataSvc.getConcernPerson()
    .subscribe(data=>{
      this.concernPersondata=data;
      this.dataSource.data=this.concernPersondata;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load data.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    })

 }
 
  handleFormSubmit(formData: ConcernPerson): void {
  
    console.log('Form submitted in CompanyViewComponent with data:', formData.concernPersonName);
    
  
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save data.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });

      return;
    }
    this.model.concernpersonData = new ConcernPerson;
    console.log("BeforeConsentPersonData",this.concernpersonData);
    this.subscription.add(this.concernPersonDataSvc.insert(this.concernpersonData)
    .subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data saved successfully.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/concernpersonview']);
      this._modal.dismissAll();
      console.log("InsertData",r);
      console.log("ConsentPersonData",this.concernpersonData);
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to save data.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }))
  }
  
 
  // onSubmit() {
    
  //   this.formSubmit.emit(this.concernpersonData);
  // }

  onCreate(template: TemplateRef<any>) {
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  update(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
      return;
    }
   
    this.subscription.add(this.concernPersonDataSvc.update(this.concernpersonData)
    .subscribe(r => {
      const concernPersonIndex = this.concernPersondata.findIndex(c => c.concernPersonId === r.concernPersonId);
      if (concernPersonIndex !== -1) {
        this.concernPersondata[concernPersonIndex] = r;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data update successfully.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/concernpersonview']);
       this.form.reset();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }));
  }

  onEdit(template: TemplateRef<any>, item: ConcernPerson) {
    this.concernpersonData = Object.assign({}, item);
    this.model.concernpersonData=this.concernpersonData;
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }


  closeModal(modalRef: NgbActiveModal) {
    this.form.reset(); 
    modalRef.dismiss();
    this.model.concernpersonData = new ConcernPerson;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/concernpersonview']);
    
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
              label: 'ব্যক্তির নাম',
              appearance: 'outline',
              floatLabel: 'always',
              required:true
            },
            validation: {
              messages: { required: " " }
            }
          },
          
        ],

      }
    ]
  }

  showConfirmationAlert(concernPersonId: number,data:any) {
    Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
     // text: " অনুগ্রহ করে নিশ্চিত করুন এই কোম্পানির আর প্রয়োজন নেই ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText:'বাতিল করুন',
      confirmButtonText: 'হ্যাঁ, এটা ডিলিট করুন!',
      focusCancel:true,
      focusConfirm:false,
      position:"top"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(this.concernPersonDataSvc.delete(concernPersonId,data).subscribe(r=>{
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Your file has been deleted.',
            timer: 2000,
            showConfirmButton: false,
            width: 400,
            position: "top",
          });
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/concernpersonview']);
         
        }));
      }
      if(result.isDismissed){
        Swal.fire({
          icon: 'warning',
          title: 'Warn!',
          text: 'Your data is safe :)',
          timer: 2000,
          showConfirmButton: false,
          width: 400,
          position: "top",
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }


}
