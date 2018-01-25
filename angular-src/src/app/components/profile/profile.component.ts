import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fname: String;
  lname: String;
  phone: String;

  constructor(
    private validateService: ValidateService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {}

  onAddContactSubmit() {
    const contact = {
      fname: this.fname,
      lname: this.lname,
      phone: this.phone
    }

    // fields
    if(!this.validateService.validateAddContact(contact)) {
    console.log('Please fill in all contact fields');
      return false;
    }

    // contact
    this.authenticateService.addContact(contact).subscribe(data => {
    if(data.success) {
      console.log('Added contact');
      this.router.navigate(['/profile']);
    } else {
      console.log('Failed to add contact');
      this.router.navigate(['/profile']);
    }
  });
  }

}
