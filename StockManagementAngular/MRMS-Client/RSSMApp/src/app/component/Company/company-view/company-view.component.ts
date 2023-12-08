import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor
  (
    private companyDataSvc: CompanyService,
    private _notifitions:NotificationService,
    private _dialog: MatDialog,
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
    //this.fetchCompanyList();
  }

  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCompanyDialog(){
    const dialogRef = this._dialog.open(CompanyCreateComponent,{
      data:{
        
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleFormSubmit(result);
      }
    });
   
  }

 
  handleFormSubmit(formData: Company): void {
  
    console.log('Form submitted in CompanyViewComponent with data:', formData.companyName);
    
  
  }

  


  // fetchCompanyList(): void {
  //   this.companyDataSvc.getCompany().subscribe(
  //     (data) => {
  //       this.companiesData = data;
  //       this.dataSource.data = this.companiesData;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     (err) => {
  //       this._notifitions.message("Failed to load data", "DISMISS");
  //     }
  //   );
  // }

 
  
}
