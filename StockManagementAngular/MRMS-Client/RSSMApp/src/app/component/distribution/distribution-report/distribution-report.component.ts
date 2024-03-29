import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';
import { NotificationService } from 'src/app/services/Shared/notification.service';
import { SalesDistributionService } from 'src/app/services/sales/sales-distribution.service';

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
    this.fetchReportData(salesDistributeID);
  }
  

  fetchReportData(salesDistributeID: number) {
    if (salesDistributeID) {
      this.reportDataSvc.getReportData(salesDistributeID)
        .subscribe(data => {
          this.salesReportData = data;
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
                body: [
                    // ['Product', 'Price', 'Eja', 'Total', 'Sales', 'Amount', 'Dumping', 'Receiving', 'Remaining'],
                    [
                      { text: 'Product Name', bold: true }, // Make the heading text bold 
                      { text: 'Price', bold: true },
                      { text: 'Receive Quantity', bold: true },
                      { text: 'Return Quantity', bold: true },
                      { text: 'Sales Quantity', bold: true },
                      { text: 'Total Sales Price', bold: true }
                    ],
                    ...this.salesReportData.reportDetails!.map(x => [
                      x.productName,
                      x.price,
                      x.receiveQuantity,
                      x.returnQuantity,
                      x.salesQuantity,
                      x.totalSalesPrice
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
}
