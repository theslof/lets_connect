import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gameGrid: string[][];
  width=7;
  height=6;
  coins = {
    blank: "assets/imgs/coin-none.svg",
    red: "assets/imgs/coin-red.svg",
    yellow: "assets/imgs/coin-yellow.svg",

  };

  constructor(public navCtrl: NavController) {
    this.gameGrid = new Array(this.height);
    for(let i = 0; i < this.gameGrid.length; i++){
      this.gameGrid[i] = new Array(this.width);
      for(let j = 0; j < this.gameGrid[i].length; j++){
        this.gameGrid[i][j] = Math.random() > .5 ? this.coins.yellow : this.coins.red;
      }
    }
  }

  private startLocalGame(){
    console.log('"Start local game" clicked!');
    //this.navCtrl.push(SetupLocalGamePage);
  }

  private startOnlineGame(){
    console.log('"Start online game" clicked!');
    //this.navCtrl.push(SetupOnlineGamePage);
  }

}
