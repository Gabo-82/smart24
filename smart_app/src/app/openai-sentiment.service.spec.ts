import { TestBed } from '@angular/core/testing';

import { OpenaiSentimentService } from './openai-sentiment.service';

describe('OpenaiSentimentService', () => {
  let service: OpenaiSentimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiSentimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
