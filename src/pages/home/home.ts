import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Observable} from "rxjs/Observable";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../lib/interfaces";
import {AngularFireAuth} from "angularfire2/auth";
import {User as FUser} from "firebase/app";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: FormGroup;
  public email: string = '';
  public displayName: string = '';
  public highscore: number = 0;
  public fuser: FUser;

  constructor(private formBuilder: FormBuilder, public firebaseprovider: FirebaseProvider) {
    this.user = this.formBuilder.group({
      email: [''],
      displayName: [''],
      highscore: ['']

    });
  }

  public addUser() {
    let newUser: User = {uid: null, email: this.email, highscore: this.highscore, profileImage: "", displayName: this.displayName};
    this.firebaseprovider.addUser(newUser).then(data => {
      console.log("Response from Firebase!");

    });

  }
  public getUser(){
    this.firebaseprovider.getUser('');
    console.log('den funkar bror');
  }

  public login(email: HTMLInputElement, password: HTMLInputElement){
    this.firebaseprovider.signin(email.value, password.value);
//    this.firebaseprovider.signup(email.value, password.value);
  }

  public logout(){
    this.firebaseprovider.signout();
  }

}


/*  gameGrid: string[][];
width = 7;
height = 6;
coins = {
  blank: "assets/imgs/coin-none.svg",
  red: "assets/imgs/coin-red.svg",
  yellow: "assets/imgs/coin-yellow.svg",

};


constructor(public navCtrl: NavController, public firebaseprovider: FirebaseProvider) {
  this.gameGrid = new Array(this.height);
  for (let i = 0; i < this.gameGrid.length; i++) {
    this.gameGrid[i] = new Array(this.width);
    for (let j = 0; j < this.gameGrid[i].length; j++) {
      this.gameGrid[i][j] = Math.random() > .5 ? this.coins.yellow : this.coins.red;


    }
  }
}

public openFirebaseTest() {
  let myObservable = Observable.create(observer => {
    console.log("tjena");
    observer.next("hello");
    setInterval(() => {
      observer.next("hello");
    }, 1000);

  });
  myObservable.subscribe(() => {
    console.log("tja");
  }, 1000);
}
*/



