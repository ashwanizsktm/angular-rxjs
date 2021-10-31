import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { IPost } from "../models/IPost";

@Injectable({
  providedIn: 'root'
})

export class PostService{
  url = 'https://rxjs-datalist-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient){}

  getPost(){
   return this.http.get<{[id: string]: IPost}>(this.url).pipe(
     map((posts) => {
       let postData: IPost[] = [];
       for(let id in posts){
          postData.push({...posts[id], id});
       }
       return postData;
     })
   )
  }

}
