import { TestBed } from '@angular/core/testing';

import { collectionService } from './collection.service';

describe('collectionService', () => {
  let service: collectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(collectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
