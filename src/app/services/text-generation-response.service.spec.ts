import { TestBed } from '@angular/core/testing';

import { TextGenerationResponseService } from './text-generation-response.service';

describe('TextGenerationResponseService', () => {
  let service: TextGenerationResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextGenerationResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
