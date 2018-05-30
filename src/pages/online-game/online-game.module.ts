import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineGamePage } from './online-game';

@NgModule({
  declarations: [
    OnlineGamePage,
  ],
  imports: [
    IonicPageModule.forChild(OnlineGamePage),
  ],
})
export class OnlineGamePageModule {}
