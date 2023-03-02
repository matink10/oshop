import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private userService: UserService, private auth: AuthService, private router: Router){
    auth.user$.subscribe((user: any)=> {
      if (!user) return;

      userService.save(user);

      let returnUrl: any = localStorage.getItem('returnUrl');
      if(!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
      
    });    
  }
}
