import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  userData = signal<User | null>(null); // User data should ideally be nullable
  isUserLogedIn = signal<boolean>(false); // User login state

  constructor() {}


  getCurrentUser() {
    return this.userData;
  }

  getUserData(): Observable<User> {
    return this.httpClient.get<User>('https://fakestoreapi.com/users/1').pipe(
      tap(user =>{
        this.userData.set(user);
      })
    );
  }
}
