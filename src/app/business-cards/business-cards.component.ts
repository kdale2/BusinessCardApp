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
  key: string;
  name: string; //for testing update

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


  deleteCard(businessCard: BusinessCardComponent, id: string) {
    this.key = id;
    this.businessCard = businessCard;
    console.log("deleting card");
    console.log("detelting " + this.businessCard.firstName);
    this.businessCardService.deleteBusinessCard(this.businessCard, this.key);
    }

    update(businessCard: BusinessCardComponent, id: string, name: string)
    {
      this.key = id;
      this.businessCard = businessCard;
      this.name = 'updated name';
      this.businessCardService.updateBusinessCard(this.businessCard, this.key, this.name);
    }
  } 

