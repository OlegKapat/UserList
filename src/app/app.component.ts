import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav:ElementRef;
  modalRegister:MaterialInstance;
  title = 'listusers';

  constructor(){}

  ngAfterViewInit(){
   this.modalRegister= MaterialService.sideNav(this.sidenav);
  }
  open(){
    this.modalRegister.open()
  }
}
