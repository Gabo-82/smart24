import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryKeywordNewsListComponent } from './country-keyword-news-list.component';

describe('CountryKeywordNewsListComponent', () => {
  let component: CountryKeywordNewsListComponent;
  let fixture: ComponentFixture<CountryKeywordNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryKeywordNewsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryKeywordNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
