import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayfieldPage } from './playfield';

@NgModule({
  declarations: [
    PlayfieldPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayfieldPage),
  ],
})
export class PlayfieldPageModule {}
