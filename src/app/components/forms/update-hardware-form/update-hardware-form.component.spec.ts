import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHardwareFormComponent } from './update-hardware-form.component';

describe('UpdateHardwareFormComponent', () => {
  let component: UpdateHardwareFormComponent;
  let fixture: ComponentFixture<UpdateHardwareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHardwareFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateHardwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
