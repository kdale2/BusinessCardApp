import { Injectable } from '@angular/core';
import { BusinessCardComponent } from './business-card/business-card.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { BusinessCardService } from './business-card.service';

@Injectable({
  providedIn: 'root'
})
export class CloudvisionService {

  url: string;
  businessCard: BusinessCardComponent;
  value: any;
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  address: string;
  phone: string;

  constructor(private http: HttpClient, private busCardService: BusinessCardService) { 
    this.url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVisionKey}`;
  }

 postRequest(payload: any) {

    console.log("In image service post request");
    console.log("url: " + this.url);

    return this.http.post(this.url, payload).subscribe(
      (results: any) => { 
        console.log("Results from http request");
        //console.log(results.description);
        //console.log(results[1]);  
        let text = results["responses"][0].fullTextAnnotation.text;
        //this.txtano = "\n" + results.json().responses[0].fullTextAnnotation.text;
        //console.log(text);
        text = text.replace('\/', "");
        //console.log(text);
        this.createNewCard(text);

    });
  }  

  //need a function to parse out the text response
    createNewCard(text: string): BusinessCardComponent {


      if (text) {

        const line = text.split('\n');

        this.firstName = line[0];
        this.lastName = line[1];
        this.company = line[2];
        this.position = line[3]
        this.address = line[4];
        this.phone = line[5];

      }

      this.businessCard = new BusinessCardComponent(this.firstName, this.lastName, this.position, this.company, this.address, this.phone);
      console.log(this.businessCard.address);
      this.busCardService.createBusinessCard(this.businessCard);
      alert("Business Card Added! Navigate to dashboard to view.");
      return this.businessCard;
    }
}

