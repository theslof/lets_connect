import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../lib/interfaces";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ChangeProfilePage} from "../change-profile/change-profile";
import {text} from "@angular/core/src/render3/instructions";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = {} as User;
  avatar: string = 'placeholder';

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseProvider,
              private alertCtrl: AlertController) {

    let uid = navParams.get("uid");
    db.getUser(uid).subscribe((user: User) => {
      this.user = user;
      this.avatar = user.profileImage;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  back() {
    this.navCtrl.push(HomePage);
  }

  public editProfile() {
    this.navCtrl.push(ChangeProfilePage, {user: this.user});
  }

  editname() {

    let alert = this.alertCtrl.create({
      title: 'Change Username',
      inputs: [
        {
          name: 'username',
          placeholder: this.user.displayName,
          type: "text",
          value: this.user.displayName
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmed',
          handler: data => {
            console.log('OK clicked');
            this.changeName(data.username);
          }
        }
      ]
    });

    alert.present();
  }

  public changeName(name:string){
    this.db.updateDisplayName(this.user.uid, name);
  }
}
