import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Popover, PopoverController} from 'ionic-angular';
import {PopoverMenuData, PopoverPage} from "../popover/popover";
import {fakeAsync} from "@angular/core/testing";
import {Game} from "../../lib/interfaces";


@IonicPage()
@Component({
  selector: 'page-playfield',
  templateUrl: 'playfield.html',
})
export class PlayfieldPage {
  menu: Popover;
  menuData: PopoverMenuData = {
    choices: [
      {icon: "hammer", text: "Clear"},
      {icon: "hammer", text: "Save grid"},
      {icon: "hammer", text: "Load grid"},
      {icon: "hammer", text: "Step move"},
      {icon: "hammer", text: "Switch player"},
      {icon: "hammer", text: "Palay AI"},
      {icon: "close", text: "Surrender"}
    ],
    callback: (index: number) => {this.onOptionsItemSelected(index);}
  };

  gameGrid: string[][];
  width=7;
  height=6;
  coins = {
    blank: "assets/imgs/coin-none.svg",
    red: "assets/imgs/coin-red.svg",
    yellow: "assets/imgs/coin-yellow.svg"
  };

  placeCoinPosition: number = 3;
  dropping: boolean = false;
  playerOneTurn: boolean = true;
  placedY: number;

  dummyGrid: string[][];
  savedGridString: string;
  testGridString: string;
  stepX: number;
  stepY: number;

  win: boolean = false;
  gridCopy: string[][];
  aiBot: boolean = false;

  game: any;
  player1Name: string;
  player2Name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrl: PopoverController) {
    this.game = this.navParams.get("game") as Game;

    this.menu = this.popCtrl.create(PopoverPage, this.menuData);
    this.drawPlayfield();
  }

  //----------------------------------------------
  // Popover
  //

  /*
  <button item-end ion-button small round (click)="nextPlayerTurn()">Switch</button>
    <button item-end ion-button small round (click)="clearGrid()">Clear</button>
    <button item-end ion-button small round (click)="JSONstringifyGrid()">Save</button>
    <button item-end ion-button small round (click)="loadGrid()">Load</button>
    <button item-end ion-button small round (click)="stepFromLoadedGrid()">Step</button>
   */

  public onOptionsItemSelected(id: number){
    console.log("Callback: " + id);
    switch (id) {
      case 0:
        this.clearGrid();
        break;
      case 1:
        this.JSONstringifyGrid();
        break;
      case 2:
        this.loadGrid();
        break;
      case 3:
        this.stepFromLoadedGrid();
        break;
      case 4:
        this.nextPlayerTurn();
        break;
      case 5:
        this.aiBot = !this.aiBot;
        break;
      default:
        console.log("Unknown choice");
    }
  }

  //----------------------------------------------
  // Get data from db here.
  //

  // Get display names from db.
  private getPlayers() {
    return "Player 1 - Player 2";
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
    return ((100/this.width)*this.placeCoinPosition)-45 + "%";
  }

  //
  private getMoveRightWidth() {
    return (100/this.width)*(this.placeCoinPosition+1) + "%";
  }

  //
  private getMoveLeftWidth() {
    return 80-(100/this.width)*(this.placeCoinPosition+1) + "%";
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
      if(this.winCheck(this.getNextCoin())) this.win = true;
    }
  }

  // Aborts animation and switches to next player.
  private nextPlayerTurn() {
    this.switchTurn();
    this.dropping = false;
    if (this.getNextCoin() === this.coins.red && this.aiBot) this.aiMove();
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

  private newGame() {
    this.clearGrid();
    this.dropping = false;
    this.playerOneTurn = true;
    this.placeCoinPosition = 3;
  }

  //----------------------------------------------
  // Win check
  //

  private winCheck(player :string) {

    // verticalCheck
    for (let y=0; y<this.height-3; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          this.gameGrid[y][x] === player &&
          this.gameGrid[y + 1][x] === player &&
          this.gameGrid[y + 2][x] === player &&
          this.gameGrid[y + 3][x] === player
        ) return true;
      }
    }

    // horizontalCheck
    for (let x=0; x<this.width-3; x++) {
      for (let y = 0; y < this.height; y++) {
        if (
          this.gameGrid[y][x] === player &&
          this.gameGrid[y][x + 1] === player &&
          this.gameGrid[y][x + 2] === player &&
          this.gameGrid[y][x + 3] === player
        ) return true;
      }
    }

    // ascendingDiagonalCheck
    for (let x=3; x<this.width; x++) {
      for (let y = 0; y < this.height-3; y++) {
        if (
          this.gameGrid[y][x] === player &&
          this.gameGrid[y + 1][x - 1] === player &&
          this.gameGrid[y + 2][x - 2] === player &&
          this.gameGrid[y + 3][x - 3] === player
        ) return true;
      }
    }

    // descendingDiagonalCheck
    for (let x=3; x<this.width; x++) {
      for (let y = 3; y < this.height; y++) {
        if (
          this.gameGrid[y][x] === player &&
          this.gameGrid[y - 1][x - 1] === player &&
          this.gameGrid[y - 2][x - 2] === player &&
          this.gameGrid[y - 3][x - 3] === player
        ) return true;
      }
    }

    // No win
    return false;

  }

  //----------------------------------------------
  // AI player
  //

  private aiMove() {

    let currentPlayer = this.getNextCoin();
    let otherPlayer = this.coins.yellow;
    let result: boolean;
    let deepGridCopy = JSON.parse(JSON.stringify(this.gameGrid));

    if (currentPlayer === this.coins.yellow) otherPlayer = this.coins.red;

    for (let x = 0; x < this.width; x++) {
      this.gridCopy = JSON.parse(JSON.stringify(this.gameGrid));
      for (let y = this.height - 1; y >= 0; y--) {
        if (this.gridCopy[y][x] === this.coins.blank) {
          this.gridCopy[y][x] = currentPlayer;
          result = this.aiTestOutcome(currentPlayer);
          console.log(x + ", " + y + " - " + result);
          if (result) {
            console.log("100% @ " + x + ", " + y);
            this.aiPlace(x);
            return null;
          }
          break;
        }
      }
    }

    for (let i=0; i<1; i++) {

      for (let x = 0; x < this.width; x++) {
        this.gridCopy = JSON.parse(JSON.stringify(this.gameGrid));
        for (let y = this.height - 1; y >= 0; y--) {
          if (this.gridCopy[y][x] === this.coins.blank) {
            this.gridCopy[y][x] = otherPlayer;
            result = this.aiTestOutcome(otherPlayer);
            console.log(x + ", " + y + " - " + result);
            if (result) {
              console.log("99% @ " + x + ", " + y);
              //deepGridCopy = JSON.parse(JSON.stringify(this.gridCopy));
              this.aiPlace(x);
              return null;
            }
            break;
          }
        }
      }

    }

    let randomX;
    let loopVar =  true;
    let randomY;
    while(loopVar) {

      randomX = Math.floor(Math.random() * this.width);
      for (randomY = this.height - 1; randomY >= 0; randomY--) {

        if (this.gridCopy[randomY][randomX] === this.coins.blank) {
          this.gridCopy = JSON.parse(JSON.stringify(this.gameGrid));
          this.gridCopy[randomY][randomX] = currentPlayer;
          deepGridCopy = JSON.parse(JSON.stringify(this.gridCopy));
          break;
        }

      }


      for (let x = 0; x < this.width; x++) {
        this.gridCopy = JSON.parse(JSON.stringify(deepGridCopy));
        for (let y = this.height - 1; y >= 0; y--) {
          if (this.gridCopy[y][x] === this.coins.blank) {
            this.gridCopy[y][x] = otherPlayer;
            result = this.aiTestOutcome(otherPlayer);
            console.log(x + ", " + y + " - " + result);
            if (result) {
              loopVar = true;
              console.log("Bad move predicted 99%  @ " + randomX + ", " + randomY);
              y = 0;
              x = this.width;
              break;
            } else {
              loopVar = false;
            }
            break;
          }
        }
      }

    }

    console.log("86% @ " + randomX + ", " + randomY);
    this.aiPlace(randomX);

  }

  private aiPlace(x: number) {
    this.placeCoinPosition = x;
    this.moveDown();
    //this.nextPlayerTurn();
  }

  private aiTestOutcome(player :string) {

    // verticalCheck
    for (let y = 0; y < this.height - 3; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          this.gridCopy[y][x] === player &&
          this.gridCopy[y + 1][x] === player &&
          this.gridCopy[y + 2][x] === player &&
          this.gridCopy[y + 3][x] === player
        ) return true;
      }
    }

    // horizontalCheck
    for (let x = 0; x < this.width - 3; x++) {
      for (let y = 0; y < this.height; y++) {
        if (
          this.gridCopy[y][x] === player &&
          this.gridCopy[y][x + 1] === player &&
          this.gridCopy[y][x + 2] === player &&
          this.gridCopy[y][x + 3] === player
        ) return true;
      }
    }

    // ascendingDiagonalCheck
    for (let x = 3; x < this.width; x++) {
      for (let y = 0; y < this.height - 3; y++) {
        if (
          this.gridCopy[y][x] === player &&
          this.gridCopy[y + 1][x - 1] === player &&
          this.gridCopy[y + 2][x - 2] === player &&
          this.gridCopy[y + 3][x - 3] === player
        ) return true;
      }
    }

    // descendingDiagonalCheck
    for (let x = 3; x < this.width; x++) {
      for (let y = 3; y < this.height; y++) {
        if (
          this.gridCopy[y][x] === player &&
          this.gridCopy[y - 1][x - 1] === player &&
          this.gridCopy[y - 2][x - 2] === player &&
          this.gridCopy[y - 3][x - 3] === player
        ) return true;
      }
    }

    // No win
    return false;
  }


  //----------------------------------------------
  // Dev tools
  //

  private JSONstringifyGrid() {
    this.savedGridString = JSON.stringify(this.gameGrid);
    console.log(this.savedGridString);
  }

  private clearGrid() {
    this.win = false;
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
