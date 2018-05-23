import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "../lib/firebaseConfig";
import {FirebaseTestPage} from "../pages/firebase-test/firebase-test";
import {FirebaseProvider} from '../providers/firebase/firebase';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {PopoverPage} from "../pages/popover/popover";
import {SetupLocalGamePage} from "../pages/setup-local-game/setup-local-game";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {PlayfieldPage} from "../pages/playfield/playfield";
import {AboutPage} from "../pages/about/about";
import {SplashPage} from "../pages/splash/splash";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    PopoverPage,
    SetupLocalGamePage,
    LoginPage,
    SignupPage,
    FirebaseTestPage,
    PlayfieldPage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(), //.enablePersistence() used for offline storage
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    PopoverPage,
    SetupLocalGamePage,
    LoginPage,
    SignupPage,
    FirebaseTestPage,
    PlayfieldPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider, AngularFireAuth
  ]
})
export class AppModule {}
