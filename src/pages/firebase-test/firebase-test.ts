import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";

@IonicPage()
@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebase-test.html',
})
export class FirebaseTestPage {
  firebaseText: string = "";
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFirestore) {
    let collection = db.collection('testCollection');
    collection.doc('testText').valueChanges().subscribe((data: TestText) => {
      this.firebaseText = data.text;
      this.isEnabled = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestPage');
  }

  public saveText() {
    this.isEnabled = false;
    this.db.collection('testCollection').doc('testText').set({text: this.firebaseText});
  }

}

interface TestText {
  text: string;
}
