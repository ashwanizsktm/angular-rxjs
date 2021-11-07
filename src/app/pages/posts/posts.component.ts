import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { LoaderService } from 'src/app/services/loader.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  postsSubcription!: Subscription;
  // intervalSubscription!: Subscription;
  constructor(private postService: PostService,
    private loaderService: LoaderService) {}

  ngOnInit(): void {
   this.getPosts();
  //  this.runInterval();
  }

  getPosts(){
    this.postsSubcription = this.postService.getPostsWithCategory().subscribe(data => {
      this.posts = data;
      // console.log("this,posts => ", this.posts);
    })
  }

  /*
  runInterval() {
   this.intervalSubscription = interval(1000).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
       console.log(error)
      },
      complete: () => {
        console.log('Completed');
      }
    })
  }
  */

  ngOnDestroy() {
   this.postsSubcription && this.postsSubcription.unsubscribe();
  //  this.intervalSubscription && this.intervalSubscription.unsubscribe();
  }
}
