import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Savoy } from 'src/app/models/Savoy/Savoy';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() productData: Savoy = new Savoy();
  @Output() productDataChange = new EventEmitter<Savoy>();

  updateProductData() {
    this.productDataChange.emit(this.productData);
  }

}
