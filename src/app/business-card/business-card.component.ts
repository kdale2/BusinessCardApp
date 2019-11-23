import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  firstName: string;
  lastName: string;
  company: string;
  position: string;
  address: string;
  phone: string;

  constructor(firstName: string, lastName: string, company: string, position: string, address: string, phone: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.company = company;
      this.position = position;
      this.address = address;
      this.phone = phone;
   }

  ngOnInit() {
  }

}
