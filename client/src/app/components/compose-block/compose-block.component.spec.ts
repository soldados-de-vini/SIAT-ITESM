import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzSelectModule, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ComposeBlockComponent } from './compose-block.component';
import { Course } from 'src/app/models/course.model';
import { environment } from 'src/environments/environment';

describe('ComposeBlockComponent', () => {
  let component: ComposeBlockComponent;
  let fixture: ComponentFixture<ComposeBlockComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeBlockComponent],
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
    fixture = TestBed.createComponent(ComposeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to create a new block', () => {
    const blockDummy: Course = {
      key: 'FSC21',
      name: 'Fisica 2',
      capacity: 30,
      semester: 4,
      initialWeek: 6,
      weeks: 10,
      avenue: ['ICN'],
      typeUF: 'M',
      modules: [
        '266b2fd8-61e4-4b65-be24-8c09f69fd5ea',
        '4043cc8c-8c80-4311-a14b-2ef79c8c9bf9',
      ],
    };

    component.blockForm.setValue(blockDummy);
    component.saveBlock();

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
      url: environment.api_url + '/courses21',
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(201);
    expect(okResponse.result).toBeDefined();
  });

  it('should be able to edit a block', () => {
    const blockId = 'abcd1234';
    const blockDummy: Course = {
      key: 'FSC21',
      name: 'Fisica 2',
      capacity: 30,
      semester: 4,
      initialWeek: 6,
      weeks: 10,
      avenue: ['ICN'],
      typeUF: 'M',
      modules: [
        '266b2fd8-61e4-4b65-be24-8c09f69fd5ea',
        '4043cc8c-8c80-4311-a14b-2ef79c8c9bf9',
      ],
    };

    component.isEditing = true;
    component.blockForm.setValue(blockDummy);
    component.block = blockDummy;
    component.block.id = blockId;
    component.saveBlock();

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Edited successfully.',
      },
      result: {
        id: 'abcd1234',
        key: 'FSC21',
        name: 'Fisica 2',
        capacity: 30,
        semester: 4,
        initialWeek: 6,
        weeks: 10,
        avenue: ['ICN'],
        typeUF: 'M',
        modules: [
          '266b2fd8-61e4-4b65-be24-8c09f69fd5ea',
          '4043cc8c-8c80-4311-a14b-2ef79c8c9bf9',
        ],
      },
    };

    const request = httpTestingController.expectOne({
      method: 'PUT',
      url: environment.api_url + `/courses21/${blockId}`,
    });

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
    expect(okResponse.result).toBeDefined();
  });
});
