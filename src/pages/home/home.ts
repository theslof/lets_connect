import {Component} from '@angular/core';
import {NavController, Popover, PopoverController} from 'ionic-angular';
import {PopoverPage, PopoverMenuData} from "../popover/popover";
import {SetupLocalGamePage} from "../setup-local-game/setup-local-game";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {User} from "../../lib/interfaces";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menu: Popover;
  displayName: string = "";
  profileImage: string = "";
  user: User;
  menuData: PopoverMenuData = {
    choices: [
      {icon: "log-out", text: "Sign out"},
      ],
    callback: (index: number) => {this.onOptionsItemSelected(index);}
  };

  constructor(public navCtrl: NavController, private popCtrl: PopoverController, private db:FirebaseProvider) {
    this.menu = this.popCtrl.create(PopoverPage, this.menuData);
    this.db.getCurrentUser().subscribe((value: User)=>{
     if(value) {
       this.user = value;
       this.profileImage = value.profileImage;
       this.displayName = value.displayName;
     }
    })
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
        this.db.signout();
        break;
      default:
        console.log("Unknown choice");
    }
  }

  public updateUser(){
    this.db.updateDisplayName(this.user.uid, this.displayName);
    this.db.updateProfileImage(this.user.uid, this.profileImage);
  }


}
