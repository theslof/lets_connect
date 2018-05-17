import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlayfieldPage} from "../playfield/playfield";

@IonicPage()
@Component({
  selector: 'page-setup-local-game',
  templateUrl: 'setup-local-game.html',
})
export class SetupLocalGamePage {
  playerName: string = "Example User";
  opponentName: string = "Player 2";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupLocalGamePage');
  }

  public changeOpponentName(){
    let prompt = this.alertCtrl.create({
      title: 'Change name',
      message: "Enter a name for Player 2:",
      inputs: [
        {
          name: 'name',
          placeholder: 'Player 2',
          type: 'text',
          min: 0,
          value: this.opponentName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked');
            this.opponentName = data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  public startGame(){
    this.navCtrl.push(PlayfieldPage, {resume: false});
  }

}
