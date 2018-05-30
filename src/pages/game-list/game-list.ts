import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Game, User} from "../../lib/interfaces";
import {Observable} from "rxjs/Observable";
import {PlayfieldPage} from "../playfield/playfield";
import {OnlineGamePage} from "../online-game/online-game";

@IonicPage()
@Component({
  selector: 'page-game-list',
  templateUrl: 'game-list.html',
})
export class GameListPage {
  games: [GameData] = [] as [GameData];
  users = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: FirebaseProvider) {
    let uid = this.navParams.get("user");
    this.db.getActiveGames(uid).then((data: Game[]) => {
        data.forEach(game => {
          let gameData: GameData = {} as GameData;
          gameData.game = game;
          gameData.turn1 = game.activePlayer == 0;
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
      this.games.slice(this.games.findIndex((value1, index, obj) => {
        return value1.game.gid == gid;
      }), 1)
    });
  }

  public startGame(game: Game) {
    this.navCtrl.push(OnlineGamePage, {game:game});
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
  turn1: boolean
}
