import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    UserComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular_frontend';

  // constructor(private readonly router: Router) {
  //   this.router.events.subscribe(() => {
  //     initFlowbite();
  //   });
  // }

  ngOnInit(): void {
    initFlowbite();
  }
}
