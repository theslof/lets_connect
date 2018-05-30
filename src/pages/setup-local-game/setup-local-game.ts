import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlayfieldPage} from "../playfield/playfield";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Game, User} from "../../lib/interfaces";

@IonicPage()
@Component({
  selector: 'page-setup-local-game',
  templateUrl: 'setup-local-game.html',
})
export class SetupLocalGamePage {
  user: User;
  playerName: string = "Loading User...";
  avatar:string = "placeholder";
  opponentName: string = "Player 2";
  loading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, private db: FirebaseProvider) {
    db.getCurrentUser().subscribe((user: User) => {
      console.log("Got user");
      if (user) {
        this.playerName = user.displayName;
        this.user = user;
        this.avatar = user.profileImage;
        this.loading = false;
      }
    },err => {
      console.log(err.toString());
    });
  }

  public changeOpponentName() {
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

  public startGame() {
    this.loading = true;
    let game: Game = {} as Game;
    game.player1 = this.user.uid;
    game.player2 = this.opponentName;
    game.activePlayer = 0;
    game.state = 'init';
    game.type = 'local';
    this.db.createGame(game).then(value => {
      this.loading = false;
      this.navCtrl.push(PlayfieldPage, {game: game});
    });
  }

}
