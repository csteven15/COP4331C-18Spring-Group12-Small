import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fname: String;
  lname: String;
  phone: String;

  constructor(
    private validateService: ValidateService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddContactSubmit() {
    const contact = {
      fname: this.fname,
      lname: this.lname,
      phone: this.phone
    }
  }

}
