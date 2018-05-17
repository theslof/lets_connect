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

  //----------------------------------------------
  // Get data from db here.
  //

  // Get display names from db.
  private getPlayers() {
    return "Player 1 - Player 2"
  }

  //----------------------------------------------
  // Helper functions.
  //

  // Returns coin width based on grid size.
  private getCoinWidthStyle() {
    return 100/this.width + "%";
  }

  // Returns the coin position in % for top placing box.
  private getPlaceCoinPosition() {
    return (100/this.width)*this.placeCoinPosition + "%";
  }

  //----------------------------------------------
  // Grid logic.
  //

  // Draw the main grid.
  private drawPlayfield() {
    for(let i = 0; i < this.gameGrid.length; i++){
      this.gameGrid[i] = new Array(this.width);
      for(let j = 0; j < this.gameGrid[i].length; j++){
        this.gameGrid[i][j] = this.coins.blank;
      }
    }
  }

  // Place coin in grid.
  private dropCoin(x: number, y: number ,coinColor: any) {
    this.gameGrid[y][x] = coinColor;
  }

  // Cheks if there is a coin placed in grid.
  private isPlaced(x,y) {
    return (this.gameGrid[y][x] !== this.coins.blank);
  }

  // Returns number of empty slots in the column under the placing coin.
  private getPlacedY() {
    for(this.placedY=5; this.placedY>=0; this.placedY--) {
      if (this.gameGrid[this.placedY][this.placeCoinPosition] === this.coins.blank) return this.placedY;

    }
  }

  //----------------------------------------------
  // Controller and turn switching logic.
  //

  // Control buttons.
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

  // Aborts animation and switches to next player.
  private nextPlayerTurn() {
    this.switchTurn();
    this.dropping = false;
  }

  // Switch player
  private switchTurn() {
    this.playerOneTurn = !this.playerOneTurn
  }

  // Switches between yellow and red and returns the color.
  private getNextCoin() {
    if (this.playerOneTurn) return this.coins.yellow;
    return this.coins.red;
  }

}
