import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-remove-filter-button',
  standalone: true,
  imports: [],
  templateUrl: './remove-filter-button.component.html',
})
export class RemoveFilterButtonComponent {
  @Input({ required: true }) name: string = '';
  visible = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  removeFilters() {
    this.router.navigate([`/dashboard/${this.name}`], {
      relativeTo: this.route,
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.visible = Boolean(params.keys.length);
    });
  }
}
