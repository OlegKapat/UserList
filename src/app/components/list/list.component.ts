import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { Content } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';




@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{
 
  user$:Observable<Content>;
  aSub:Subscription
  dtOptions: DataTables.Settings = {};
  page: number;
  range:number;
  
  constructor(private userService:UserService, private router:Router, 
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams:Params)=>{this.page=queryParams['page'], this.range=queryParams['range']},error=>console.log(error))
    this.user$=this.userService.getUser();
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:5,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]]
      
    };
   
  }
  getUser(id){
    this.router.navigate([`/details/${id}`])
  }
   ngOnDestroy(){
     if(this.aSub){
       this.aSub.unsubscribe()
     }
   }
}
