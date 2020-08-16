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
    this.businessCardService.deleteBusinessCard(this.businessCard, this.key);
    }

    update(businessCard: BusinessCardComponent, id: string, firstName: string, lastName: string, 
      company: string, position: string, address: string, phone: string)
    {
      console.log('updating card');
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

/*       //clear form fields
      let inputValue = (<HTMLInputElement>document.getElementById("first"));
      inputValue.value = '';

      let inputValue2 = (<HTMLInputElement>document.getElementById("lastName"));
      inputValue2.value = '';
  
      let inputValue3 = (<HTMLInputElement>document.getElementById("company"));
      inputValue3.value = '';
  
      let inputValue4 = (<HTMLInputElement>document.getElementById("position"));
      inputValue4.value = '';
  
      let inputValue5 = (<HTMLInputElement>document.getElementById("address"));
      inputValue5.value = '';
  
      let inputValue6 = (<HTMLInputElement>document.getElementById("phone"));
      inputValue6.value = ''; */

      this.toggle(this.businessCard, this.key);

    }

    toggle(businessCard: BusinessCardComponent, id: string) {

      this.businessCard = businessCard;
      this.key = id;

      this.show = !this.show;

      if(this.show)  
        this.buttonName = "Hide";
      else
        this.buttonName = "Show";
    }
  } 