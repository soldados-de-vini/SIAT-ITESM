import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposePeriodComponent } from './compose-period.component';

describe('ComposePeriodComponent', () => {
  let component: ComposePeriodComponent;
  let fixture: ComponentFixture<ComposePeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposePeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
