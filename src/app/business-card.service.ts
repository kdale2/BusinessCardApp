import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { BusinessCardComponent } from './business-card/business-card.component';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {

  //create read update destroy

 
  cards: BusinessCardComponent[];

  constructor(private firestore: AngularFirestore) { }

  getCards(): BusinessCardComponent[] {

    this.cards = [new BusinessCardComponent('BusinessCard1'),
                  new BusinessCardComponent('BusinessCard2')];
    return this.cards;
    

  }


  createBusinessCard() {

    //to do
    console.log("Creating a business card");

  }

  updateBusinessCard() {

    //to do
    console.log("Updating a business card");

  }

  deleteBusinessCard() {

    //to do
    console.log("Deleting a business card");

  }



}
