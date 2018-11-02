import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { AuthserviceProvider } from '../../providers/authservice/authservice';


@IonicPage()
@Component({
  selector: 'page-jadual',
  templateUrl: 'jadual.html',
})
export class JadualPage {
  userData:any;
  Url: any;
  jadual:any;
  sessions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public authService: AuthserviceProvider, public forgotCtrl: AlertController ){

    this.Url = this.authService.serverAPI + 'api/jadual';
 
    this.http.get(this.Url)
    .map(res => res.json())
    .subscribe(data => {
      this.jadual = data;
      console.log(data);
    });

    this.userData = JSON.parse(window.localStorage.getItem('userData'));
    console.log('username ',this.userData.nama_pengajar);


  }

  setsesi(data) {
    this.http.get(this.Url+'/?id_pen='+data+"&idj="+this.userData.sesi)
    .map(res => res.json())
    .subscribe(data => {
      this.jadual = data;
      console.log(data);
    });
    this.jadual = data;
  
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad jadualPage');
  }

}
