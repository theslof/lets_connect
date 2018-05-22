import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the FirebaseTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebase-test.html',
})
export class FirebaseTestPage {


  private user : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      displayName: [''],
      highscore: ['']

    });
  }
  logForm(){
    console.log(this.user.value)
  }


}
