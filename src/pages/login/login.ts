import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {SignupPage} from "../signup/signup";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = "";
  password: string = "";
  loggingIn: boolean = false;
  loginError: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseProvider) {
  }

  ionViewDidEnter() {
    this.loggingIn = false;
  }


  public login() {
    this.loggingIn = true;
    this.db.signin(this.email, this.password).then((success: boolean) => {
      this.loggingIn = false;
      this.email = "";
      this.password = "";
    }).catch(err => {
      this.loggingIn = false;
      console.log("Login failed!");
      this.loginError = true;
    });
  }

  public signup() {
    this.navCtrl.push(SignupPage);
  }
}
