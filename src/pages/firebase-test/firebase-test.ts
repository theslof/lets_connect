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
  firebaseText: string = "";
  isEnabled: boolean = false;
  items: Observable<TestText[]>;
  itemInput: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFirestore) {
    let collection = db.collection('testCollection');
    collection.doc('testText').valueChanges().subscribe((data: TestText) => {
      this.firebaseText = data.text;
      this.isEnabled = true;
    });
    let itemCollection = db.collection('testItems');
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
