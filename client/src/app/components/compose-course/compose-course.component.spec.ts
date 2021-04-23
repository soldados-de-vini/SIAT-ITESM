import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeCourseComponent } from './compose-course.component';

describe('ComposeCourseComponent', () => {
  let component: ComposeCourseComponent;
  let fixture: ComponentFixture<ComposeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
