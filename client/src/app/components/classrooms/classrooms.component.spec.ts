import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsComponent } from './classrooms.component';

describe('ClassroomComponent', () => {
  let component: ClassroomsComponent;
  let fixture: ComponentFixture<ClassroomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
