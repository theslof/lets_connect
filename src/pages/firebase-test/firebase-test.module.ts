import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirebaseTestPage } from './firebase-test';

@NgModule({
  declarations: [
    FirebaseTestPage,
  ],
  imports: [
    IonicPageModule.forChild(FirebaseTestPage),
  ],
})
export class FirebaseTestPageModule {}
