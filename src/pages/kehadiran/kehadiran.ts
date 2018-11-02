import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { AuthserviceProvider } from '../../providers/authservice/authservice';
/**
 * Generated class for the KehadiranPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kehadiran',
  templateUrl: 'kehadiran.html',
})
export class KehadiranPage {
  userData :any;

  

  sessions:any;
  classes:any;
  session:any;
  days:any;
  slots:any;
  students:any;
  selectedClass:any;
  selectedDay:any;
  selectedSlot:any;
  selectedDate :any;
  idJadual: any;
  Url: any;
  Url2: any;
  Url3: any;
  Url4: any;
  Url5: any;
  Url6: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public authService: AuthserviceProvider, public forgotCtrl: AlertController ){
  

    this.Url = this.authService.serverAPI + 'api/sesi';
    this.Url2 = this.authService.serverAPI + 'api/jadualKelas';
    this.Url3= this.authService.serverAPI + 'api/jadualHari';
    this.Url4 = this.authService.serverAPI + 'api/jadualSlot';
    this.Url5= this.authService.serverAPI + 'api/jadualPelajar';
    this.Url6 = this.authService.serverAPI +  'api/getJadualID'; 
    
     
    this.http.get(this.Url)
    .map(res => res.json())
    .subscribe(data => {
      this.sessions = data;
      console.log(data);
    });

    this.userData = JSON.parse(window.localStorage.getItem('userData'));
    console.log('username ',this.userData.id_pengajar);
    
  }


  setSession(data) {
    this.http.get(this.Url2+'/?id='+data+"&idp="+this.userData.id_pengajar)
    .map(res => res.json())
    .subscribe(data => {
      this.classes = data;
      console.log(data);
    });
    this.session = data;
  }

  onCancelSession(event) {
    this.sessions = [];
  }

  setClass(data) {
    this.http.get(this.Url3+'/?sesi='+this.session+"&kelas="+data)
    .map(res => res.json())
    .subscribe(data => {
      this.days = data;
      console.log(data);
    });
    this.selectedClass = data;
    this.getPelajar();
  }

  setDay(data) {
    this.http.get(this.Url4+'/?sesi='+this.session+"&kelas="+this.selectedClass+"&hari="+data)
    .map(res => res.json())
    .subscribe(data => {
      this.slots = data;
      console.log(data);
    });
    this.selectedDay = data;
  }

  setSlot(data) {
    this.http.get(this.Url6+'/?sesi='+this.session+"&kelas="+this.selectedClass+"&hari="+this.selectedDay+"&slot="+data)
    .map(res => res.json())
    .subscribe(data => {
      this.idJadual = data[0].idj;
      console.log('id jadual ',data[0].idj);
    });
    this.selectedSlot = data;
  }

  getPelajar() {
    this.http.get(this.Url5+'/?sesi='+this.session+"&kelas="+this.selectedClass)
    .map(res => res.json())
    .subscribe(data => {
      this.students = data;
      console.log('student ',data);

    });
  }

  setDate(data) {
    this.selectedDate = data;
    console.log('date ', this.selectedDate);
  }

  selectMember(data){
    if (data.checked == true) {
      //  this.selectedArray.push({id:data.id_pelajar, checked:true});
      let studIndex = this.students.findIndex(obj => obj.id_pelajar === data.id_pelajar);
      this.students[studIndex] = {...this.students[studIndex]};
      console.log('updated student ',this.students);
     } else {
       data.checked=false;
      let studIndex = this.students.findIndex(obj => obj.id_pelajar === data.id_pelajar);
      this.students[studIndex] = {...this.students[studIndex]};
      console.log('updated student ',this.students);
    }
   }

   submitAttendance() {

    this.students.forEach( (element, index) => {
      this.students[index] = {...this.students[index], date: this.selectedDate, idj: this.idJadual};
    });
    
    this.authService.saveKehadiran(this.students).then(
      result => {
        console.log('attendance result', result);

        let alert = this.forgotCtrl.create({
          title: "Success!",
          subTitle: "Kehadiran disimpan",
          buttons: ["OK"]
        });
        alert.present();

      },
      err => {
        //Connection failed message
      }
    );
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KehadiranPage');
  }

}
