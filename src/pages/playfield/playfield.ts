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

  dummyGrid: string[][];
  savedGridString: string;
  testGridString: string;
  stepX: number;
  stepY: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

  // Returns the hidden button size. Based on placment coin.
  private getHiddenMoveButtonsPosition() {
    console.log((100/this.width)*this.placeCoinPosition + "%");
    return ((100/this.width)*this.placeCoinPosition)-10 + "%";
  }

  //
  private getMoveRightWidth() {
    return ((100/this.width)*this.placeCoinPosition)-10 + "%";
  }

  //
  private getMoveLeftWidth() {
    return 90-(((100/this.width)*this.placeCoinPosition)) + "%";
  }


  //----------------------------------------------
  // Grid logic.
  //

  // Draw the main grid.
  private drawPlayfield() {
    this.gameGrid = new Array(this.height);
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
    if (this.getPlacedY() <= 5) {
      this.dropping = true;
      this.dropCoin(this.placeCoinPosition, this.getPlacedY(), this.getNextCoin());
    }
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

  //----------------------------------------------
  // Dev tools
  //

  private JSONstringifyGrid() {
    this.savedGridString = JSON.stringify(this.gameGrid);
    console.log(this.savedGridString);
  }

  private clearGrid() {
    this.drawPlayfield();
    this.stepX = this.width-1;
    this.stepY = this.height-1;
  }

  private loadGrid() {
    this.dummyGrid = JSON.parse(this.savedGridString);
    this.gameGrid = this.dummyGrid;
  }

  private stepFromLoadedGrid() {
    let blank = true;
    this.dropping = true;

    while (blank && this.stepY >= 0) {

      if (this.dummyGrid[this.stepY][this.stepX] !== this.coins.blank) blank = false;

      if (this.stepY < this.height && this.stepY >= 0) {
        if (this.stepX < this.width && this.stepX >= 0) {

          this.placedY = this.stepY;
          this.placeCoinPosition = this.stepX;
          this.dropCoin(this.stepX, this.stepY, this.dummyGrid[this.stepY][this.stepX]);

          console.log("X:" + this.stepX + " Y:" + this.stepY);
          this.stepX--;
        } else {
          blank = true;
          this.stepY--;
          this.stepX = this.width - 1;
        }
      }
    }

  }

}
