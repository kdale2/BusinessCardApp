import { Component, OnInit } from '@angular/core';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { BusinessCardService } from '../business-card.service';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {

  businessCard: BusinessCardComponent;

  constructor(private busCardService: BusinessCardService) { }

  ngOnInit() {
  }

  addCard(firstNameInput: string, lastNameInput: string, companyInput: string, positionInput: string, addressInput: string, phoneInput: string) {
    this.businessCard = new BusinessCardComponent(firstNameInput, lastNameInput, companyInput,positionInput, addressInput, phoneInput);
    this.busCardService.createBusinessCard(this.businessCard);
    alert("Card added. Navigate to your dashboard to view.");
  }

}
