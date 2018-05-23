import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DummyProfilePage} from "../dummy-profile/dummy-profile";
import {HomePage} from "../home/home";
import {User} from "../../lib/interfaces";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = {} as User;
  avatar: string = 'placeholder';
  constructor(public navCtrl: NavController, public navParams: NavParams, private db:FirebaseProvider) {
    let uid = navParams.get("uid");
    db.getUser(uid).subscribe((user:User) => {
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

}
