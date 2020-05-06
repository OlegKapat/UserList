import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit,AfterViewInit,OnDestroy {
  @ViewChild("gender") gender:ElementRef;
  aSub:Subscription
  registrationForm:FormGroup;
 
  constructor(private service:UserService) { }

  ngOnInit() {
    this.registrationForm=new FormGroup({
      firstName:new FormControl(null,Validators.required),
      lastName:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required]),
      gender:new FormControl('',Validators.required),
      ipAddress:new FormControl('',Validators.required),
      totalClicks:new FormControl((Math.random()*100).toFixed()),
      totalPageViews:new FormControl((Math.random()*100).toFixed())
    
   })
  }
  ngAfterViewInit(){
    MaterialService.initSelect(this.gender);
    
  }
  onSubmitRegister(){
    this.aSub=this.service.setUser(this.registrationForm.value).subscribe(data=>console.log(data));
    this.registrationForm.reset();
      
  }
  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe();
    }
  }
}
