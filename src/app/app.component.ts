import { Http } from '@angular/http';
import { AuthMethods, AuthProviders } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayName;
  photoURL;

  constructor(private af: AngularFire, private http: Http) {}

  ngOnInit() {
    this.af.auth.subscribe(authState => {
      if (!authState) {
        this.displayName = null;
        this.photoURL = null;
        return;
      }
      this.displayName = authState.auth.displayName;
      this.photoURL = authState.auth.photoURL;
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['public_profile', 'user_friends']
    }).then(authState => {
      console.log('After Login', authState);
    });
  }

  logout() {
    this.af.auth.logout();
  }
}
