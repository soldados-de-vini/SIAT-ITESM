import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeClassroomComponent } from './compose-classroom.component';

describe('ComposeClassroomComponent', () => {
  let component: ComposeClassroomComponent;
  let fixture: ComponentFixture<ComposeClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
