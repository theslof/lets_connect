import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  password:string = "";
  confirmpassword:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  cancel() {
    this.navCtrl.push(HomePage);
  }

  create() {
    /*let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Do not click OK',
      buttons: ['OK','Cancel']
    });

    alert.present();
*/
    if(this.password == this.confirmpassword){
   console.log('Correct')

    } else {
  console.log('Wrong')

    }

  }

  public type = 'password';
  public showPass = false;


  public showPassword() {
    this.showPass = !this.showPass;

    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
}

  public string = 'confirmPassword';
  public showString = false;

  confirmPassword() {

    this.showPass = !this.showPass;

    if(this.showString){
      this.type = 'text';
    } else {
      this.string = 'confirmPassword';
    }

  }

}
