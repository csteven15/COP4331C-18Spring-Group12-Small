import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { Contact } from '../../contact';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  contacts: Contact[];
  contact: Contact;
  fname: String;
  lname: String;
  phone: String;
  username: String;

  constructor(
    private validateService: ValidateService,
    private authenticateService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authenticateService.getProfile().subscribe(profile => {
      this.user = profile.user;
    });
    this.authenticateService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  deleteContact(id: any) {
    var contacts = this.contacts;
    this.authenticateService.deleteContact(id)
      .subscribe(data => {
        if(data.n == 1) {
          for(var i = 0; i < contacts.length; i++) {
            if(contacts[i]._id == id) {
              contacts.splice(i, 1);
            }
          }
        }
      });
  }

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
      //this.user.contacts.push(contact);
      this.contacts.push(contact);
      console.log(this.user);
      this.authenticateService.getContacts()
        .subscribe(contacts =>
        this.contacts = contacts);
      if(data.success) {
        console.log('Added contact');
      } else {
        console.log('Failed to add contact');
      }
    });
  }

}
