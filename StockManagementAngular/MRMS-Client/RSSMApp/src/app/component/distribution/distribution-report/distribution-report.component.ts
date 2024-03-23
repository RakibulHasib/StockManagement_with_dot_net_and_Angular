import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as custom_fonts  from 'src/assets/custom_fonts/custom_fonts';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';

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
        },
        Kalpurush: {
          normal: 'Kalpurush.ttf',
          bold: 'Kalpurush.ttf'
        }
     };

@Component({
  selector: 'app-distribution-report',
  templateUrl: './distribution-report.component.html',
  styleUrls: ['./distribution-report.component.css']
})
export class DistributionReportComponent {
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

  salesReportData!: SalesReportModel;

  constructor(
    private reportDataSvc: SalesDistributionService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    let salesDistributeID: number = this.activatedRoute.snapshot.params['id'];
    console.log(salesDistributeID);
    this.fetchReportData(salesDistributeID);
  }
  

  fetchReportData(salesDistributeID: number) {
    console.log(salesDistributeID);
    if (salesDistributeID) {
      this.reportDataSvc.getReportData(salesDistributeID)
        .subscribe(data => {
          console.log(data);
          this.salesReportData = data;
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
            text: 'Concern Person : '+this.salesReportData.concernPerson,
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
                  widths: [ 70, 45, 85, 85, 85, 90],
                  body: [
                      // ['Product', 'Price', 'Eja', 'Total', 'Sales', 'Amount', 'Dumping', 'Receiving', 'Remaining'],
                      [
                        { text: 'পণ্যের নাম', bold: true, font: 'Adorsholipi', alignment: 'center' }, // Make the heading text bold 
                        { text: 'মূল্য',  bold: true, font: 'Adorsholipi', alignment: 'center' },
                        { text: 'গ্রহণের পরিমাণ',  bold: true, font: 'Adorsholipi', alignment: 'center' },
                        { text: 'ফেরতের পরিমাণ',  bold: true, font: 'Adorsholipi', alignment: 'center' },
                        { text: 'বিক্রয়ের পরিমাণ',  bold: true, font: 'Adorsholipi', alignment: 'center' },
                        { text: 'মোট বিক্রয় মূল্য',  bold: true, font: 'Adorsholipi', alignment: 'center' }
                      ],
                      ...this.salesReportData.reportDetails!.map(x => [
                        { text: x.productName, bold: true, font: 'Kalpurush', alignment: 'center' },
                        x.price,
                        x.receiveQuantity,
                        x.returnQuantity,
                        x.salesQuantity,
                        x.totalSalesPrice
                      ])
                    ],
                  alignment: "center",
                }
              },
              { width: '*', text: '' }
            ]
          }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
    };
}
