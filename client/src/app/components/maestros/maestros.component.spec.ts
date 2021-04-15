import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrosComponent } from './maestros.component';

describe('MaestrosComponent', () => {
  let component: MaestrosComponent;
  let fixture: ComponentFixture<MaestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
