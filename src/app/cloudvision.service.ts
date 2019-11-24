import { Injectable } from '@angular/core';
import { BusinessCardComponent } from './business-card/business-card.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BusinessCardsComponent } from './business-cards/business-cards.component';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudvisionService {

  url: string;
  businessCard: BusinessCardComponent;
  value: any;
  email: string; //for testing responses

  constructor(private http: HttpClient) { 
    this.url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVisionKey}`;
  }

 postRequest(payload: any) {
    console.log("In image service post request");
    console.log("url: " + this.url);

    return this.http.post(this.url, payload).subscribe(
      (results: any) => { 
        console.log("Results from http request");
        console.log(results);  

        //const restString = [];
        //console.log("Returned string: " + restString);
        //console.log(response);
        //this.getResponse();
/*           value.forEach(
          result => {
            const temp = result.description;

            console.log('response from cloud vision: ' + result.description);
            console.log(result[0]);

            // verify email
            const email = (temp.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(.*)$/) || [''])[0];
            if (email !== '') {
              this.email = email;
              console.log("response putting in first name: " + this.email);
              return;
            }
          }
          );   */
    }
    );
  }  

/* getResponse() {
    console.log("in get response");
    this.http.get('test').pipe(map(data => {console.log(data)}))
      .subscribe(result => {console.log(result[0]);});
  }  */
}

