import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaractivePostComponent } from './declaractive-post.component';

describe('DeclaractivePostComponent', () => {
  let component: DeclaractivePostComponent;
  let fixture: ComponentFixture<DeclaractivePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaractivePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaractivePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
