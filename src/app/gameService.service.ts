/**
 * Created by benshmuel on 18/05/2017.
 */
import {Injectable} from '@angular/core';
import {CubeComponent} from './Cube/Cube.component';
import {  } from '@angular/core/src/facade/async';
import {Subject} from 'rxjs/Subject';
export var Board_Width: number;
export var Board_Height: number;
export var Board_mines: number;
export var CubeArr: Array<CubeComponent> = []; // any;
export var cubePosition = 0;
export var flagesOverMines = {hit: 0 , miss: 0};
export var GameOver: boolean;
export var superOn: boolean;
export var CubeRadious = (currentIndex , callFunc) => {

  var isInRange = (checkIndex) => {
    if (checkIndex >= 0 && checkIndex < CubeArr.length) {
      callFunc(CubeArr[checkIndex]); // outside
    }
  };
  isInRange(currentIndex);
  if (currentIndex % Board_Width !== 0) {
    isInRange(currentIndex - 1);
    isInRange(currentIndex - Board_Width - 1);
    isInRange(currentIndex + Board_Width - 1);
  }
  if (currentIndex % Board_Width !== Board_Width - 1) {
    isInRange(currentIndex + 1);
    isInRange(currentIndex - Board_Width + 1);
    isInRange(currentIndex + Board_Width + 1);
  }
  isInRange(currentIndex - Board_Width);
  isInRange(currentIndex + Board_Width);
}
export  var resize: number;
export var ChangeCubeState = (Cube) => {
  Cube.ChangeOpacity(1);
  if (!Cube.revealed && !Cube.flagged) {
    if (Cube.cubeValue === '*') {
    }
    else {
      Cube.revealed = true;
      if (Cube.cubeValue === 0) {
        Cube.Img = '../assets/clear.png';
        CubeRadious(Cube.cubeOnBoard , ChangeCubeState);
      }
      else {
        Cube.Img = 'assets/' + Cube.cubeValue + '.png';
      }
    }
  }


}
export var boardInit = () => {

  for (var i = 0; i < CubeArr.length ; i ++) {
    CubeArr[i].Img = '../assets/cube.png';
    CubeArr[i].cubeOnBoard = i;
    CubeArr[i].cubeValue = 0;
    CubeArr[i].flagged = false;
    CubeArr[i].revealed = false;
    CubeArr[i].wid = resize;
    CubeArr[i].hei = resize;
    CubeArr[i].ChangeOpacity(1);
  }

}

@Injectable ()
export class GameService {
  flagChanger: Subject<number> = new Subject<number>();
  UserMessage: Subject<string> = new Subject<string>();
  runGame(w, h, m) {
    this.UserMessage.next('');
    boardInit();
    superOn = false;
    flagesOverMines.miss = flagesOverMines.hit = 0;
    Board_Width = w / 1;
    Board_Height = h / 1;
    Board_mines = m / 1;
    if (GameOver) {
      boardInit(); }
    GameOver = false;
    resize = this.calcSizeOfCube();
    this.flagsHandler();
    boardInit();
      setTimeout(() => {
        this.GameInit();
        console.log('game ready');
      }, 30);
  }

  GameInit() {
    var addValueToCube = (Cube) => {
      if (Cube.cubeValue !== '*') {
        Cube.cubeValue++;
      }
    }
    for (var i = 0; i < Board_mines; i++) {
      var Position = Math.floor(Math.random() * CubeArr.length);
      if (CubeArr[Position].cubeValue !== '*') {
        CubeArr[Position].cubeValue = '*';
        CubeRadious(Position , addValueToCube);
      }
      else {
        i--;
      }
    }
  }

  getPosition() {
    return cubePosition++;
  }
  userClick(event , Cube) {
    if (!GameOver) {
      if (event.shiftKey) {
        if (flagesOverMines.hit + flagesOverMines.miss === Board_mines) {
          alert('Whoops ! no more flags left :)');
        }
        else {
          Cube.flagged = !Cube.flagged;
          Cube.Img = Cube.flagged ? this.relvtImg(1) : this.relvtImg(0);
          var selector = Cube.flagged ? 1 : -1;
          Cube.cubeValue === '*' ? flagesOverMines.hit += selector : flagesOverMines.miss += selector;
          this.flagsHandler();
          if (flagesOverMines.hit === Board_mines) {
            Cube.Img = this.relvtImg(1);
            this.UserMessage.next('Winner !')
            setTimeout(() => {
              alert('Congratz ! you won !!');;
              GameOver = true;
            }, 100);
          }
        }
      }
      else {
        if (Cube.cubeValue === '*') {
          Cube.ChangeOpacity(1);
          this.UserMessage.next('Game Over');
          this.gameOver();
        }
        else {
          ChangeCubeState(CubeArr[Cube.cubeOnBoard]);
        }

      }
    }
  }
  relvtImg(selector) {
    return selector === 0 ? '../assets/cube.png' : '../assets/flag.png';
  }

  gameOver () { //
    GameOver = !GameOver;
    for (var i = 0 ; i < CubeArr.length ; i++) {
      if (CubeArr[i].cubeValue === '*') {
        CubeArr[i].Img = '../assets/mine.png' ;
      }
    }
  }

  flagsHandler() {
    this.flagChanger.next(Board_mines - flagesOverMines.hit - flagesOverMines.miss);
  }
  calcSizeOfCube () {
    return (((10 / Board_Height) * 50 ) + 5) < 50 ? (((10 / Board_Height) * 50 ) + 11)  : 50;
  }
  FillArray (arr) {
    CubeArr = arr.toArray();
    boardInit();

  }

  SupermanClick () {
    superOn = ! superOn;
    var identifier = !superOn ? 1 : 0.2 ;
    if (CubeArr) {
    for ( var i = 0; i < CubeArr.length ; i++) {
        if (!CubeArr[i].revealed) {
          CubeArr[i].ChangeOpacity(identifier);
          superOn ? CubeArr[i].Img = 'assets/' + CubeArr[i].cubeValue + '.png' : CubeArr[i].Img = 'assets/cube.png';
          CubeArr[i].flagged ? CubeArr[i].Img = 'assets/flag.png' : console.log();
        }
        else {
          CubeArr[i].cubeValue === '*' ? CubeArr[i].Img = 'assets/mine.png' : console.log();
        }

    }
    }
  }
}
