import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfNewsComponent } from './card-of-news.component';

describe('CardOfNewsComponent', () => {
  let component: CardOfNewsComponent;
  let fixture: ComponentFixture<CardOfNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOfNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOfNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
