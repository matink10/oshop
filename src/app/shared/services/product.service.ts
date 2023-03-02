import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products')
    .snapshotChanges();
        // .pipe(
        // map((actions) => {
        //     return actions.map((action) => ({
        //         key: action.key,
        //         val: action.payload.val(),
        //     }));
        // }));
  }

  get(productId: string){
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product: any){
    return this.db.object('/products/' + productId).update(product);
  }
  // We need two parameters productId and product because if product object 
  // has a property called productId, it will give error at runtime, 
  // firebase doesn't like objecct which has id property or key property 
  // because by definition id property or key property cannot and should not be changed. 
  // So, in product object we only have property which can be updated.

  delete(productId: any){
    return this.db.object('/products/' + productId).remove();
  }
  
  // search(){
  //   return this.db.list('/products').snapshotChanges();
  // }

}
