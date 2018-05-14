import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebase-test.html',
})
export class FirebaseTestPage {
  firebaseText: string = "";      // This variable is bound to the ion-textarea through ngModel two-way data binding
  isEnabled: boolean = false;     // Used to disable the Save button while waiting for data from Firebase
  items: Observable<TestText[]>;  // This Observable holds all text strings in the list
  itemInput: string = "";         // Bound to ion-input via ngModel

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFirestore) {

    // Setup a reference to the 'testCollection' collection in Firestore
    let collection = db.collection('testCollection');

    // Subscribe to changes to the 'testText' document that holds the saved data for firebaseText
    collection.doc('testText').valueChanges().subscribe((data: TestText) => {
      // Whenever the data changes, replace the local data and enable the Save button
      this.firebaseText = data.text;
      this.isEnabled = true;
    });

    // Setup a reference to the 'testItems' collection
    let itemCollection = db.collection('testItems');

    // Create an Observable that changes as the data in the collection changes
    this.items = itemCollection.valueChanges() as Observable<TestText[]>;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestPage');
  }

  public saveText() {
    this.isEnabled = false;
    this.db.collection('testCollection').doc('testText').set({text: this.firebaseText});
  }

  public addItem(){
    // If the input field is empty, abort. /\s/g is a regexp that matches all whitespaces (which we then remove before comparing).
    if(this.itemInput.replace(/\s/g, '') == "")
      return;

    let item = {text: this.itemInput} as TestText;
    this.db.collection('testItems').add(item);
    this.itemInput = "";
  }
}

interface TestText {
  text: string;
}
