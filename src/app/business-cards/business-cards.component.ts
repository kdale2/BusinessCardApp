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
  } 

