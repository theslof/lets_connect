import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {User} from "../../lib/interfaces";

/**
 * Generated class for the ChangeProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-profile',
  templateUrl: 'change-profile.html',
})
export class ChangeProfilePage {

  user:User;
  avatars: string[] = [
      'cat',
      'chicken',
      'cow',
    'deer',
    'dog',
    'fox',
    'monkey',
    'panda',
    'pig',
    'placeholder',
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db:FirebaseProvider) {
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeProfilePage');
  }

  public selected(avatar: string) {
    this.db.updateProfileImage(this.user.uid, avatar);
    this.navCtrl.pop();
  }

}
