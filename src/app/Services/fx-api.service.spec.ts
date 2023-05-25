import { TestBed } from '@angular/core/testing';

import { FxApiService } from './fx-api.service';

describe('FxApiService', () => {
  let service: FxApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FxApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
