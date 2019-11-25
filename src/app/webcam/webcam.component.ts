import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import {WebcamUtil} from 'ngx-webcam';
import {WebcamInitError} from 'ngx-webcam';
import domtoimage from 'dom-to-image';
import { BusinessCardComponent } from '../business-card/business-card.component';
import { BusinessCardService } from '../business-card.service';
import { environment } from 'src/environments/environment';
import { CloudvisionService } from '../cloudvision.service';



@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

    businessCard: BusinessCardComponent;
    busCardService: BusinessCardService;

    // toggle webcam on/off
    public showWebcam = true;
    public allowCameraSwitch = true;
    public multipleWebcamsAvailable = false;
    public deviceId: string;
    public facingMode: string = 'environment';
    public errors: WebcamInitError[] = [];
  
    // latest snapshot
    public webcamImage: WebcamImage = null;
  
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
    private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

    base64: string;
    imageUrl;

    private URL = `https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVisionKey}`;


  constructor(busCardService: BusinessCardService, private cloudvision: CloudvisionService) { this.busCardService = busCardService }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  addCard(firstNameInput: string, lastNameInput: string, companyInput: string, positionInput: string, addressInput: string, phoneInput: string) {
    console.log("Adding a new card");
    this.businessCard = new BusinessCardComponent(firstNameInput, lastNameInput, companyInput,positionInput, addressInput, phoneInput);
    console.log("new business card name: " + this.businessCard.firstName);

    //right now this is only sending over the input for 'name' field and not an object
    this.busCardService.createBusinessCard(this.businessCard);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.imageUrl = webcamImage.imageAsDataUrl;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  public save(){
    console.log("Saving picture"); 
    console.log(this.imageUrl);

    this.convertToBase64();
    const parsedImage = this.imageUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

    console.log("Converted to base 64");
    const payload: any = {
      'requests': [
        {
          'image': {
            'content' : parsedImage
          },
          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1
            }
          ]
        }
      ]
    }
    this.cloudvision.postRequest(payload);
  }

  convertToBase64() {
    console.log("Coverting to base 64");
    const imgNode = document.getElementById('image');

    //const image = document.createElement('img');
    //image.src = this.imageUrl;
    //const imgNode = this.imageUrl;
    if (imgNode ) {
      console.log('SELECTED IMAGE');
      console.log(imgNode);
      console.log('SELECTED IMAGE');
      domtoimage.toPng(imgNode)
      .then( (dataUrl: string) => {
        console.log('SELECTED IMAGE 2');
        console.log(dataUrl);
        this.base64 = dataUrl;
        console.log('SELECTED IMAGE 2');
      }).catch( (e: any) => {
        console.log('SELECTED IMAGE BASE64 SOMETHING WENT WRONG');
        console.log(e);
      });
     }
  }
}