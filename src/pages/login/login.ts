import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import {HomePage} from "../home/home";
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  responseData:any;
  userData = { email: "", password: "",};

  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public authService: AuthserviceProvider,public events:Events) {
    this.menu.swipeEnable(false);
  }

  
  // login and go to home page
  login() {
    if (this.userData.email && this.userData.password) {
      console.log(this.userData);
      this.authService.postData(this.userData, "login").then(
        result => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.code === 200) {
            localStorage.setItem("userData", JSON.stringify(this.responseData.data));
            this.events.publish('user:pengajar');
            console.log(this.responseData.data);
            this.nav.setRoot(HomePage);
          } else {
            let alert = this.forgotCtrl.create({
              title: "Login failed!",
              subTitle: "Wrong credentials",
              buttons: ["OK"]
            });
            alert.present();
          }
        },
        err => {
          //Connection failed message
        }
      );
    } else {
      let alert = this.forgotCtrl.create({
        title: "Login failed!",
        subTitle: "Wrong credentials",
        buttons: ["OK"]
      });
      alert.present();
    }
  }

}