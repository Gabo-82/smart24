import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMapComponent } from './news-map.component';

describe('NewsMapComponent', () => {
  let component: NewsMapComponent;
  let fixture: ComponentFixture<NewsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
