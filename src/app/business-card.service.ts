import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BusinessCardComponent } from './business-card/business-card.component';
import { Observable } from 'rxjs';
import { idTokenResult } from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardService {

  private dbPath = 'businessCards';
  cards: Observable<BusinessCardComponent[]>;
  busCardCollection: AngularFirestoreCollection<BusinessCardComponent>;
  businessCard: BusinessCardComponent;
  key: string;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  address: string;
  phone: string;

  constructor(private firestore: AngularFirestore) { 
    this.busCardCollection = firestore.collection<BusinessCardComponent>(this.dbPath);
    this.cards =  this.busCardCollection.valueChanges();
  }

  getCards() {
   return this.firestore.collection("businessCards").snapshotChanges(); 
  }

  createBusinessCard(businessCard: BusinessCardComponent) {
   
    this.businessCard = businessCard;

    //this is successfully pushing to firebase
    this.firestore.collection('businessCards')
      .add({firstName: this.businessCard.firstName, lastName: this.businessCard.lastName, company: this.businessCard.company, 
        position: this.businessCard.position, address: this.businessCard.address, phone: this.businessCard.phone});
  }

  updateBusinessCard(businessCard: BusinessCardComponent, key: string, firstName: string, lastName: string, company: string, position: string, address: string, phone: string) {

    this.businessCard = businessCard;
    this.key = key;
    this.firstName = firstName;
    this.lastName = lastName;
    this.company = company;
    this.position = position;
    this.address = address;
    this.phone = phone;
    const card = this.firestore
    .collection("businessCards").doc(key).update({ firstName: this.firstName, lastName: this.lastName, company: this.company, 
      position: this.position, address: this.address, phone: this.phone});
  }

  deleteBusinessCard(businessCard: BusinessCardComponent, key: string) {

    this.key = key;
    this.businessCard = businessCard;
    this.firestore.collection("businessCards").doc(key).delete();
  }
}