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
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { CompanyUpdateComponent } from '../company-update/company-update.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription } from 'rxjs';

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

  createOrUpdateCompany : any;

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
    private _dialog: MatDialog,
    private _modal: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ){}
  
  ngOnInit(){
    this.companyDataSvc.getCompany()
    .subscribe(data=>{
      this.companiesData=data;
      this.dataSource.data=this.companiesData;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },err=>{
      this._notifitions.message("Failed to load data", "DISMISS");
    })
    
  
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  openCompanyDeleteDialog(companyId:number){
    const companyToDelete = this.companiesData.find(x => x.companyId == companyId);
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: companyToDelete
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
 
  handleFormSubmit(formData: Company): void {
    console.log('Form submitted in CompanyViewComponent with data:', formData.companyName);
  }

  onCreate(template: TemplateRef<any>) {
    this.generateFormFields();
    this.createOrUpdateCompany= {
      companyName: null
    };
    this.modalRef = this._modal.open(template);
    console.log("companyData in create:", this.companyData);
  }


  insert(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
    
    this.subscription.add(this.companyDataSvc.insert(this.companyData)
      .subscribe(r => {
        this._notifitions.message("Data saved successfully!!!", "DISMISS");
        this._modal.dismissAll();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.form.reset();
      }, err => {
        this._notifitions.message("Failed to save data!!!", "DISMISS");
      }))
  }

  update(): void {
    if (this.form.invalid) {
      console.log("invalid submission");
      return;
    }
   
    this.subscription.add(this.companyDataSvc.update(this.companyData)
    .subscribe(r => {
      const companyIndex = this.companiesData.findIndex(c => c.companyId === r.companyId);
      if (companyIndex !== -1) {
        this.companiesData[companyIndex] = r;
      }
      this._notifitions.message("Data update successfully!!!", "DISMISS");
       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       this.router.onSameUrlNavigation = 'reload';
       this.router.navigate(['/companyview']);
       this.form.reset();
    }, err => {
      this._notifitions.message("Failed to save data!!!", "DISMISS");
    }));
  }


  onEdit(template: TemplateRef<any>, item: Company) {
    this.companyData = Object.assign({}, item);
    this.model.companyData=this.companyData;
    this.generateFormFields();
    this.modalRef = this._modal.open(template);
    console.log("companyData in onEdit:", this.companyData); 
  }

  closeModal() {
    this.modalRef.close(); 
    this.companyData = new Company
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

  ngOnDestroy() {
    this.subscription.unsubscribe(); 
  }
}
 
  

