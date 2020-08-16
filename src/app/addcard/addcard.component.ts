import { Component, OnInit } from '@angular/core';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { BusinessCardService } from '../business-card.service';
import { $ } from 'protractor';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {

  display = 'none';

  businessCard: BusinessCardComponent;

  constructor(private busCardService: BusinessCardService) { }

  ngOnInit() {
  }

  addCard(firstNameInput: string, lastNameInput: string, companyInput: string, positionInput: string, addressInput: string, phoneInput: string) {
    this.businessCard = new BusinessCardComponent(firstNameInput, lastNameInput, companyInput,positionInput, addressInput, phoneInput);
    this.busCardService.createBusinessCard(this.businessCard);

    //clear all inputs - looking for a better way to do this
    let inputValue = (<HTMLInputElement>document.getElementById("first"));
    inputValue.value = '';

    let inputValue2 = (<HTMLInputElement>document.getElementById("last"));
    inputValue2.value = '';

    let inputValue3 = (<HTMLInputElement>document.getElementById("company"));
    inputValue3.value = '';

    let inputValue4 = (<HTMLInputElement>document.getElementById("position"));
    inputValue4.value = '';

    let inputValue5 = (<HTMLInputElement>document.getElementById("address"));
    inputValue5.value = '';

    let inputValue6 = (<HTMLInputElement>document.getElementById("phoneNumber"));
    inputValue6.value = '';

    // add success message when card has been added
    let p = document.getElementById("success");
    p.style.visibility = "visible";
    setTimeout(function () {
          document.getElementById("success").style.display='none';
      }, 3000)
    
  }

}
