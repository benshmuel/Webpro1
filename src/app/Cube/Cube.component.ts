/**
 * Created by benshmuel on 17/05/2017.
 */
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {GameService} from '../gameService.service';

@Component ({
  selector: 'cube',
  styleUrls: ['./Cube.css'],
  template:`
    <img src= {{Img}} (click)="clicker($event)" [style.width.px]="wid" [style.height.px]="hei" [style.opacity]="opac"  />
  
  `
})
export class CubeComponent {
  Img: string;
  flagged: boolean;
  revealed: boolean;
  cubeValue: any;
  cubeOnBoard: number;
  wid: number;
  hei: number;
  opac: number;
  @Output() CubeClicked: EventEmitter<any> = new EventEmitter();
  constructor(private _gameService: GameService) {
    this.Img = '../assets/cube.png';
    this.flagged = false;
    this.revealed = false;
    this.cubeValue = 0;
    this.cubeOnBoard = this._gameService.getPosition();
    // this._gameService.setCubeArr(this);
     this.wid = this.hei = this._gameService.calcSizeOfCube();
  }
  clicker(event): void {
    event.target.parentNode.onclick = this._gameService.userClick(event , this);
    console.log('clicked');
  }
  resize(): void {
    this.wid = this.hei = this._gameService.calcSizeOfCube();
  }

  ChangeOpacity(opacity): void {
    this.opac = opacity;
  }


}

