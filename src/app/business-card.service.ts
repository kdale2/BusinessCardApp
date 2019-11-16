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
  name: string;

  constructor(private firestore: AngularFirestore) { }

  getCards() {

/*     this.cards = [new BusinessCardComponent('BusinessCard1'),
                  new BusinessCardComponent('BusinessCard2')];
    return this.cards; */

   return this.firestore.collection("businessCards").snapshotChanges(); 
   
  }

  createBusinessCard(data) {

    console.log("creating a business card");

    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("businessCards")
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  updateBusinessCard(data) {

    console.log("updating a business card");

    return this.firestore
      .collection("businessCards")
      .doc(data.payload.doc.id)
      .set({completed: true}, {merge:true});

  }

  deleteBusinessCard(data) {

    //to do
    console.log("Deleting a business card");

    return this.firestore
      .collection("businessCards")
      .doc(data.payload.doc.id)
      .delete();

  }
}
