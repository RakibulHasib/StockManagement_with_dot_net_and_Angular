import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../../models/Stock/Stock';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() productData: Stock = new Stock();
  @Output() productDataChange = new EventEmitter<Stock>();

  updateProductData() {
    this.productDataChange.emit(this.productData);
  }

  getTotalItem() : number{
    const ejaValue = Number(this.productData.eja || 0);
    const newProductValue = Number(this.productData.newProduct || 0);
    return ejaValue + newProductValue;
  }

  getTotalPrice() : number{
    const price = Number(this.productData.price || 0);
    const quantity = Number(this.productData.salesQuantity || 0);
    return price * quantity;
  }

  // getRemaining() : number{
  //   const dumping = Number(this.productData.dumping || 0);
  //   const receive = Number(this.productData.receive || 0);
  //   return dumping - receive;
  // }

}
