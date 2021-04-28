import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';

import { ComposeClassroomComponent } from './compose-classroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ComposeClassroomComponent', () => {
  let component: ComposeClassroomComponent;
  let fixture: ComponentFixture<ComposeClassroomComponent>;
  let api: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeClassroomComponent ],
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
    fixture = TestBed.createComponent(ComposeClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
    api = TestBed.inject(ApiService);
  });

  it('should create a new classroom', () => {
    const testClassroom = {
      administrator: 'MVLKA',
      building: '3',
      capacity: 35,
      classroom: 2306,
      comments: 'Muy cool',
      currentDiv: 'NV',
      entrance: 'A',
      school: 'Ciencias',
      status: 'Activo',
      type: 'A'
    };

    component.classroomForm.setValue(testClassroom);
    component.addClassroom();

    const successResponse = {
      status: {
        statusCode: 201,
        message: 'Created successfully.',
      }
    };
    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/classrooms',
    });

    request.flush(successResponse);

    expect(successResponse.status.statusCode).toBe(201);
  });

  it('should be able to edit a classroom', () => {
    const classroomId = 'abcd1234';
    const testClassroom = {
      administrator: 'MVLKA',
      building: '3',
      capacity: 35,
      classroom: 2306,
      comments: 'Muy cool',
      currentDiv: 'NV',
      entrance: 'A',
      school: 'Ciencias',
      status: 'Activo',
      type: 'A'
    };
    component.isEditing = true;
    component.classroomForm.setValue(testClassroom);
    component.classroom = testClassroom;
    component.classroom.id = classroomId;
    component.editClassroom();

    const successResponse = {
      status: {
        statusCode: 200,
        message: 'Created successfully.',
      }
    };
    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: environment.api_url + `/classrooms/${classroomId}`,
    });
    request.flush(successResponse);
    expect(successResponse.status.statusCode).toBe(200);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
