import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
//AIzaSyBDZCY-GV-aN51J-2G_c5V3UvF2UEZ4Fto
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBDZCY-GV-aN51J-2G_c5V3UvF2UEZ4Fto'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
