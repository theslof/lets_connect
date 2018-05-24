import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Game, User} from "../../lib/interfaces";
import {AngularFireAuth} from "angularfire2/auth";
import {default as firebase, User as FUser} from "firebase/app";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import set = Reflect.set;

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class FirebaseProvider {
  constructor(public firebaseDb: AngularFirestore, private firebaseAuth: AngularFireAuth) {}

  public addGame(game: Game): any {
    console.log('spelfunktion fungerar');
    return this.firebaseDb.collection('Games').add(game);
  }

  // returns user as an Observable
  public getUser(uid: string): Observable<User> {
    //return this.firebaseDb.collection('Users').valueChanges();
    return this.firebaseDb.collection('Users').doc(uid).valueChanges() as Observable<User>;

    //return this.firebaseDb.collection("Users").doc(email);
  }

  public updateUser(uid: string, displayName ?:string, profileImage ?: string) {
    // måste ha uid, ta in alla parametrar, om variabel är null, ändra inte.


    let user = {};

    user["uid"] = uid;
    if(displayName)
      user["displayName"] = displayName;

    if(profileImage)
      user["profileImage"] = profileImage;

    this.firebaseDb.collection('Users').doc(uid).set(user, {merge:true}).then(value => {
      // success
      console.log('Success!');
    }).catch(err => {
      // error
      console.log(err.toString());
    })

/*
    let fuser = this.firebaseAuth.auth.currentUser;
    fuser.updateProfile({
      displayName: '',
      photoURL: ''
    }).then(function (response) {

    }, function (error) {
      console.log(error);
    });*/

  }

  // create the user and signs in automatically.
  public signup(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(response => {
          this.createNewUser();
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public signin(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
        console.log("Login success!");
        this.createNewUser();
        resolve(true);
      })
        .catch(err => {
          console.log("Login error");
          reject(err);
        });
    });
  }

  public signout() {
    this.firebaseAuth.auth.signOut();
  }

  // Method for creating new user. If the user does not exist in the database, it's created.
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




