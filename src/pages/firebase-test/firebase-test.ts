import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import * as firebase from "firebase";
import Firestore = firebase.firestore.Firestore;
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the FirebaseTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebase-test.html',
})
export class FirebaseTestPage {
  firebaseObs: Observable<TestText>;
  firebaseText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFirestore) {
    let collection = db.collection('testCollection');
    collection.doc('testText').valueChanges().subscribe((data:TestText) => {
      this.firebaseText = data.text;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestPage');
  }

  private saveText(){
    this.db.collection('testCollection').doc('testText').set({text: this.firebaseText});
  }

}

interface TestText {
  text: string;
}
