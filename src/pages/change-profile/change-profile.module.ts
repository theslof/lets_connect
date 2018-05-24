import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeProfilePage } from './change-profile';

@NgModule({
  declarations: [
    ChangeProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeProfilePage),
  ],
})
export class ChangeProfilePageModule {}
