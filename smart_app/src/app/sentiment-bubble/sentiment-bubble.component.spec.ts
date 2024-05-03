import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentBubbleComponent } from './sentiment-bubble.component';

describe('SentimentBubbleComponent', () => {
  let component: SentimentBubbleComponent;
  let fixture: ComponentFixture<SentimentBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentBubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
