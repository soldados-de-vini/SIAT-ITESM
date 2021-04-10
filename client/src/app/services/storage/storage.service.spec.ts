import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key: string): string => {
     return store[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      return store[key] = ( value as string);
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
      delete store[key];
    });

    service = TestBed.inject(StorageService);
  });

  it('should be to save and get a value on local storage', () => {
    service.setProperty('foo', 'bar');
    expect(service.getProperty('foo')).toBe('bar');
  });

  it('should be to remove a value on local storage', () => {
    service.setProperty('foo', 'bar');
    expect(service.getProperty('foo')).toBe('bar');
    service.removeProperty('foo');
    expect(service.getProperty('foo')).toBeNull();
  });
});
