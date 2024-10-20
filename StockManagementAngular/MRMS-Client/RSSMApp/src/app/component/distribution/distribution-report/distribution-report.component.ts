import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as custom_fonts  from 'src/assets/custom_fonts/custom_fonts';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';
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
  totalSalesAmount: any = 0;
  totalReceivePrice: any = 0;
  totalReturnPrice: any = 0;

  constructor(
    private reportDataSvc: SalesDistributionService,
    private _notificationSvc: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    let salesDistributeID: number = this.activatedRoute.snapshot.params['id'];
    this.fetchReportData(salesDistributeID);
  }

  fetchReportData(salesDistributeID: number) {
    if (salesDistributeID) {
      this.reportDataSvc.getReportData(salesDistributeID)
        .subscribe(data => {
          this.salesReportData = data;
          this.totalSalesAmount = data.reportDetails?.reduce((sum, item) => sum + (item?.totalSalesPrice ?? 0), 0) || 0;
          this.totalReceivePrice = data.reportDetails?.reduce((sum, item) => sum + (item?.receivePrice ?? 0), 0) || 0;
          this.totalReturnPrice = data.reportDetails?.reduce((sum, item) => sum + (item?.returnPrice ?? 0), 0) || 0;
        }, err => {
          this.notificationSvc.message("Failed to load data", "DISMISS");
        });
    } else {
      this.notificationSvc.message("Data Not Found", "DISMISS");
    }
  }

  public convetToPDF() {

    const defaultHeader: any  = [
      {
        text: 'রস্ ফুডস এন্ড সুইটস',
        bold: true,
        font: 'Kalpurush',
        fontSize: 17,
        alignment: 'left',
      },
      {
        text: `ডিস্ট্রিবিউট হিসাব`,
        bold: true,
        font: 'Kalpurush',
        fontSize: 24,
        alignment: 'center',
      },
      {
        stack: [
          {
            text: `${this.salesReportData?.companyName}`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 14,
            alignment: 'right'
          },
          {
            text: `${this.salesReportData?.concernPerson}`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 16,
            alignment: 'right',
          },
        ],
      },
    ];

    const distributeHeader: any  = [
      {
        stack: [
          {
            text: 'রস্ ফুডস এন্ড সুইটস',
            bold: true,
            font: 'Kalpurush',
            fontSize: 17,
            alignment: 'left',
          },
          {
            text: 'রেজিঃ নং- ',
            font: 'Kalpurush',
            fontSize: 12,
            alignment: 'left',
            margin: [0, 5, 0, 5],
          },
        ],
      },
      {
        stack: [
          {
            text: 'বিসমিল্লাহির রাহ্‌মানির রাহীম',
            bold: true,
            font: 'Kalpurush',
            fontSize: 11,
            alignment: 'center',
          },
          {
            text: `ডিস্ট্রিবিউট হিসাব`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 24,
            alignment: 'center',
          },
        ],
      },
      {
        stack: [
          {
            text: `${this.salesReportData?.companyName}`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 14,
            alignment: 'right'
          },
          {
            text: `${this.salesReportData?.concernPerson}`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 16,
            alignment: 'right',
          },
          {
            text: [
              {
                text: 'তারিখঃ ',
                font: 'Kalpurush',
                fontSize: 12,
                alignment: 'right',
              },
              {
                text: `${this.datePipe.transform(
                  this.salesReportData?.creationTime,
                  'dd-MM-yyyy'
                )}`,
                fontSize: 11,
              },
            ],
          },
        ],
      },
    ];

    const tableBody: any = [
      [
        { text: 'ক্রমিক', font: 'Adorsholipi', alignment: 'center' },
        { text: 'পণ্যের নাম', bold: true, font: 'Adorsholipi', alignment: 'center' },
        { text: 'মূল্য',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'গ্রহণ',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'টাকা',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'ফেরৎ',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'টাকা',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'বিক্রয়',  bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'টাকা',  bold: true, font: 'Adorsholipi', alignment: 'right' }
      ]
    ];

    this.salesReportData?.reportDetails?.forEach((item, index) => {
      tableBody.push([
        { text: index + 1, alignment: 'center' },
        { text: `${item.productName}`, font: 'Kalpurush', bold: true, margin: [10, 0, 0, 0] },
        { text: [{ text: '৳ ', font: 'Kalpurush' }, `${item.price}`], alignment: 'right' },
        { text: `${item.receiveQuantity}`, alignment: 'right' },
        { text: `${(item.receiveQuantity || 0) * (item.price || 0)}`, alignment: 'right' },
        { text: `${item.returnQuantity}`, alignment: 'right' },
        { text: `${(item.returnQuantity || 0) * (item.price || 0)}`, alignment: 'right' },
        { text: `${item.salesQuantity}`, alignment: 'right' },
        { text: [{ text: '৳ ', font: 'Kalpurush' }, `${item.totalSalesPrice}`], alignment: 'right' }
      ]);
    });

      const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 80, 40, 40], // Left, Top, Right, Bottom margins (in points)
      header : function(currentPage: any, pageCount: any, pageSize: any){
        return {
          margin: [40, 20, 40, 20],
          columns: currentPage == 1 ? distributeHeader : defaultHeader
        }
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: [30, '*', 50, 33, 45, 33, 45, 33, 60],
            dontBreakRows: true,
            body: tableBody,
          },
            layout: {
              hLineWidth: function (i: any, node: any) {
                return i === 0 ? 0 : 1;
              },
              vLineWidth: function () {
                return 0;
              },
              hLineColor: function (i: any, node: any) {
                return i === 1 ? '#313131' : '#aaa';
              }
            },
          margin: [0, 0, 0, 0],
        },
        {
          table: {
            widths: [30, '*', 50, 33, 45, 33, 45, 33, 60],
            body: [
              [
                { },
                { },
                { text: 'মোট', bold: true, font: 'Adorsholipi', fontSize: 11, alignment: 'right' },
                { },
                { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.totalReceivePrice}`], bold: true, alignment: 'right' },
                { },
                { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.totalReturnPrice}`], bold: true, alignment: 'right' },
                { },
                { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.totalSalesAmount}`], bold: true, alignment: 'right' },
              ]
            ]
          },
          layout: 'noBorders'
        },
      ],
      footer: function(currentPage: any, pageCount: any){
        return {
          text: `Page ${currentPage.toString()} of ${pageCount}`,
          fontSize: 8,
          margin: [20, 0, 0, 20]
        }
      },
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake.createPdf(docDefinition).print();
  };
}
