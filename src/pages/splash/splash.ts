import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: AngularFireAuth) {
    this.firebase.authState.subscribe(auth => {
      if (auth) {
        // User is logged in
        navCtrl.setRoot(HomePage);
      } else {
        // User is not logged in
        navCtrl.setRoot(LoginPage);
      }
    });
  }
}
