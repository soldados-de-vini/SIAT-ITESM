import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ComposeCourseComponent } from './compose-course.component';

describe('ComposeCourseComponent', () => {
  let component: ComposeCourseComponent;
  let fixture: ComponentFixture<ComposeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeCourseComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        ApiService,
        NzMessageService,
        Overlay,
        {
          provide: NzModalRef,
          useValue: {
            destroy: () => {},
            getInstance: () => {
              return {
                setFooterWithTemplate: () => {},
              };
            },
          },
        },
      ]
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
