import { TestBed } from '@angular/core/testing';

import { BeerAPIService } from './beer-api.service';

describe('BeerAPIService', () => {
  let service: BeerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
