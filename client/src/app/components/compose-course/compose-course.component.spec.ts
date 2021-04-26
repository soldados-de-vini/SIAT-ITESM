import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';

import { ComposeCourseComponent } from './compose-course.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ComposeCourseComponent', () => {
  let component: ComposeCourseComponent;
  let fixture: ComponentFixture<ComposeCourseComponent>;
  let api: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeCourseComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
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
    httpTestingController = TestBed.inject(HttpTestingController);
    api = TestBed.inject(ApiService);
  });

  it('should create a new course', () => {
    const testCourse = {
      key: 'MA100',
      name: 'Mate 1',
      capacity: 50,
      avenue: ['IIC'],
      typeUF: 'TEC20',
      semester: '4',
      initialWeek: 5,
      weeks: 5
    };

    component.courseForm.setValue(testCourse);
    component.addCourse();

    const successResponse = {
      status: {
        statusCode: 201,
        message: 'Created successfully.',
      }
    };
    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/courses',
    });

    request.flush(successResponse);

    expect(successResponse.status.statusCode).toBe(201);
  });

  it('should be able to edit a course', () => {
    const courseId = 'abcd1234';
    const testCourse = {
      key: 'MA100',
      name: 'Mate 1',
      capacity: 50,
      avenue: ['IIC'],
      typeUF: 'TEC20',
      semester: '4',
      initialWeek: 5,
      weeks: 5
    };
    component.isEditing = true;
    component.courseForm.setValue(testCourse);
    component.course = testCourse;
    component.course.id = courseId;
    component.editCourse();

    const successResponse = {
      status: {
        statusCode: 200,
        message: 'Created successfully.',
      }
    };
    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: environment.api_url + `/courses/${courseId}`,
    });
    request.flush(successResponse);
    expect(successResponse.status.statusCode).toBe(200);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
