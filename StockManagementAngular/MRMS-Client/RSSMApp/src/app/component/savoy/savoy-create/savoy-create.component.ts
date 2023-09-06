import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Savoy } from 'src/app/models/Savoy/Savoy';
import { Company } from 'src/app/models/companyenum/company';
import { ProductService } from 'src/app/services/Product/product.service';
import { NotificationService } from 'src/app/services/Shared/notification.service';

@Component({
  selector: 'app-savoy-create',
  templateUrl: './savoy-create.component.html',
  styleUrls: ['./savoy-create.component.css']
})
export class SavoyCreateComponent implements OnInit {
  savoyForm: FormGroup = new FormGroup({});

  savoyData: Savoy[] = [];

  // f() {
  //   return this.companyForm.controls;
  // }
  constructor(
    private notificationSvc: NotificationService,
    private productService: ProductService,
    private router: Router
  ) { }
  insert(): void {
    console.log("Submit event initiated...");
    // if (this.companyForm.invalid) return;
    // console.log(this.companyForm.value);

    // Object.assign(this.company, this.companyForm.value);
    // console.log(this.company);

    // this.companySvc.insert(this.company)
    //   .subscribe(r => {
    //     this.notificationSvc.message("Data saved successfully!!!", "DISMISS");
    //     this.router.navigate(['/company']);
    //     this.companyForm.reset({});
    //     console.log(r);
    //   }, err => {
    //     this.notificationSvc.message("Failed to save data!!!", "DISMISS");
    //   })
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
    // Assuming that you want to update the specific product in the array
    this.savoyData[index] = updatedProduct;
  }

  trackByProduct(index: number, product: Savoy): any {
    return product.productId;
  }

}
