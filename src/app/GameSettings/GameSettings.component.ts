/**
 * Created by benshmuel on 12/05/2017.
 */
import { Component , Output , EventEmitter } from '@angular/core';

@Component ({
  selector : 'GameSettings',
  templateUrl: './GameSettings.html',
  styleUrls: ['./GameSettings.css']
})


export class GameSettingsComponent {
  Width: number;
  Height: number;
  mines: number;
  @Output() setGame: EventEmitter <any> = new EventEmitter<any>();

  onClick(w: number , h: number , m: number): void { // w,h,m stands for width ,height ,mines.

    this.setGame.emit({ w , h , m });
  }
}
