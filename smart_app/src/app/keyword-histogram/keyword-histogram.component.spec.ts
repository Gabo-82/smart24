import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordHistogramComponent } from './keyword-histogram.component';

describe('KeywordHistogramComponent', () => {
  let component: KeywordHistogramComponent;
  let fixture: ComponentFixture<KeywordHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordHistogramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeywordHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
