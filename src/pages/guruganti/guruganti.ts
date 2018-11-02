import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { AuthserviceProvider } from '../../providers/authservice/authservice';

@IonicPage()
@Component({
  selector: 'page-guruganti',
  templateUrl: 'guruganti.html',
})
export class GurugantiPage {
userData: any;
pengajar: any;
Url: any;


constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public authService: AuthserviceProvider, public forgotCtrl: AlertController ){

this.Url = this.authService.serverAPI + 'api/pengajar';

this.http.get(this.Url)
    .map(res => res.json())
    .subscribe(data => {
      this.pengajar = data;
      console.log(data);
    });

    this.userData = JSON.parse(window.localStorage.getItem('userData'));
    console.log('username ',this.userData.nama_pengajar);
}

setpengajar(data) {
  this.http.get(this.Url+'/?id='+data+"&idp="+this.userData.nama_pengajar)
  .map(res => res.json())
  .subscribe(data => {
    this.pengajar = data;
    console.log(data);
  });
  this.pengajar = data;

}




  ionViewDidLoad() {
    console.log('ionViewDidLoad GurugantiPage');
  }

}
