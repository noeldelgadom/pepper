import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAwjoSJQNbPZ11XTXqZp5j9tZzqr1Xlfuo',
  authDomain: 'pepper-4d5f3.firebaseapp.com',
  databaseURL: 'https://pepper-4d5f3.firebaseio.com',
  projectId: 'pepper-4d5f3',
  storageBucket: 'pepper-4d5f3.appspot.com',
  messagingSenderId: '764886278926'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
