import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConcernPerson, ConcernPersonMapping } from 'src/app/models/concernPerson/concern-person';
import { ConcernPersonService } from 'src/app/services/concernPerson/concern-person.service';

@Component({
  selector: 'app-company-assign',
  templateUrl: './company-assign.component.html',
  styleUrls: ['./company-assign.component.css']
})
export class CompanyAssignComponent implements OnInit {
  concernPersonData!: ConcernPerson;
  concernPersonMapping: ConcernPersonMapping[] = [];
  companyIds: any = [];
  constructor(
    public _activeModal: NgbActiveModal,
    private _cpService: ConcernPersonService,
    private _modal: NgbModal
  ) { }

  ngOnInit() {
    this.getConcernCompanyMapping();
  }

  getConcernCompanyMapping(){
    this._cpService.getConcernCompanyMapping(this.concernPersonData.concernPersonId).subscribe(
      (res) => {
        this.concernPersonMapping = res;
      },
      (err) => {
        console.log(err)
      }
    )
  }

  onCreate(modalRef: any) {
    this._modal.open(modalRef)
  }

}
