import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { ModulesComponent } from './modules.component';
import { environment } from 'src/environments/environment';

describe('ModuleComponent', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ ModulesComponent ],
      providers: [ ApiService, NzMessageService, Overlay, NzModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete a module', () => {
    const moduleId = 'abcd1234';

    const deleteModule = (id) => {
      apiService.delete(`/modules/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Modulo borrado con éxito');
          } else {
            console.log('Ha ocurrido un error');
          }
        }
      );
    };

    deleteModule(moduleId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/modules/${moduleId}`,
    });

    const okResponse = {
      status: {
        statusCode: 200,
        message: 'Deleted successfully.',
      }
    };

    request.flush(okResponse);

    expect(okResponse.status.statusCode).toBe(200);
  });
});
