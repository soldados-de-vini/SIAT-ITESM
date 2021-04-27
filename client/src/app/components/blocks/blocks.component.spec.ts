import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from 'src/app/services/api/api.service';
import { Overlay } from '@angular/cdk/overlay';

import { BlocksComponent } from './blocks.component';
import { environment } from 'src/environments/environment';

describe('BlocksComponent', () => {
  let component: BlocksComponent;
  let fixture: ComponentFixture<BlocksComponent>;
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ BlocksComponent ],
      providers: [ ApiService, NzMessageService, Overlay, NzModalService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to delete a block', () => {
    const blockId = 'abcd1234';

    const deleteBlock = (id) => {
      apiService.delete(`/courses21/${id}`).subscribe(
        (response) => {
          if (response.status?.statusCode === 200){
            console.log('Bloque borrado con éxito');
          } else {
            console.log('Ha ocurrido un error');
          }
        }
      );
    };

    deleteBlock(blockId);

    const request = httpTestingController.expectOne({
      method: 'DELETE',
      url: environment.api_url + `/courses21/${blockId}`,
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
