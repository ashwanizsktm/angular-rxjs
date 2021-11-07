import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import { DeclaractiveCategoryService } from 'src/app/services/declaractiveCategory.service';
import { DeclaractivepostService } from 'src/app/services/declaractivePost.service';


@Component({
  selector: 'app-declaractive-post',
  templateUrl: './declaractive-post.component.html',
  styleUrls: ['./declaractive-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeclaractivePostComponent implements OnInit {
  // posts$ = this.postService.posts$;
   selectedCategorySubject = new BehaviorSubject<string>('');
   selectedCategoryAction$ = this.selectedCategorySubject.asObservable();
  // selectedCategoryId$ = '';

  posts$ = this.postService.postWithCategories$;
  categories$ = this.categoryService.categories$;

  constructor(private postService: DeclaractivepostService,
    private categoryService: DeclaractiveCategoryService) { }

  // filteredPost$ = this.posts$.pipe(map(((posts) => {
  //   return posts.filter((post) => this.selectedCategoryId$ ? post.categoryId === this.selectedCategoryId$: true)
  // })))

  // using subject way to emit the selected value. let's filter.

  filteredPost$ = combineLatest([this.posts$, this.selectedCategoryAction$]).pipe(
    map(([posts, selectedCategoryId]) => {
      return posts.filter((post) => selectedCategoryId ? post.categoryId === selectedCategoryId: true)
    })
  )

  ngOnInit(): void {
  }

  oncategoryChange(event: any){
    let selectedCategoryId = event.target.value;
    this.selectedCategorySubject.next(selectedCategoryId);
  }

}
