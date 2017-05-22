import {
  Component, ViewChildren, QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import {CubeComponent} from './Cube/Cube.component';
import {GameService} from './gameService.service';


@Component({
  selector: 'app-root',
  providers : [ GameService] ,
  styleUrls: ['./app.component.css'],
  template: ` 
            <div class = "gamePanel">
              <GameSettings (setGame)="setGameVals($event)" >
              </GameSettings>
            </div>
            
            <div class="flag" align="center">
            <label>{{flagsLeft}}</label>
            <img src="../assets/mainflag.png"/>
              <label>{{ gameMessage }}</label>
              <img (click)="superman()" src="../assets/superman.png"/>
            </div>
      
    <table *ngIf="isready">

      <tbody>
      <tr  *ngFor="let Row of createRange('h'); ">
        <td *ngFor="let Cube of createRange('w');" [style.width.px]="dynWidth"  [style.height.px]="dynHeight">
          <div >
            <cube  #cube [style.display]="getControlsOnStyleDisplay()"></cube>
          </div>
         
        </td>
      </tr>


      </tbody>


    </table>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChildren('cube') cub: QueryList<CubeComponent>;
  revealed = false;
  Width: number;
  Height: number;
  flagsLeft: number;
  gameMessage: string;
  mines: number;
  controlsOn = false;
  dynWidth = 50;
  dynHeight: number;
  isready = true;
  constructor(private _gameService: GameService) {
    this.flagsLeft = 5;
    _gameService.flagChanger.subscribe((value) => {
      this.flagsLeft = value;
    });
    _gameService.UserMessage.subscribe((msg) => {
      this.gameMessage = msg;
    });

  }
  createRange(TableValue) { // in other words : for loop
    var number = ((TableValue === 'w') ? this.Width : this.Height );
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  // data passed from GameSetting component
  setGameVals(event): void {
    this.Width = event.w;
    this.Height = event.h;
    this.mines = Math.min(this.Width * this.Height, event.m);
    this.dynWidth = this._gameService.calcSizeOfCube() * 0.9;            // making table properties dynamic
    this.dynHeight = this._gameService.calcSizeOfCube() * 0.9 - 2;
    this._gameService.runGame(this.Width , this.Height , this.mines);
    setTimeout(() => {
      console.log('woke up !!!!!!####!!');
      this.Start();
    }, 25);
  }

  getControlsOnStyleDisplay() {
    if (this.controlsOn) {
      return 'block';
    } else {
      return 'show';
    }
  }

  Start(): void {
    this._gameService.FillArray(this.cub);
  }

  superman() {
    this._gameService.SupermanClick();
  }
}

