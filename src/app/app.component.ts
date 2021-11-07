import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
  constructor(public loaderService: LoaderService) {}

    // loading$!: Observable<boolean>

    loading$ = this.loaderService.loadingAction$;

    // 2 way to remove ngExpression changed error
    // 1. the first way
  // ngAfterContentChecked(){
  //   this.cd.detectChanges();
  //   this.loading$ = this.loaderService.loadingAction$;
  // }
}
