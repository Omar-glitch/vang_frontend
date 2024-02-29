import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventoryFormComponent } from './create-inventory-form.component';

describe('CreateInventoryFormComponent', () => {
  let component: CreateInventoryFormComponent;
  let fixture: ComponentFixture<CreateInventoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInventoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
