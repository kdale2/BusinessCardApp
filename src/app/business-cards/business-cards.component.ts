import { Component, OnInit } from '@angular/core';
import { BusinessCardService } from '../business-card.service';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-cards',
  templateUrl: './business-cards.component.html',
  styleUrls: ['./business-cards.component.css']
})
export class BusinessCardsComponent implements OnInit {

  businessCard: BusinessCardComponent;

  constructor(private businessCardService: BusinessCardService) { 
/* 
    console.log("business cards component");
    this.businessCards = businessCardService.getCards(); */

  }

  ngOnInit() { 
    this.getBusCards();
    
  }

  businessCards;

  getBusCards = () =>
    this.businessCardService
      .getCards()
      .subscribe(res => (this.businessCards = res));

    
  addCard(nameInput: string, companyInput: string) {
    console.log("Adding a new card");
    this.businessCard = new BusinessCardComponent(nameInput, companyInput);
    console.log("new business card name: " + this.businessCard.firstName);

    //right now this is only sending over the input for 'name' field and not an object
    this.businessCardService.createBusinessCard(this.businessCard);
  }
  } 

