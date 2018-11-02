import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import {HomepelajarPage} from "../homepelajar/homepelajar";
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-loginpelajar',
  templateUrl: 'loginpelajar.html'
})
export class LoginpelajarPage {

  responseData:any;
  userPelajar = { nama_pelajar: "", no_ndp: "",};
  
  constructor(public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public authService: AuthserviceProvider,public events:Events) {
    this.menu.swipeEnable(false);
  }

  
  // login and go to home page
  login() {
    if (this.userPelajar.nama_pelajar && this.userPelajar.no_ndp) {
      console.log(this.userPelajar);
      this.authService.postData(this.userPelajar, "loginpelajar").then(
        result => {
          this.responseData = result;
          console.log(this.responseData);
          if (this.responseData.code === 200) {
            localStorage.setItem("userPelajar", JSON.stringify(this.responseData.data));
            this.events.publish('user:pelajar');
            console.log(this.responseData.data);
            this.nav.setRoot(HomepelajarPage);
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

// }
}
