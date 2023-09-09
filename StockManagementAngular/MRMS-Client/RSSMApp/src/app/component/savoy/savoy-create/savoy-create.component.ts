import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Savoy } from 'src/app/models/Savoy/Savoy';
import { Company } from 'src/app/models/companyenum/company';
import { ProductService } from 'src/app/services/Product/product.service';
import { SavoyService } from 'src/app/services/Savoy/savoy.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-savoy-create',
  templateUrl: './savoy-create.component.html',
  styleUrls: ['./savoy-create.component.css']
})
export class SavoyCreateComponent implements OnInit {

  savoyForm: FormGroup = new FormGroup({});
  savoyData: Savoy[] = [];

  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private savoyService: SavoyService,
    private router: Router
  ) { }
  insert(): void {
    console.log("Submit event initiated...");

    this.savoyService.insert(this.savoyData)
      .subscribe(r => {
        this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
        this.router.navigate(['/savoy']);
        console.log(r);
      }, err => {
        this.notificationSvc.message("Failed to save data!!!", "DISMISS");
      })

  }

  ngOnInit(): void {
    this.productService.getProductsWithEja(Company.Savoy)
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
