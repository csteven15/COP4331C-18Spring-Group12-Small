import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
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
    private validateService: ValidateService
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
      return false;
    }

    // email
    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please use a valid email');
      return false;
    }

  }



}
