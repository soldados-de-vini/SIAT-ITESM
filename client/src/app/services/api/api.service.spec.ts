import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be able to perform a post request', () => {
    const userDummy = {
      email: 'test@gmail.com',
      name: 'Test Guy',
      nomina: 'L0123456',
      password: 'pass123',
    };

    let user;

    service.post('/auth/register', userDummy).subscribe((u) => {
      user = u;
    });

    const request = httpTestingController.expectOne({
      method: 'POST',
      url: environment.api_url + '/auth/register'
    });

    request.flush(userDummy);

    expect(user).toEqual(userDummy);
  });

});
