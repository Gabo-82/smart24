import { TestBed } from '@angular/core/testing';

import { ForefrontSentimentService } from './forefront-sentiment.service';

describe('ForerontSentimentService', () => {
  let service: ForefrontSentimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForefrontSentimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
