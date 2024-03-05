import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwaresPageComponent } from './hardwares-page.component';

describe('HardwaresPageComponent', () => {
  let component: HardwaresPageComponent;
  let fixture: ComponentFixture<HardwaresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HardwaresPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HardwaresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
