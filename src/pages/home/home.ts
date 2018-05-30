import {Component} from '@angular/core';
import {NavController, Popover, PopoverController} from 'ionic-angular';
import {PopoverPage, PopoverMenuData} from "../popover/popover";
import {SetupLocalGamePage} from "../setup-local-game/setup-local-game";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ProfilePage} from "../profile/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {AboutPage} from "../about/about";
import {GameListPage} from "../game-list/game-list";
import {Game} from "../../lib/interfaces";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu: Popover;
  menuData: PopoverMenuData = {
    choices: [
      {icon: "person", text: "My Profile"},
      {icon: "information-circle", text: "About"},
      {icon: "log-out", text: "Sign out"},
    ],
    callback: (index: number) => {
      this.onOptionsItemSelected(index);
    }
  };
  turns: number = 0;

  constructor(public navCtrl: NavController, private popCtrl: PopoverController, private db: FirebaseProvider,
              private auth: AngularFireAuth) {
    this.menu = this.popCtrl.create(PopoverPage, this.menuData);
    let uid = this.auth.auth.currentUser.uid;
    this.db.getActiveGames(uid).then((value: Game[]) => {
      this.turns = value.filter((value1, index) => {
        if (value1.state != "over") {
          if (value1.activePlayer == 0) return value1.player1 == uid;
          else return value1.player2 == uid;
        }
        return false;
      }).length
    });
  }

  public startLocalGame() {
    console.log('"Start local game" clicked!');
    this.navCtrl.push(SetupLocalGamePage);
  }

  public openGameList() {
    console.log('"All Games" clicked!');
    this.navCtrl.push(GameListPage, {user: this.auth.auth.currentUser.uid});
  }

  public onOptionsItemSelected(id: number) {
    console.log("Callback: " + id);
    switch (id) {
      case 0:
        console.log("Profile clicked");
        this.navCtrl.push(ProfilePage, {uid: this.auth.auth.currentUser.uid});
        break;
      case 1:
        console.log("About clicked");
        this.navCtrl.push(AboutPage);
        break;
      case 2:
        console.log("Sign out clicked");
        this.db.signout();
        break;
      default:
        console.log("Unknown choice");
    }
  }

}
