import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {User} from "../../lib/interfaces";

/**
 * Generated class for the EditnamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editname',
  templateUrl: 'editname.html',
})
export class EditnamePage {
  user:User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseProvider) {
    let uid = navParams.get("uid");
    db.getUser(uid).subscribe((user: User) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditnamePage');
  }

}
