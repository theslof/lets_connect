import {Injectable} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Game, User} from "../../lib/interfaces";
import {AngularFireAuth} from "angularfire2/auth";
import {default as firebase, User as FUser} from "firebase/app";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class FirebaseProvider {
  constructor(public firebaseDb: AngularFirestore, private firebaseAuth: AngularFireAuth) {
  }

  public createGame(game: Game): Promise<void> {
    console.log('spelfunktion fungerar');
    game.gid = this.firebaseDb.createId();
    return this.firebaseDb.collection('Games').doc(game.gid).set(game);
  }

  // returns user as an Observable
  public getUser(uid: string): Observable<User> {
    //return this.firebaseDb.collection('Users').valueChanges();
    return this.firebaseDb.collection('Users').doc(uid).valueChanges() as Observable<User>;

  }

  // method for updating your displayname. Don't change if value is null.
  public updateDisplayName(uid: string, displayName: string) {
    // måste ha uid, ta in alla parametrar, om variabel är null, ändra inte.
    if (displayName)
      this.firebaseDb.collection('Users').doc(uid).update({displayName: displayName}).then(value => {
        // success
        console.log('Success!');
      }).catch(err => {
        // error
        console.log(err.toString());
      })
  }

  // method for updating your profileimage. Don't change if value is null.
  public updateProfileImage(uid: string, profileImage: string) {
    if (profileImage)
      this.firebaseDb.collection('Users').doc(uid).update({profileImage: profileImage}).then(value => {
        // success
        console.log('Success!');
      }).catch(err => {
        // error
        console.log(err.toString());
      })
  }

  // create the user and signs in automatically.
  public signup(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
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

  // method for signing in user
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


  // sign out method
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

// method for getting current user.
  public getCurrentUser(): Observable<User>{
    return this.getUser(this.firebaseAuth.auth.currentUser.uid);
  }


  /* TODO
      set/update Highscore(uid, score)
      addToHighscore(uid, scoreDifference) // Add a value to user highscore

      updateGameState(gid, state)
      updateGameActivePlayer(gid, player) // Player = 0 or 1

      getActiveGames(uid): Observable<Game[]>  // where state != over?
      getMoves(gid): Observable<Move[]> // collection("Games").doc(gid).collection("Moves")
      addMove(gid, move:Move)
   */
}




