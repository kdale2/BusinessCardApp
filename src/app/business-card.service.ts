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

  //create read update destroy

  private dbPath = 'businessCards';
  cards: Observable<BusinessCardComponent[]>;
  busCardCollection: AngularFirestoreCollection<BusinessCardComponent>;
  businessCard: BusinessCardComponent;
  key: string;

  constructor(private firestore: AngularFirestore) { 

    this.busCardCollection = firestore.collection<BusinessCardComponent>(this.dbPath);
    this.cards =  this.busCardCollection.valueChanges();

  }

  getCards() {

/*     this.cards = [new BusinessCardComponent('BusinessCard1'),
                  new BusinessCardComponent('BusinessCard2')];
    return this.cards; */

   return this.firestore.collection("businessCards").snapshotChanges(); 
   
  }

  createBusinessCard(businessCard: BusinessCardComponent) {
   
    console.log("creating a business card");
    this.businessCard = businessCard;
    console.log("in bus card service: " + this.businessCard.firstName);

    //this is successfully pushing to firebase
    this.firestore.collection('businessCards')
      .add({firstName: this.businessCard.firstName, company: this.businessCard.company, phone: this.businessCard.phone});



/*     return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("businessCards")
        .add(this.businessCard)
        .then(res => {}, err => reject(err));
    });  */

  }

  updateBusinessCard(data) {

    console.log("updating a business card");

    return this.firestore
      .collection("businessCards")
      .doc(data.payload.doc.id)
      .set({completed: true}, {merge:true});

  }

  deleteBusinessCard(businessCard: BusinessCardComponent, key: string) {


    this.key = key;
    //to do
    console.log("Deleting a business card - service");
    this.businessCard = businessCard;
    console.log("in the service and deleting " + this.businessCard.firstName);


    //this works but only for specific key
    this.firestore.collection("businessCards").doc(key).delete();


    //implement delete functionality

  }
}
