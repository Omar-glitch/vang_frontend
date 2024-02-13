import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  @Input() gameInfo = {
    name: '',
    date: '',
    description: '',
  };

  @Output() addFavGameEvent = new EventEmitter<string>();

  fav(name: string) {
    this.addFavGameEvent.emit(name);
  }
}
