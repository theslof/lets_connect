import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DummyProfilePage } from './dummy-profile';

@NgModule({
  declarations: [
    DummyProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(DummyProfilePage),
  ],
})
export class DummyProfilePageModule {}
