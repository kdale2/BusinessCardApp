import { Injectable } from '@angular/core';
import { BusinessCardComponent } from './business-card/business-card.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BusinessCardService } from './business-card.service';

@Injectable({
  providedIn: 'root'
})
export class CloudvisionService {

  url: string;
  businessCard: BusinessCardComponent;
  value: any;
  firstName: string = "jam";
  lastName: string;
  company: string;
  position: string;
  address: string;
  phone: string;
  email: string;

  constructor(private http: HttpClient, private busCardService: BusinessCardService) { 
    this.url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVisionKey}`;
  }

 postRequest(payload: any) {

    return this.http.post(this.url, payload).subscribe(
      (results: any) => { 
        console.log("Results from http request:"); 
        console.log(results);

        let text = results["responses"][0].fullTextAnnotation.text;
        text = text.replace('\/', "");
        console.log("The 'text' we use to create new card is: " + text);
        this.createNewCard(text);
    });
  }  

  createNewCard(text: string): BusinessCardComponent {

    console.log("We've reached create new card");
      if (text) {

        let phoneMatches = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
        if (phoneMatches) {
          this.phone = phoneMatches[0];
          console.log("phone number we extracted: " + this.phone);
        } else {
          this.phone = 'N/A';
        }
      

        // not working
        let emailMatch = text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (emailMatch) {
          console.log("We got an email");
          this.email = emailMatch[0];
          console.log("Extracted email: " + this.email);
        }

        //only works properly if layout of card is exactly like this
        const line = text.split('\n');
        console.log("First line of results: " + line[0]);
        console.log("Second line of results: " + line[1]);
        console.log("Third line: " + line[2]);
        let fullName = line[0].split(' ');
        this.firstName = fullName[0];
        this.lastName = fullName[1];
        this.company = line[1];
        this.position = line[2]
        this.address = line[3];
      }

      this.businessCard = new BusinessCardComponent(this.firstName, this.lastName, this.position, this.company, this.address, this.phone);
      console.log("Address extracted: " + this.businessCard.address); //testing
      this.busCardService.createBusinessCard(this.businessCard);
      alert("Business Card Added! Navigate to dashboard to view.");
      return this.businessCard;
    }
}

