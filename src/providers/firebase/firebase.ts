import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Game, Move, User} from "../../lib/interfaces";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireAuthProvider} from "angularfire2/auth";
import {default as firebase, User as FUser} from "firebase/app";
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import {state} from "@angular/core/src/animation/dsl";
import QuerySnapshot = firebase.firestore.QuerySnapshot;


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
  public getCurrentUser(): Observable<User> {
    return this.getUser(this.firebaseAuth.auth.currentUser.uid);
  }


  public updateHighscore(uid: string, highscore: number) {
    if (highscore)
      this.firebaseDb.collection('Users').doc(uid).update({highscore: highscore}).then(value => {
        // success
        console.log('Success!');
      }).catch(err => {
        // error
        console.log(err.toString());
      })

  }

  public getMoves(gid: string): Observable<Move[]> {
    console.log(`Getting moves for game ${gid}`);
    return this.firebaseDb.collection('Games').doc(gid).collection('Moves').valueChanges() as Observable<Move[]>;

  }


  public addMove(gid: string, move: Move): Promise<any> {
    return this.firebaseDb.collection('Games').doc(gid).collection('Moves').add(move);

  }

  //Update state of the game, inactive or active
  public updateGameState(gid: string, state: string): Promise<void> {
    return this.firebaseDb.collection('Games').doc(gid).update({state:state});

  }

  //Updates the active player
  public updateGameActivePlayer(gid: string, activePlayer: number): Promise<void>{
    return this.firebaseDb.collection('Games').doc(gid).update({activePlayer:activePlayer});
  }

  // gets the games you are active in
  public getActiveGames(uid: string): Promise<Game[]> {
    return new Promise((resolve, reject) =>
    {
      this.firebaseDb.collection('Games').ref.where(uid, "==",  true).get().then((query:QuerySnapshot) => {
        let games:Game[] = [];
        query.forEach((item:DocumentSnapshot) => {
          games.push(item.data() as Game);
        });
        resolve(games);
      }).catch(err =>{
        console.log(err.toString());
      })

    })
  }

  /* TODO
      set/update Highscore(uid, score)
      addToHighscore(uid, scoreDifference) // Add a value to user highscore

      updateGameActivePlayer(gid, player) // Player = 0 or 1

      getActiveGames(uid): Promise<Game[]>  // where state != over?
   */
}




