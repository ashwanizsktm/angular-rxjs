import { Component, OnInit } from '@angular/core';
import { combineLatest, map, tap } from 'rxjs';
import { IPost } from 'src/app/models/IPost';
import { DeclaractivepostService } from 'src/app/services/declaractivePost.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-alt-post',
  templateUrl: './alt-post.component.html',
  styleUrls: ['./alt-post.component.scss'],
})
export class AltPostComponent implements OnInit {
  showAddPost = false;
  constructor(private postService: DeclaractivepostService) {}

  posts$ = this.postService.postWithCategories$.pipe(
    tap((posts) => {
      posts[0].id && this.postService.selectPost(posts[0].id);
    })
  );

  selectedPost$ = this.postService.singlePost$;

  vm$ = combineLatest([this.posts$, this.selectedPost$]).pipe(
    map(([posts, selectedPost]) => {
      return {
        posts,
        selectedPost,
      };
    })
  );

  ngOnInit(): void {}

  onSelectPost(post: IPost) {
    if (post.id) this.postService.selectPost(post.id);
  }

  onAddPost() {
   this.showAddPost = true
  }
}
