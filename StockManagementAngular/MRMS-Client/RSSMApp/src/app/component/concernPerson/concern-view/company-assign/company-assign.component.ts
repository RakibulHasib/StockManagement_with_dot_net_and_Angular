import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/component/shared/confirm-dialog/confirm-dialog.component';
import { Company } from 'src/app/models/company/company';
import { ConcernPerson, ConcernPersonMapping } from 'src/app/models/concernPerson/concern-person';
import { CompanyService } from 'src/app/service/Company/company.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';

@Component({
  selector: 'app-company-assign',
  templateUrl: './company-assign.component.html',
  styleUrls: ['./company-assign.component.css']
})
export class CompanyAssignComponent implements OnInit {
  concernPersonData!: ConcernPerson;
  concernPersonMapping: ConcernPersonMapping[] = [];
  companiesData: Company[]=[];
  companyId: any = null;
  constructor(
    public _activeModal: NgbActiveModal,
    private _cpService: ConcernPersonService,
    private _modal: NgbModal,
    private companyDataSvc: CompanyService,
    private _notificationSVC: NotificationService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getConcernCompanyMapping();
  }

  getConcernCompanyMapping(){
    this._cpService.getConcernCompanyMapping(this.concernPersonData.concernPersonId).subscribe(
      (res) => {
        this.concernPersonMapping = res;
      }
    )
  }

  getCompany(){
    this.companyDataSvc.getCompany()
    .subscribe(res => {
      const assignIds = this.concernPersonMapping.map(x => x.companyId);
      this.companiesData = res.filter(x => !assignIds.includes(x.companyId))
    });
  }

  onCreate(modalRef: any) {
    this.getCompany();
    const ModalRef = this._modal.open(modalRef, {
      centered: true
    })
    ModalRef.dismissed.subscribe(
      result => {
        this.companyId = null;
      }
    )
  }

  onCreateClose(modalRef: NgbActiveModal){
    const data = {
      concernPersonId: this.concernPersonData.concernPersonId,
      companyId: this.companyId
    }
    this._cpService.insertConcernCompanyMapping(data).subscribe(
      (res) => {
        this._notificationSVC.message("Successfully saved data", "DISMISS");
        modalRef.dismiss();
        this.companyId = null;
        this.getConcernCompanyMapping();
      },
      (err) => {
        this._notificationSVC.message("Failed to save!!!", "DISMISS");
      }
    );
  }

  confirmDelete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '400ms'
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          this._cpService.deleteConcernCompanyMapping(id)
            .subscribe({
              next: r => {
                this._notificationSVC.message('Deleted Successfully', 'DISMISS');
                this.getConcernCompanyMapping();
              },
              error: err => {
                this._notificationSVC.message('Failed to delete data', 'DISMISS');
                throwError(() => err);
              }
            })
        }
      })
  }

}
