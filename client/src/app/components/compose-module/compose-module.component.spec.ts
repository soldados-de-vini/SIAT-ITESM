import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSelectModule, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ComposeModuleComponent } from './compose-module.component';
import { Module } from 'src/app/models/module.model';
import { environment } from 'src/environments/environment.prod';

describe('ComposeModuleComponent', () => {
  let component: ComposeModuleComponent;
  let fixture: ComponentFixture<ComposeModuleComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeModuleComponent],
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
    fixture = TestBed.createComponent(ComposeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to create a new module', () => {
    const moduleDummy: Module = {
      name: 'Matemáticas',
    };

    component.moduleForm.setValue(moduleDummy);
    component.saveModule();

    const okResponse = {
      status: {
        statusCode: 201,
        message: 'Created successfully.',
      },
      result: [
        {
          name: 'Matemáticas',
        },
      ],
    };

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/modules',
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(201);
    expect(okResponse.result).toBeDefined();
  });

  it('should be able to edit a module', () => {
    const moduleId = 'abcd1234';
    const moduleDummy: Module = {
      name: 'Matemáticas',
    };

    component.isEditing = true;
    component.moduleForm.setValue(moduleDummy);
    component.module = moduleDummy;
    component.module.id = moduleId;
    component.saveModule();

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Edited successfully.',
      },
      result: {
        name: 'Matemáticas',
        id: 'abcd1234'
      },
    };

    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: environment.api_url + `/modules/${moduleId}`,
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
    expect(okResponse.result).toBeDefined();
  });
});
