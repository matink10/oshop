import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { ICategories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  // getCategories(){
  //   return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  // }

  // $key has been deprecated. Use snapshotChanges() instead
  getCategories() {
    return this.db
        .list('/categories', (ref) => ref.orderByChild('name'))
        .snapshotChanges()
        .pipe(
        map((actions) => {
            return actions.map((action) => ({
                key: action.key,
                val: action.payload.val(),
            }));
        }));
  }

  // getAll(): Observable<ICategories[]> | undefined {
  //   const data: any = this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
    
  //   return data || undefined;
  // }

}
