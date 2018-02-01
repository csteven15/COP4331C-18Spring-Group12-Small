import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authenticateService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        console.log('You are logged in');
        alert("You are logged in");
        this.authenticateService.storeUserData(data.token, data.user);
        this.router.navigate(['/profile']);
      } else {
        console.log(data.msg);
        this.router.navigate(['/login']);
        alert("Wrong credentials");
      }
    });
  }

}
