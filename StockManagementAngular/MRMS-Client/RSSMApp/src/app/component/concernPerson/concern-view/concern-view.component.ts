import { ConcernPersonService } from './../../../services/concernPerson/concern-person.service';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcernPerson } from 'src/app/models/concernPerson/concern-person';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConcernCreateComponent } from '../concern-create/concern-create.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { throwError } from 'rxjs';

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

  constructor(
    private concernPersonDataSvc: ConcernPersonService,
    private _notifitions:NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    this.concernPersonDataSvc.getConcernPerson()
    .subscribe(data=>{
      this.concernPersondata=data;
      this.dataSource.data=this.concernPersondata;
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

  confirmDelete(concernPersonId: any) {
    //console.log(data);
    this._dialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '400ms'
    }).afterClosed()
      .subscribe(result => {
        console.log(result);
        if (result) {
          this.concernPersonDataSvc.delete(concernPersonId)
            .subscribe({
              next: r => {
                this._notifitions.message('Concern Person removed from the list', 'DISMISS');
                 this.dataSource.data = this.dataSource.data.filter(c => c.concernPersonId != concernPersonId);
              },
              error: err => {
                this._notifitions.message('Failed to delete data', 'DISMISS');
                throwError(() => err);
              }
            })
        }
      })
  }

  // openCompanyDialog(){
  //   const dialogRef = this._dialog.open(ConcernCreateComponent,{
  //     data:{
        
  //     }
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.handleFormSubmit(result);
  //     }
  //   });
   
  // }

 
  // handleFormSubmit(formData: ConcernPerson): void {
  
  //   console.log('Form submitted in CompanyViewComponent with data:', formData.concernPersonName);
    
  
  // }


}
