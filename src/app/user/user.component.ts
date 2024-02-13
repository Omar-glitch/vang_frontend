import { Component } from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  username = 'omar';
  isLoggedIn = false;
  favGame = '';
  games = [
    {
      name: 'turip',
      description: 'quepasa',
      date: '01/01/2000',
    },
    {
      name: 'turip3',
      description: 'quenopasa',
      date: '01/01/2004',
    },
  ];
  greet(message: string) {
    console.log(message);
  }

  getFavorite(name: string) {
    this.favGame = name;
  }
}
