import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as custom_fonts  from 'src/assets/custom_fonts/custom_fonts';
import { StockService } from '../../../services/Stock/stock.service';
import { stockReportDataModel } from '../../../models/Stock/stock-report';
import { DatePipe } from '@angular/common';

(pdfMake as any).vfs = custom_fonts.pdfMake.vfs;

(pdfMake as any).fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        },
        Adorsholipi: {
           normal: 'AdorshoLipi.ttf',
           bold: 'AdorshoLipi.ttf'
        }
     };

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css']
})
/*@ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;*/


export class StockReportComponent implements OnInit {
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

  stockReportData!: stockReportDataModel;

  constructor(
    private reportDataSvc: StockService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private datePipe : DatePipe
  ) { }


  ngOnInit() {
    let stockID: number = this.activatedRoute.snapshot.params['id'];
    console.log(stockID);
    this.fetchReportData(stockID);
  }
  

  fetchReportData(stockID: number) {
    console.log(stockID);
    if (stockID) {
      this.reportDataSvc.getReportData(stockID)
        .subscribe(data => {
          console.log(data);
          this.stockReportData = data;
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
        pageMargins: [40, 20, 40, 20],
        content: [
          {
            font: 'Adorsholipi',
            text: 'বিসমিল্লাহির রাহ্‌মানির রাহীম',
            bold: true,
            fontSize: 10,
            alignment: 'center',
          },
          {
            layout: 'noBorders',
            table: {
              color: 'blue',
              headerRows: 1,
              widths: [ 100, '*', 100 ],
              body: [
                [
                  {
                    margin: [0, 10, 0, 0],
                    font: 'Adorsholipi',
                    text: 'রেজিঃ নং- ',
                    bold: true,
                    fontSize: 11,
                    alignment: 'left'
                  },
                  {
                    font: 'Adorsholipi',
                    text: this.stockReportData.companyName,
                    bold: true,
                    fontSize: 22,
                    alignment: 'center',
                  },
                  {
                    margin: [0, 10, 0, 0],
                    columns: [
                      {
                        font: 'Adorsholipi',
                        text: 'তারিখঃ ',
                        bold: true,
                        fontSize: 11,
                      },
                      {
                        width: 70,
                        margin: [5, 0, 0, 0],
                        layout: 'noBorders',
                        table: {
                          heights: 10,
                          headerRows: 1,
                          widths: [ '*' ],
                          body: [
                            [this.datePipe.transform(this.stockReportData.creationTime, 'yyyy-MM-dd')],
                          ]
                        }
                      },
                    ]
                  }
                ],
              ],
              style: [{border:'0'}]
            }
          },
          {
            columns : [
              { width: '*', text: '' },
              {
                width: '100%',
                table: {
                  widths: ['*', 35, 30, 30, 35, 45, 50, 55, 60],
                  body: [
                    [
                      { text: 'পণ্যের নাম', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'মূল্য', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'ইজা', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'মোট', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'বিক্রি', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'টাকা', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'ডাম্পিং', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'ফেরৎ', bold: true, font: 'Adorsholipi', alignment: 'center' },
                      { text: 'অবশিষ্ট', bold: true, font: 'Adorsholipi', alignment: 'center' }
                    ],
                    ...this.stockReportData.reportDetails!.map(x => [
                      x.productName,
                      x.price,
                      x.eja,
                      x.totalQuantity,
                      x.salesQuantity,
                      x.totalAmount,
                      x.dumping,
                      x.receive,
                      x.remaining
                    ])
                  ],
                  alignment: "center",
                },
                layout: {
                  hLineWidth: () => 0.5,
                  vLineWidth: () => 0.5,
                  hLineColor: '#253da1',
                  vLineColor: '#253da1',
                  // hLineStyle: {dash: {length: 10, space: 4}},
                  // vLineStyle: {dash: {length: 4}}
                  }
              },
              { width: '*', text: '' }
            ]
          }
        ],
        defaultStyle:{
          color: '#253da1'
        }
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

