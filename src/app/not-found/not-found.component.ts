import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  error: String;

  constructor() { 

    this.error = "Page not found";
    console.log("Page not found");
    
  }

  ngOnInit() {
  }

}
