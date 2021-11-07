import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DeclaractiveCategoryService } from 'src/app/services/declaractiveCategory.service';
import { DeclaractivepostService } from 'src/app/services/declaractivePost.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent implements OnInit {

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    categoryid: new FormControl('')
  })
  constructor(private categoryService: DeclaractiveCategoryService,
    private postService: DeclaractivepostService) { }

  categories$ = this.categoryService.categories$;
  ngOnInit(): void {
  }

  onAddPost(){
   this.postService.addPost(this.postForm.value);
  }

}
