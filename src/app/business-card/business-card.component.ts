import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  firstName: string;
  company: string;
  phone: string;

  constructor(name: string, company: string, phone: string) {
      this.firstName = name;
      this.company = company;
      this.phone = phone;
   }

  ngOnInit() {
  }

}
