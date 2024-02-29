import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriesPageComponent } from './inventories-page.component';

describe('InventoriesPageComponent', () => {
  let component: InventoriesPageComponent;
  let fixture: ComponentFixture<InventoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoriesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
