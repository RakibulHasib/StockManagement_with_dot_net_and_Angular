import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../services/Shared/notification.service';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as custom_fonts  from 'src/assets/custom_fonts/custom_fonts';
import { StockService } from '../../../services/Stock/stock.service';
import { stockReportDataModel } from '../../../models/Stock/stock-report';
import { DatePipe } from '@angular/common';

(pdfMake as any).vfs = custom_fonts.pdfMake.vfs;

(pdfMake as any).fonts = {
    'Roboto': {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    },
    'Adorsholipi': {
        normal: 'AdorshoLipi.ttf',
        bold: 'AdorshoLipi.ttf'
    },
    'Kalpurush': {
      normal: 'Kalpurush.ttf',
      bold: 'Kalpurush.ttf'
    }
  };

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css'],
})
export class StockReportComponent implements OnInit {

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
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    let stockID: number = this.activatedRoute.snapshot.params['id'];
    this.fetchReportData(stockID);
  }

  fetchReportData(stockID: number) {
    if (stockID) {
      this.reportDataSvc.getReportData(stockID).subscribe(
        (data) => {
          this.stockReportData = data;
        },
        (err) => {
          this.notificationSvc.message('Failed to load data', 'DISMISS');
        }
      );
    } else {
      this.notificationSvc.message('Data Not Found', 'DISMISS');
    }
  }

  public convertToPDF() {
    
    const invoiceHeader: any  = [
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
        text: 'বিসমিল্লাহির রাহ্‌মানির রাহীম',
        bold: true,
        font: 'Kalpurush',
        fontSize: 11,
        alignment: 'center',
        stack: [
          {
            text: 'বিসমিল্লাহির রাহ্‌মানির রাহীম',
            bold: true,
            font: 'Kalpurush',
            fontSize: 11,
            alignment: 'center',
          },
          {
            text: `স্টক রিপোর্ট`,
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
            text: `${this.stockReportData.companyName}`,
            bold: true,
            font: 'Kalpurush',
            fontSize: 17,
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
                  this.stockReportData.creationTime,
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
        { text: 'ক্রমিক', alignment: 'center', font: 'Adorsholipi' },
        { text: 'পণ্যের নাম', bold: true, font: 'Adorsholipi', alignment: 'center' },
        { text: 'মূল্য', bold: false, font: 'Adorsholipi', alignment: 'right' },
        { text: 'ইজা', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'নতুন', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'মোট', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'বিক্রি', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'ডেমেজ', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'টাকা', bold: true, font: 'Adorsholipi', alignment: 'right' },
      ]
    ];

    const invoiceFooter: any = [
      { width: '*', text: '' },
      {
        width: 'auto',
        table: {
          body: [
            [
              { text: 'মোট মূল্যঃ', font: 'Kalpurush', fontSize: 11, bold: true },
              { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.stockReportData.totalPrice}`]},
            ],
            [
              { text: '(-) ড্যামেজ মূল্যঃ', font: 'Kalpurush', fontSize: 11, bold: true },
              { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.stockReportData.damageAmount}`]},
            ],
            [
              // { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.stockReportData.totalPrice}`] },
              { text: '(-) এস/আর কমিশনঃ', font: 'Kalpurush', fontSize: 11, bold: true },
              { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.stockReportData.srcommission}`], margin: [25, 0, 0, 0]},
            ],
            [
              { text: 'নিট মূল্যঃ', font: 'Kalpurush', fontSize: 11, bold: true },
              { text: [{ text: '৳ ', font: 'Kalpurush' }, `${this.stockReportData.afterSrCommission}`]},
            ],
          ],
        },
        layout: {
          hLineWidth: function (i: number, node: any) {
            return i === 0 || i === node.table.body.length ? 0 : 1;
          },
          vLineWidth: function () {
            return 0;
          },
          hLineColor: function () {
            return '#aaa';
          },
        },
        alignment: 'right',
      },
    ];

    this.stockReportData?.reportDetails?.forEach((item, index) => {
      tableBody.push([
        { text: index + 1, alignment: 'center' },
        { text: `${item.productName}`, font: 'Kalpurush', bold: true },
        { text: [{ text: '৳ ', font: 'Kalpurush' }, `${item.price}`], alignment: 'right' },
        { text: `${item.eja}`, alignment: 'center' },
        { text: `${item.restockQuantity}`, alignment: 'center' },
        { text: `${item.totalQuantity}`, alignment: 'center' },
        { text: `${item.salesQuantity}`, alignment: 'center' },
        { text: `${item.damageQuantity}`, alignment: 'center' },
        { text: [{ text: '৳ ', font: 'Kalpurush' }, `${item.totalAmount}`], alignment: 'right' }
      ]);
    });

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [40, 70, 40, 20], // Left, Top, Right, Bottom margins (in points)
      header: {
        margin: [40, 20, 40, 20],
        columns: invoiceHeader
      },
      content: [
        // Product Table
        {
          table: {
            headerRows: 1,
            widths: [30, '*', 50, 30, 30, 30, 30, 30, 50],
            body: tableBody,
          },
            layout: {
              hLineWidth: function (i: any, node: any) {
                // Apply border-bottom only for the last row
                return i === 0 ? 0 : 1;
                // return i === totalRows ? 1 : 0; // 1 for the last row, 0 for others
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

        // Total Calculations in footer aligned to the right
        {
          columns: invoiceFooter,
          unbreakable: true
        },
      ],
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake.createPdf(docDefinition).print();
  }
}