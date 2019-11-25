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
  public show:boolean = false;
  public buttonName:any = 'Show';
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  address: string;
  phone: string;

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

    update(businessCard: BusinessCardComponent, id: string, firstName: string, lastName: string, 
      company: string, position: string, address: string, phone: string)
    {
      this.businessCard = businessCard;
      this.key = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.company = company;
      this.position = position;
      this.address = address;
      this.phone = phone;

      this.businessCardService.updateBusinessCard(this.businessCard, this.key, this.firstName, this.lastName, 
        this.company, this.position, this.address, this.phone);
    }

    toggle(businessCard: BusinessCardComponent, id: string) {

      this.businessCard = businessCard;
      this.key = id;
      this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
      if(this.show)  
        this.buttonName = "Hide";
      else
        this.buttonName = "Show";
    }
  } 