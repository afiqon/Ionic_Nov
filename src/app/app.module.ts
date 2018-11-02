import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {WeatherProvider} from "../services/weather";
import { AuthserviceProvider } from '../providers/authservice/authservice';

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {FrontPage} from "../pages/front/front"
import {HomePage} from "../pages/home/home";
import {HomepelajarPage} from "../pages/homepelajar/homepelajar";
import {LoginPage} from "../pages/login/login";
import {LoginpelajarPage} from "../pages/loginpelajar/loginpelajar";
import {NotificationsPage} from "../pages/notifications/notifications";
import {KehadiranPage} from "../pages/kehadiran/kehadiran";
import {JadualPage} from "../pages/jadual/jadual";
import {PelajarPage} from "../pages/pelajar/pelajar";
import {GurugantiPage} from "../pages/guruganti/guruganti";
// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    FrontPage,
    HomePage,
    HomepelajarPage,
    LoginPage,
    LoginpelajarPage,
    NotificationsPage,
    KehadiranPage,
    JadualPage,
    PelajarPage,
    GurugantiPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    FrontPage,
    HomePage,
    HomepelajarPage,
    LoginPage,
    LoginpelajarPage,
    NotificationsPage,
    KehadiranPage,
    JadualPage,
    PelajarPage,
    GurugantiPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    WeatherProvider,
    AuthserviceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})

export class AppModule {
}
