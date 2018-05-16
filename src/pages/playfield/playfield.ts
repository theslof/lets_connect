import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-playfield',
  templateUrl: 'playfield.html',
})
export class PlayfieldPage {

  gameGrid: string[][];
  width=7;
  height=6;
  coins = {
    blank: "assets/imgs/coin-none.svg",
    red: "assets/imgs/coin-red.svg",
    yellow: "assets/imgs/coin-yellow.svg"
  };

  placeCoinPosition: number = 0;
  dropping: boolean = false;
  playerOneTurn: boolean = true;
  placedY: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gameGrid = new Array(this.height);
    this.drawPlayfield();
  }

  private drawPlayfield() {
    for(let i = 0; i < this.gameGrid.length; i++){
      this.gameGrid[i] = new Array(this.width);
      for(let j = 0; j < this.gameGrid[i].length; j++){
        this.gameGrid[i][j] = this.coins.blank;
      }
    }
  }

  private getPlaceCoinPosition() {
    return (100/this.width)*this.placeCoinPosition + "%";
  }

  private getPlacedY() {
    for(this.placedY=5; this.placedY>=0; this.placedY--) {
      if (this.gameGrid[this.placedY][this.placeCoinPosition] === this.coins.blank) return this.placedY;
    }
  }

  private getNextCoin() {
    if (this.playerOneTurn) return this.coins.yellow;
    return this.coins.red;

  }

  private dropCoin(x: number, y: number ,coinColor: any) {
    this.gameGrid[y][x] = coinColor;
  }

  private isPlaced(x,y) {
    return (this.gameGrid[y][x] !== this.coins.blank);
  }

  private getPlayers() {
    // Hämta användare och motståndare från db
    return "Player 1 - Player 2"
  }

  private getCoinWidthStyle() {
    return 100/this.width + "%";
  }

  private moveLeft() {
    if(this.placeCoinPosition < this.width-1) {
      if(this.dropping) this.switchTurn();
      this.dropping = false;
      this.placeCoinPosition++;
    }
  }

  private moveRight() {
    if(this.placeCoinPosition > 0) {
      if(this.dropping) this.switchTurn();
      this.dropping = false;
      this.placeCoinPosition--;
    }
  }

  private moveDown() {
    this.dropping = true;
    this.dropCoin(this.placeCoinPosition, this.getPlacedY(), this.getNextCoin());
  }

  private nextPlayerTurn() {
    this.switchTurn();
    this.dropping = false;
  }

  private switchTurn() {
    this.playerOneTurn = !this.playerOneTurn
  }

}
