import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-min-inventory-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './min-inventory-button.component.html',
})
export class MinInventoryButtonComponent {
  visible = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  refreshAdd() {
    this.inventoryService.getInventories({ min: 'true' }).then((res) => {
      this.visible = Boolean(res.data.length);
    });
  }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e.type === 1) this.refreshAdd();
    });
  }
}
