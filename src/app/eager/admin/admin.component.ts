import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("---> eager/admin");
  }

}
