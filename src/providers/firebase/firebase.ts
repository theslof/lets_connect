import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Game, User} from "../../lib/interfaces";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireAuthProvider} from "angularfire2/auth";
import {default as firebase, User as FUser} from "firebase/app";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class FirebaseProvider {
  public data: any;
  public userProfile: any;
  public password: any;
  public fireAuth: any;
  public userText: string = "";
  public userInput: string = "";
  items: Observable<User[]>;


  constructor(public firebaseDb: AngularFirestore, private firebaseAuth: AngularFireAuth) {

  }

  public saveUser() {
    this.firebaseDb.collection('Users').doc('testUser').set({text: this.userText})
  }

  public addUser(user: User): any {
//    if (this.userInput.replace(/\s/g, '') == "")
//      return;

//    let item = {email: this.userInput, displayName:this.userInput, profileImage:this.userInput, highscore:222} as User;

//    this.userInput = "";
    console.log('nu händer något');
    return this.firebaseDb.collection('Users').doc(user.uid).set(user, {merge: true});

  }

  public addGame(game: Game): any {
    console.log('spelfunktion fungerar');
    return this.firebaseDb.collection('Games').add(game);
  }

  public getUser(uid: string): Observable<User> {
    //return this.firebaseDb.collection('Users').valueChanges();
    return this.firebaseDb.collection('Users').doc(uid).valueChanges() as Observable<User>;

    //return this.firebaseDb.collection("Users").doc(email);
  }

  /* loginUserService(): any{
     return this.fireAuth.collection('testItems').valueOf('text');



   }*/


  /* ionViewDidLoad() {


     let myObservable = Observable.create(observer => {
       console.log("tjena");
       observer.next("hello");
       setInterval(() => {
         observer.next("hello");
       }, 1000);

     });
     myObservable.subscribe(() => {
       console.log();
     });


   }*/

  public updateUser(){

  }

  public signup(email: string, password: string) {
    this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(response => {
        this.createNewUser();
      })
      .catch(err => {

      });
  }

  public signin(email: string, password: string) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      console.log("Login success!");
      this.createNewUser();
    })
      .catch(err => {
        console.log("Login error");
      });
  }

  public signout() {
    this.firebaseAuth.auth.signOut();
  }

  private createNewUser() {
    let fuser = this.firebaseAuth.auth.currentUser;
    if (!fuser)
      return;

    this.firebaseDb.collection('Users').doc(fuser.uid).ref.get().then((doc: DocumentSnapshot) => {
      let user: User;

      if (doc.exists) {
        user = doc.data() as User;

        user.displayName = !user.displayName ? "Anon" : user.displayName;
        user.email = !user.email ? "anon@anon.no" : user.email;
        user.highscore = !user.highscore ? 0 : user.highscore;
        user.profileImage = !user.profileImage ? "" : user.profileImage;

      } else {

        user = {} as User;

        user.uid = fuser.uid;
        user.displayName = !fuser.displayName ? "Anon" : fuser.displayName;
        user.email = !fuser.email ? "anon@anon.no" : fuser.email;
        user.highscore = 0;
        user.profileImage = "";
      }
      doc.ref.set(user, {merge: true});
    })
      .catch(err => {

      });


  }
}




