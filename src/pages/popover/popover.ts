import { Component } from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';

/*
* -- Popover menu --
* Usage: Add 'private popCtrl: PopoverController' to your page constructor.
* Call popCtrl.create(PopoverPage, menuData) to create a new menu instance.
* menuData must conform to PopoverMenuData interface.
* menuData: PopoverMenuData = {
*                               title: "Title", // Title is optional
*                               choices: [
*                                         {
*                                           icon: "baseball", // Icon is optional
*                                           text: "Baseball", // Text is optional
*                                         }
*                                        ],
*                               callback: callbackFunction // A function that takes a number as argument
*                             }
* When the user clicks a menu item the callback function is called with the menu item index as argument.
* Use a switch/case to handle the callback.
*
* To show the menu, call present() on your menu instance. By passing an event the menu will display at the event coords.
* myMenu.present({ev: $event});
*/

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  data: PopoverMenuData;

  constructor(public viewCtrl: ViewController) {
    this.data = this.viewCtrl.data;
  }

  click(index: number) {
    console.log(this.data.choices[index].icon);
    this.viewCtrl.dismiss();
    this.data.callback(index);
  }
}

export interface PopoverMenuData {
  title?: string,
  choices: {icon?:string, text?:string}[],
  callback: (number) => void
}
