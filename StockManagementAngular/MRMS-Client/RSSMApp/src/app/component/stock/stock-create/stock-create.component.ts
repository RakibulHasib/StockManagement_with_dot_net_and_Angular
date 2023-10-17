import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Savoy } from 'src/app/models/Savoy/Savoy';
import { ProductService } from 'src/app/services/Product/product.service';
import { StockService } from 'src/app/services/Savoy/savoy.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  companyId! : number;
  savoyForm: FormGroup = new FormGroup({});
  savoyData: Savoy[] = [];

  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private savoyService: StockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  insert(): void {
    this.savoyService.insert(this.companyId, this.savoyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/savoy']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductsWithEja(this.companyId)
      .subscribe(r => {
        this.savoyData = r;
      }, err => {
        this.notificationSvc.message("Failed to load Company", "DISMISS");
      })
  }

  updateProduct(updatedProduct: Savoy, index: number) {
    this.savoyData[index] = updatedProduct;
  }

  trackByProduct(index: number, product: Savoy): any {
    return product.productId;
  }

}
