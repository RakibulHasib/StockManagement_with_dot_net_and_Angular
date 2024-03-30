import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company/company';
import { CompanyService } from 'src/app/service/Company/company.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { StateService } from 'src/app/services/Shared/state.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.css']
})
export class CompanyViewComponent   {

  companiesData: Company[]=[];
  dataSource: MatTableDataSource<Company>= new MatTableDataSource(this.companiesData);
  @ViewChild(MatSort,{static:false}) sort!:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator!:MatPaginator;
  columnList: string[]=["companyName","actions"]


  currentDate: Date = new Date();
  companyForm:FormGroup = new FormGroup({});
  companyData:Company = new Company;

  model = {
    companyData: this.companyData
  }
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  modalRef: any;
  private subscription: Subscription = new Subscription(); 

  constructor
  (
    private companyDataSvc: CompanyService,
    private _notifitions:NotificationService,
    private _modal: NgbModal,
    private router: Router

  ){}
  
  ngOnInit(){
    this.getItems();
  }

  getItems(){
    this.companyDataSvc.getCompany()
    .subscribe(data=>{
      this.companiesData=data;
      this.dataSource.data=this.companiesData;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to load data.',
        timer: 2000 ,
        showConfirmButton: false,
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
 
  handleFormSubmit(formData: Company): void {
    console.log('Form submitted in CompanyViewComponent with data:', formData.companyName);
  }

  onCreate(template: TemplateRef<any>) {
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
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
    
    this.subscription.add(this.companyDataSvc.insert(this.companyData)
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
        this.form.reset();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/companyview']);
        this._modal.dismissAll();
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
   
    this.subscription.add(this.companyDataSvc.update(this.companyData)
    .subscribe(r => {
      const companyIndex = this.companiesData.findIndex(c => c.companyId === r.companyId);
      if (companyIndex !== -1) {
        this.companiesData[companyIndex] = r;
      }
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data update successfully.',
        timer: 2000 ,
        showConfirmButton: false,
        width: 400,
        position: "top",
        customClass: {
          container: 'swal-top'
        }
      });
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/companyview']);
       this.form.reset();
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update data.',
        timer: 2000,
        showConfirmButton: false,
        width: 400,
        position: "top",
      });
    }));
  }


  onEdit(template: TemplateRef<any>, item: Company) {
    this.companyData = Object.assign({}, item);
    this.model.companyData=this.companyData;
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
  }

  closeModal(modalRef: NgbActiveModal) {
    this.form.reset(); 
    modalRef.dismiss();
    this.model.companyData = new Company;
    
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
              label: 'কোম্পানি নাম',
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

  showConfirmationAlert(companyId: number,data:any) {
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
        this.subscription.add(this.companyDataSvc.delete(companyId,data).subscribe(r=>{
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
          this.router.navigate(['/companyview']);
         
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
 
  

