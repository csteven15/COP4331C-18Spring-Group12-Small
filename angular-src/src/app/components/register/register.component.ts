import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: String;
  lname: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // fields
    if(!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      alert("Please fill in all fields");
      return false;
    }

    // email
    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      alert("Please use a valid email");
      return false;
    }

    // users
    this.authenticateService.registerUser(user).subscribe(data => {
      if(data.success) {
        console.log('You are now registered and can login');
        alert("You are now registered and can login");
        this.router.navigate(['/login']);
      } else {
        console.log('You need to register again');
        alert("You need to register again'");
        this.router.navigate(['/register']);
      }
    });
  }



}
