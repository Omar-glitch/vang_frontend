import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHardwareFormComponent } from './create-hardware-form.component';

describe('CreateHardwareFormComponent', () => {
  let component: CreateHardwareFormComponent;
  let fixture: ComponentFixture<CreateHardwareFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHardwareFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHardwareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
