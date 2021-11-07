import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap, shareReplay } from "rxjs";
import { IPost } from "../models/IPost";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: 'root'
})

export class PostService{
  url = 'https://rxjs-datalist-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient,
    private categoryService: CategoryService){}

  getPosts(){
   return this.http.get<{[id: string]: IPost}>(this.url).pipe(
     map((posts) => {
       let postData: IPost[] = [];
       for(let id in posts){
          postData.push({...posts[id], id});
       }
       return postData;
     }), shareReplay()
   )
  }

  getPostsWithCategory(){
    return this.getPosts().pipe(
      mergeMap((posts) => {
        // console.log("posts", posts);
        return this.categoryService.getCategories().pipe(
          (map((categories)=> {
            // console.log(categories)
            return posts.map(post => {
              // console.log("post", post)
              return {
                ...post,
                categoryName: categories.find(category => category.id == post.categoryId)?.title
              }
            })
          }))
        );
      }),
      shareReplay()
    )
  }

}
