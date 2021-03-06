import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string = "";
  password: string = "";
  confirmpassword: string = "";
  username: string = "";
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private db: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  cancel() {
    this.navCtrl.pop();

  }

  create() {
    /*let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Do not click OK',
      buttons: ['OK','Cancel']
    });

    alert.present();
*/
    /*if (this.password == this.confirmpassword) {
      console.log('Correct');
      this.db.signup(this.email, this.password, "username").then(value => {
    */
    if (this.password == this.confirmpassword) {
      console.log('Correct');
      this.db.signup(this.email, this.password, this.username).then(value => {
        //Success

      }).catch(err => {
        console.log(err.toString());
        this.errorMessage = err.toString();
      });


    } else {
      this.errorMessage = "Password doesn´t match";
      console.log('Wrong')

    }

  }

  public type = 'password';
  public showPass = false;


  public showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  public string = 'confirmPassword';
  public showString = false;

  confirmPassword() {

    this.showPass = !this.showPass;

    if (this.showString) {
      this.type = 'text';
    } else {
      this.string = 'confirmPassword';
    }

  }

}
