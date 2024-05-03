import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactCheckComponent } from './fact-check.component';

describe('FactCheckComponent', () => {
  let component: FactCheckComponent;
  let fixture: ComponentFixture<FactCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
