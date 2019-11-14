import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from '../business-card.service';
import { BusinessCardComponent } from '../business-card/business-card.component';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {


  businessCards: BusinessCardComponent[];

  constructor(private businessCardService: BusinessCardService) { 

    console.log("business cards component");

    this.businessCards = businessCardService.getCards();

  }

  ngOnInit() {
  }


}
