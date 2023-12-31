import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SavoyReportModel } from '../../../models/Savoy/savoy-report';
import { SavoyService } from '../../../services/Savoy/savoy.service';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

    public convetToPDF() {
        let docDefinition : any = {
        pageMargins: [20, 20, 20, 20],
        content: [
          {
            text: 'Savoy Ice-Cream Report - 12 October 2023',
            bold: true,
            fontSize: 16, // Adjust the font size as needed
            alignment: 'center',
            margin: [0, 0, 0, 15]
          },
          {
            columns : [
              { width: '*', text: '' },
              {
                width: 'auto',
                table: {
                body: [
                    // ['Product', 'Price', 'Eja', 'Total', 'Sales', 'Amount', 'Dumping', 'Receiving', 'Remaining'],
                    [
                      { text: 'Product', bold: true }, // Make the heading text bold 
                      { text: 'Price', bold: true },
                      { text: 'Eja', bold: true },
                      { text: 'Total', bold: true },
                      { text: 'Sales', bold: true },
                      { text: 'Amount', bold: true },
                      { text: 'Dumping', bold: true },
                      { text: 'Receiving', bold: true },
                      { text: 'Remaining', bold: true }
                    ],
                    ...this.savoyReportData.map(x => [
                      x.productName,
                      x.price,
                      x.eja,
                      x.total,
                      x.salesQuantity,
                      x.totalAmount,
                      x.dumping,
                      x.receive,
                      x.remaining
                    ])
                  ],
                  alignment: "center",
                  // styles: {
                  //   tableHeader: { bold: true }
                  // }
                }
              },
              { width: '*', text: '' }
            ]
          }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    };
    

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

  // title = 'html-to-pdf-angular-application';

  // public convetToPDF() {
  //   var data = document.getElementById('contentToConvert');
  //   if (data) {
  //     html2canvas(data).then(canvas => {
  //       // Few necessary setting options
  //       var imgWidth = 208;
  //       var pageHeight = 295;
  //       var imgHeight = canvas.height * imgWidth / canvas.width;
  //       var heightLeft = imgHeight;

  //       const contentDataURL = canvas.toDataURL('image/png')
  //       let pdf = new jspdf('p', 'pt', 'a4'); // A4 size page of PDF

  //     pdf.html(data!, {
  //         callback: function(doc) {
  //           // pdf.internal.pageSize.width = data!.offsetHeight;
  //           // pdf.internal.pageSize.height = data!.offsetWidth;
  //             // Save the PDF
  //             // doc.save('sample-document.pdf');
  //             // doc.output('datauri');
  //             pdf.setProperties({
  //             title: "Report"
  //             });
  //             // let componentHeight = data!.offsetHeight;
  //             // let componentWidth = data!.offsetWidth;
  //             // pdf.internal.pageSize.width = componentWidth;
  //             // pdf.internal.pageSize.height = componentHeight;
  //             // doc.output('datauri');
  //             pdf.output('dataurlnewwindow');
  //         },
  //         margin: [60, 20, 60, 20],
  //         x: 15,
  //         y: 15,
  //         html2canvas: {
  //             scale: 1, //this was my solution, you have to adjust to your size
  //             width: 1000 //for some reason width does nothing
  //         },
  //         //  width: 100, //target width in the PDF document
  //         //  windowWidth: 500 //window width in CSS pixels
  //     });

  //       // pdf.html(
  //       //   data!,
  //       //   {
  //       //     'width': 180,'elementHandlers': elementHandler
  //       //   });



  //       // var position = 0;
  //       // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //       // pdf.save('SavoyReport.pdf'); // Generated PDF
  //     });
  //   } else {
  //     console.error("Element with id 'contentToConvert' not found.");
  //   }
   
  // }

}

