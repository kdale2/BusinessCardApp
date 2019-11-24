import { TestBed } from '@angular/core/testing';

import { CloudvisionService } from './cloudvision.service';

describe('CloudvisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudvisionService = TestBed.get(CloudvisionService);
    expect(service).toBeTruthy();
  });
});
