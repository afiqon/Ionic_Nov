import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {FrontPage} from "../front/front";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public nav: NavController) {
  }

  // logout
  logout() {
    this.nav.setRoot(FrontPage);
  }
}
