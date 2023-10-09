import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SavoyReportModel } from '../../../models/Savoy/savoy-report';
import { SavoyService } from '../../../services/Savoy/savoy.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';



@Component({
  selector: 'app-savoy-report',
  templateUrl: './savoy-report.component.html',
  styleUrls: ['./savoy-report.component.css']
})
/*@ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;*/

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

  //public downloadAsPdf(): void {
  //  let data! = document.getElementById('contentToConvert');
  //  const width = data!.nativeElement.clientWidth;
  //  const height = data!.nativeElement.clientHeight + 40;
  //  let orientation = '';
  //  let imageUnit = 'pt';
  //  if (width > height) {
  //    orientation = 'l';
  //  } else {
  //    orientation = 'p';
  //  }
  //  domToImage
  //    .toPng(data!.nativeElement, {
  //      width: width,
  //      height: height
  //    })
  //    .then(result => {
  //      let jsPdfOptions = {
  //        orientation: orientation,
  //        unit: imageUnit,
  //        format: [width + 50, height + 220]
  //      };
  //      const pdf = new jsPDF(jsPdfOptions);
  //      pdf.setFontSize(48);
  //      pdf.setTextColor('#2585fe');
  //      pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
  //      pdf.setFontSize(24);
  //      pdf.setTextColor('#131523');
  //      pdf.text('Report date: ' + moment().format('ll'), 25, 115);
  //      pdf.addImage(result, 'PNG', 25, 185, width, height);
  //      pdf.save('file_name' + '.pdf');
  //    })
  //    .catch(error => {
  //    });
  //}

  title = 'html-to-pdf-angular-application';
  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    if (data) {
      html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('landscape', 'mm', 'a4'); // A4 size page of PDF

      pdf.html(data!, {
          callback: function(doc) {
              // Save the PDF
              doc.save('sample-document.pdf');
          },
          x: 15,
          y: 15,
          width: 150, //target width in the PDF document
          windowWidth: 297 //window width in CSS pixels
      });

        // pdf.html(
        //   data!,
        //   {
        //     'width': 180,'elementHandlers': elementHandler
        //   });



        // var position = 0;
        // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        // pdf.save('SavoyReport.pdf'); // Generated PDF
      });
    } else {
      console.error("Element with id 'contentToConvert' not found.");
    }
   
  }

}

