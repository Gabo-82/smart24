import { TestBed } from '@angular/core/testing';

import { ForerontSentimentService } from './foreront-sentiment.service';

describe('ForerontSentimentService', () => {
  let service: ForerontSentimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForerontSentimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
