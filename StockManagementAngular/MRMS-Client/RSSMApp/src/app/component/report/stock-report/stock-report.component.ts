import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    const invoiceDetails = {
      companyName: 'Brand Name',
      invoiceTo: 'Dwayne Clark',
      address: '24 Dummy Street Area, Location, Lorem Ipsum, 5700X59',
      invoiceNumber: '52148',
      date: '01/02/2020',
      paymentInfo: {
        accountNo: '1234 5678 9012',
        ifsc: 'LOREM1234',
        accName: 'Lorem Ipsum',
      },
      items: [
        { description: 'Lorem Ipsum Dolor', price: 50, qty: 1, total: 50 },
        {
          description: 'Pellentesque id neque ligula',
          price: 20,
          qty: 3,
          total: 60,
        },
        {
          description: 'Interdum et malesuada fames',
          price: 10,
          qty: 2,
          total: 20,
        },
        {
          description: 'Vivamus volutpat faucibus',
          price: 90,
          qty: 1,
          total: 90,
        },
        { description: 'Product 5', price: 15, qty: 4, total: 60 },
        { description: 'Product 6', price: 25, qty: 2, total: 50 },
        { description: 'Product 7', price: 40, qty: 3, total: 120 },
        { description: 'Product 8', price: 100, qty: 1, total: 100 },
        { description: 'Product 9', price: 55, qty: 2, total: 110 },
        { description: 'Product 10', price: 30, qty: 5, total: 150 },
      ],
    };

    const tableBody: any = [
      [
        { text: 'ক্রঃ নং', alignment: 'center', font: 'Adorsholipi' },
        { text: 'পণ্যের নাম', bold: true, font: 'Adorsholipi', alignment: 'center' },
        { text: 'মূল্য', bold: false, font: 'Adorsholipi', alignment: 'right' },
        { text: 'ইজা', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'নতুন', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'মোট', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'বিক্রি', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'ডেমেজ', bold: true, font: 'Adorsholipi', alignment: 'right' },
        { text: 'টাকা', bold: true, font: 'Adorsholipi', alignment: 'right' },
      ],
    ];

    this.stockReportData.reportDetails!.forEach((item, index) => {
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

    // Add a horizontal line after the last product
    tableBody.push([
      { text: '', colSpan: 9, border: [false, true, false, false] },
      {}, {}, {}, {}, {}, {}, {}, {}
    ]);

    const docDefinition: any = {
      pageMargins: [40, 21.6, 40, 40], // Left, Top, Right, Bottom margins (in points)
      content: [
        // Company and Invoice Header
        {
          columns: [
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
          ],
        },

        // Product Table
        {
          table: {
            widths: [30, '*', 50, 30, 30, 30, 30, 30, 50],
            body: tableBody,
          },
          layout: 'lightHorizontalLines', // Keep the light borders as in the original design
          margin: [0, 0, 0, 20],
        },

        // Total Calculations aligned to the right
        {
          columns: [
            { width: '*', text: '' }, // Empty space on left
            {
              width: 'auto',
              table: {
                body: [
                  [
                    { text: 'Subtotal', bold: true },
                    `$${invoiceDetails.items
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}`,
                  ],
                  [{ text: 'Tax (0.00%)', bold: true }, '$0.00'],
                  [
                    { text: 'Total', bold: true },
                    `$${invoiceDetails.items
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}`,
                  ],
                ],
              },
              layout: 'noBorders',
              alignment: 'right',
            },
          ],
        },
      ],
      defaultStyle: {
        fontSize: 10,
      },
    };

    pdfMake.createPdf(docDefinition).print();
  }
}

