import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, shareReplay } from "rxjs";
import { ICategory } from "../models/ICategory";

@Injectable({
  providedIn: 'root'
})
export class DeclaractiveCategoryService{
  constructor(private http: HttpClient){}

  categories$ = this.http.get<{[id: string]: ICategory}>
  ('https://rxjs-datalist-default-rtdb.firebaseio.com/categories.json').pipe(
    map((categories) => {
      let categoriesData: ICategory[] = [];
      for(const id in categories) {
        categoriesData.push({...categories[id], id})
      }
      return categoriesData;
    }), shareReplay()
  )
}
