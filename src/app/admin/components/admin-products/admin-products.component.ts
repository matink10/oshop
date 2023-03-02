import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnDestroy  {
    
  products: any[] = [];    
  filteredProducts: any[] = [];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) { 
    this.subscription = this.productService.getAll()
      .subscribe(actions => {
        this.products = [];

        actions.forEach((action: any) => {
          const val: any = action.payload.val();
          this.products.push({
            $key: action.key ? action.key : '', 
            ...<Object>action.payload.val()
          });
        });

        this.filteredProducts = this.products;
      });
  } 

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products?.filter(p => p && p.title ? p.title.toLowerCase().includes(query.toLowerCase()): null): 
      this.products;    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();    
  }
}
