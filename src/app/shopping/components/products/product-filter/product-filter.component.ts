import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  
  category$: any;  
  @Input('category') category: any;
  
  constructor(categoryService: CategoryService) {
    this.category$ = categoryService.getCategories();
   }
}
