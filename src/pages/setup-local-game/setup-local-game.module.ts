import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetupLocalGamePage } from './setup-local-game';

@NgModule({
  declarations: [
    SetupLocalGamePage,
  ],
  imports: [
    IonicPageModule.forChild(SetupLocalGamePage),
  ],
})
export class SetupLocalGamePageModule {}
