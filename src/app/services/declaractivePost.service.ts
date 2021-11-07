import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, combineLatest, forkJoin, map, merge, shareReplay, Subject, throwError } from "rxjs";
import { CRUDAction, IPost } from "../models/IPost";
import { DeclaractiveCategoryService } from "./declaractiveCategory.service";


@Injectable({
    providedIn:'root'
  })
export class DeclaractivepostService {
  constructor(private http: HttpClient,
    private categoryService: DeclaractiveCategoryService){
    }

  url = 'https://rxjs-datalist-default-rtdb.firebaseio.com/posts.json';

  posts$ = this.http.get<{[id: string]: IPost}>(this.url).pipe(
    map((posts) => {
      let postData: IPost[] = [];
      for(let id in posts){
         postData.push({...posts[id], id});
      }
      return postData;
    }), shareReplay()
    // catchError(this.handleError)
  )

  // this can be done by either forkjoin or combine latest. both takes 2 or more
  // observable and return as a single observable this both returns the value
  // at the same time whereas in merge Map it retruns values one by one.

  // postWithCategories$ = forkJoin([this.posts$, this.categoryService.categories$]).pipe(

  postWithCategories$ = combineLatest([this.posts$, this.categoryService.categories$]).pipe(
    map(([posts, categories])=>{
      return posts.map((post) => {
        return{
          ...post,
          categoryName: categories.find((category) => category.id === post.categoryId)?.title,
        } as IPost;
      })
    }),
    catchError((err: Error) => {
      return throwError(err.message)
    }),
    shareReplay()
    // catchError(this.handleError)
  )

  // crud operations logics
  private postCRUDSubject = new Subject<CRUDAction<IPost>>();
  postCRUDAction$ = this.postCRUDSubject.asObservable();

  allPost$ = merge(this.postWithCategories$, this.postCRUDAction$).pipe(
    map((data) => {
      console.log(data);
      return data;

    })
  )
  addPost(post: IPost){
    this.postCRUDSubject.next({action: 'add', data: post});
  }


  // Getting a single post and shaing in single post component.
  private slelctedPostSubject = new Subject<string>();
  selectedPostAction$ = this.slelctedPostSubject.asObservable();


  singlePost$ = combineLatest([this.postWithCategories$, this.selectedPostAction$]).pipe(
    map(([posts, selectedPostId]) => {
      return posts.find(post => post.id === selectedPostId)
    }),
    catchError(this.handleError),
    shareReplay()
  )
  selectPost(postId : string) {
    this.slelctedPostSubject.next(postId);
  }

  handleError(error: Error) {
    return throwError(() => {
      return "unknown error occured. Please try again";
    })
  }

  // ngOnInit() {

  // }
}
