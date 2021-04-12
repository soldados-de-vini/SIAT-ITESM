import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventService);
  });

  it('should be able to publish and subscribe to events', () => {
    let isTesting = false;

    service.subscribe('test', (data) => {
      isTesting = data;
    });

    service.publish('test', true);

    expect(isTesting).toBeTrue();
  });
});
