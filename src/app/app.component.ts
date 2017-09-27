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
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines', {
      query: { orderByKey: true }
    });
    this.restaurants = this.af.database.list('/restaurants', {
      query: { orderByChild: 'name' }
    })
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

    this.exists = this.af.database.object('/restaurants/1/features/1');
    this.exists.take(1).subscribe(x => {
      // tslint:disable-next-line:curly
      if (x && x.$value) console.log('Exists');
      // tslint:disable-next-line:curly
      else console.log('Not Exists');
    });
  }
}
