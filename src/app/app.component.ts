import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines');
    this.restaurants = this.af.database.list('/restaurants')
      .map(restaurants => {
        restaurants.map(restaurant => {
          restaurant.featureTypes = [];
          // tslint:disable-next-line:forin
          for (const f in restaurant.features) {
            restaurant.featureTypes.push(this.af.database.object('/features/' + f));
          }
          restaurant.cuisineType = this.af.database.object('/cuisines/' + restaurant.cuisine);
        });
        return restaurants;
      });
  }
}
