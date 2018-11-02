import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';


import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";


@Component({
  selector: 'page-homepelajar',
  templateUrl: 'homepelajar.html'
})

export class HomepelajarPage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  username:any;
  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController) {
    this.username = JSON.parse(window.localStorage.getItem('userPelajar'));
    // console.log('username ',this.username);
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
