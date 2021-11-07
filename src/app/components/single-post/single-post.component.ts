import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY } from 'rxjs';
import { DeclaractivepostService } from 'src/app/services/declaractivePost.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent implements OnInit {
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageSubjectAction$ = this.errorMessageSubject.asObservable();

  singlePost$ = this.postService.singlePost$.pipe(
    catchError((error: string) => {
      this.errorMessageSubject.next(error);
      // this.errorMessage = error
      // console.log(this.errorMessage);
       return EMPTY;
    })
  );

  constructor(private postService: DeclaractivepostService) { }

  ngOnInit(): void {

  }

}
