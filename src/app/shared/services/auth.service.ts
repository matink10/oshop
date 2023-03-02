import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable, switchMap } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { UserService } from 'src/app/shared/services/user.service';
// import firebase from 'firebase/compat';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User> | any;

  constructor(
    private userService: UserService, 
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    this.user$ = afAuth.user;
   }

   login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    //to store the return url before sending for authentication
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
   }

   logout(){
    this.afAuth.signOut();
   }

   get appUser$(): Observable<AppUser> {
    // return this.user$
    //   .pipe(switchMap( (user: firebase.User) => this.userService.get(user.uid).valueChanges()));
    
    return this.user$
      .pipe(switchMap( (user: firebase.User) => {
        if (user) return this.userService.get(user.uid);

        return of(null);
      }
      ));      
  }
}


