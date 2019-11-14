import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

  name: string;

  constructor(name: string) {
      this.name = name;
   }

  ngOnInit() {
  }

}
