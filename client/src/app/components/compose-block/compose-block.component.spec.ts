import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeBlockComponent } from './compose-block.component';

describe('ComposeBlockComponent', () => {
  let component: ComposeBlockComponent;
  let fixture: ComponentFixture<ComposeBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
