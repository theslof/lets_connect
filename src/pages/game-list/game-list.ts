import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Game, User} from "../../lib/interfaces";
import {Observable} from "rxjs/Observable";
import {PlayfieldPage} from "../playfield/playfield";

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {
  games: GameData[] = [] as GameData[];
  users = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: FirebaseProvider) {
  }

  ionViewWillEnter() {
    this.buildList();
  }

  private buildList(){
    this.games = [] as [GameData];
    this.users = {};
    let uid = this.navParams.get("user");
    this.db.getActiveGames(uid).then((data: Game[]) => {
      data.sort(((a, b) => a.state == "over" ? 1 : b.state == "over" ? -1 : 0));
        data.forEach(game => {
          let gameData: GameData = {} as GameData;
          gameData.game = game;
          gameData.turn1 = game.activePlayer == 0;
          gameData.over = game.state == "over";
          this.getUser(game.player1).subscribe(u => {
            gameData.p1 = u.displayName;
            gameData.i1 = u.profileImage
          });
          if (game.type != "local")
            this.getUser(game.player2).subscribe(u => {
              gameData.p2 = u.displayName;
              gameData.i2 = u.profileImage
            });
          else {
            gameData.p2 = game.player2;
            gameData.i2 = "placeholder";
          }
          this.games.push(gameData)
        })
      }
    )
  }

  public concede(gid: string) {
    this.db.updateGameState(gid, 'over').then(value => {
      this.games.splice(this.games.findIndex((value1) => value1.game.gid == gid), 1);
    });
  }

  public startGame(game: Game) {
    this.navCtrl.push(PlayfieldPage, {game:game});
  }

  private getUser(uid: string): Observable<User> {
    if (this.users[uid] == null) {
      this.users[uid] = this.db.getUser(uid);
    }
    return this.users[uid];
  }

}

interface GameData {
  game: Game,
  p1: string,
  i1: string,
  p2: string,
  i2: string,
  turn1: boolean,
  over: boolean
}
