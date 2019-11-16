import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from '../business-card.service';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  error: String;
  name: String;

  constructor(private businessCardService: BusinessCardService) { 

    this.error = "Page not found";
    console.log("Page not found");
    this.name = this.businessCardService.getName();

    
  }

  ngOnInit() {
  }

  getNames() {

    console.log("getting naem from database?");
    this.name = this.businessCardService.getName();

  }

}
