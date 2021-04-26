import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NzMessageService, NzModalRef, NzSelectModule } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ComposeProfessorComponent } from './compose-professor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Professor } from 'src/app/models/professor.model';
import { environment } from 'src/environments/environment';

describe('ComposeProfessorComponent', () => {
  let component: ComposeProfessorComponent;
  let fixture: ComponentFixture<ComposeProfessorComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeProfessorComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NzSelectModule,
        BrowserAnimationsModule,
      ],
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to create a new professor', () => {
    const professorDummy: Professor = {
      name: 'Jirafales',
      nomina: 'L012345678',
      coordination: 'coordinacion',
      area: ['matemáticas'],
      email: 'jirafales@gmail.com',
      loadLimit: 15,
    };

    component.professorForm.setValue(professorDummy);
    component.saveProfessor();

    const okResponse = {
      status: {
        statusCode: 201,
        message: 'Created successfully.',
      },
      result: [
        {
          name: 'Jirafales',
          nomina: 'L012345678',
          coordination: 'coordinacion',
          area: ['matemáticas'],
          email: 'jirafales@gmail.com',
          loadLimit: 15,
        },
      ],
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/professors',
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(201);
    expect(okResponse.result).toBeDefined();
  });

  it('should be able to edit a professor', () => {
    const professorId = 'abcd1234';
    const professorDummy: Professor = {
      name: 'Jirafales',
      nomina: 'L012345678',
      coordination: 'coordinacion',
      area: ['matemáticas'],
      email: 'jirafales@gmail.com',
      loadLimit: 15,
    };

    component.isEditing = true;
    component.professorForm.setValue(professorDummy);
    component.professor = professorDummy;
    component.professor.id = professorId;
    component.saveProfessor();

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Edited successfully.',
      },
      result: {
        name: 'Jirafales',
        nomina: 'L012345678',
        coordination: 'coordinacion',
        area: ['matemáticas'],
        email: 'jirafales@gmail.com',
        loadLimit: 15,
        id: 'abcd1234',
      },
    };

    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: environment.api_url + `/professors/${professorId}`,
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
    expect(okResponse.result).toBeDefined();
  });
});
