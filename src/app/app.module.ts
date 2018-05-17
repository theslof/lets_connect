import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "../lib/firebaseConfig";
import {FirebaseTestPage} from "../pages/firebase-test/firebase-test";
import {PopoverPage} from "../pages/popover/popover";
import {SetupLocalGamePage} from "../pages/setup-local-game/setup-local-game";
import {LoginPage} from "../pages/login/login";
import {SignupPage} from "../pages/signup/signup";
import {PlayfieldPage} from "../pages/playfield/playfield";
import {AboutPage} from "../pages/about/about";

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
    PlayfieldPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence() //.enablePersistence() used for offline storage
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
    PlayfieldPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
