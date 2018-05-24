import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';


/**
 * Generated class for the DummyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dummy-profile',
  templateUrl: 'dummy-profile.html',
})
export class DummyProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DummyProfilePage');
  }



}
