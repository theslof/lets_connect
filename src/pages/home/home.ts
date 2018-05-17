import {Component} from '@angular/core';
import {NavController, Popover, PopoverController} from 'ionic-angular';
import {PopoverPage, PopoverMenuData} from "../popover/popover";
import {SetupLocalGamePage} from "../setup-local-game/setup-local-game";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu: Popover;
  menuData: PopoverMenuData = {
    choices: [
      {icon: "log-out", text: "Sign out"},
      ],
    callback: (index: number) => {this.onOptionsItemSelected(index);}
  };

  constructor(public navCtrl: NavController, private popCtrl: PopoverController) {
    this.menu = this.popCtrl.create(PopoverPage, this.menuData);
  }

  public startLocalGame() {
    console.log('"Start local game" clicked!');
    this.navCtrl.push(SetupLocalGamePage);
  }

  public startOnlineGame() {
    console.log('"Start online game" clicked!');
    //this.navCtrl.push(SetupOnlineGamePage);
  }

  public onOptionsItemSelected(id: number){
    console.log("Callback: " + id);
    switch (id) {
      case 0:
        console.log("Sign out clicked");
        //auth.logout();
        break;
      default:
        console.log("Unknown choice");
    }
  }

}
