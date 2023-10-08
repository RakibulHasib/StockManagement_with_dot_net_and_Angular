import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SavoyReportModel } from '../../../models/Savoy/savoy-report';
import { SavoyService } from '../../../services/Savoy/savoy.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-savoy-report',
  templateUrl: './savoy-report.component.html',
  styleUrls: ['./savoy-report.component.css']
})

export class SavoyReportComponent implements OnInit {
  [x: string]: any;
  public get dialog(): MatDialog {
    return this._dialog;
  }
  public set dialog(value: MatDialog) {
    this._dialog = value;
  }
  public get notificationSvc(): NotificationService {
    return this._notificationSvc;
  }
  public set notificationSvc(value: NotificationService) {
    this._notificationSvc = value;
  }
  savoyReportData: SavoyReportModel[] = [];

  constructor(
    private reportDataSvc: SavoyService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    let savoyIceCreamMasterID: number = this.activatedRoute.snapshot.params['id'];
    console.log(savoyIceCreamMasterID);
    this.fetchReportData(savoyIceCreamMasterID);
  }


  fetchReportData(savoyIceCreamMasterID: number) {
    console.log(savoyIceCreamMasterID);
    if (savoyIceCreamMasterID) {
      this.reportDataSvc.getSavoyReportData(savoyIceCreamMasterID)
        .subscribe(data => {
          console.log(data);
          this.savoyReportData = data;
          console.log('Received data:', data);
        }, err => {
          this.notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this.notificationSvc.message("Data Not Found", "DISMISS");
    }
  }


  //title = 'html-to-pdf-angular-application';
  //public convetToPDF() {
  //  var data = document.getElementById('contentToConvert');
  //  html2canvas(data).then(canvas => {
  //    // Few necessary setting options
  //    var imgWidth = 208;
  //    var pageHeight = 295;
  //    var imgHeight = canvas.height * imgWidth / canvas.width;
  //    var heightLeft = imgHeight;

  //    const contentDataURL = canvas.toDataURL('image/png')
  //    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //    var position = 0;
  //    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //    pdf.save('new-file.pdf'); // Generated PDF
  //  });
  //}

}

