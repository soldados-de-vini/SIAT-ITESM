import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeModuleComponent } from './compose-module.component';

describe('ComposeModuleComponent', () => {
  let component: ComposeModuleComponent;
  let fixture: ComponentFixture<ComposeModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
