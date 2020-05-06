import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import {Chart} from 'chart.js';
import { MaterialService, MaterialDatepicker } from 'src/app/shared/classes/material.service';
import { DetailsService } from 'src/app/shared/services/details.service';
import { Statictic } from 'src/app/shared/interfaces/statictic';
import * as moment from 'moment';
import { fromEvent, Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,AfterViewInit,AfterContentInit,OnDestroy {
   @ViewChild('picker1',{read: ElementRef}) from:ElementRef;
   @ViewChild('picker2',{read: ElementRef}) to:ElementRef;
   @ViewChild('clikcs') totalClicks:ElementRef;
   @ViewChild('page_views') totalViews:ElementRef;
   private unSubscribe=new Subject();
   form:FormGroup;
   start:MaterialDatepicker;
   end:MaterialDatepicker;
   isValid:boolean;
   statictic:Statictic[]=[];
   dataClikcForChart:number[]=[];
   dateClikcForChart:string[]=[];
   temporyClickDate:string[]=[];
   temporyViewDate:string[]=[];
   startdefault:number= -7;
   enddefault:number;
   startDate:string;
   endDate:string;
   datapage_viewsForChart:number[]=[];
   datepage_viewsForChart:string[]=[];

  constructor(private detailService:DetailsService) { }

  ngOnInit() {
    this.form=new FormGroup({
     date1:new FormControl(''),
     date2:new FormControl('')
    })
    
  }
  ngAfterContentInit(){
    this.chartForCliks();
    this.chartForView()
  }
  ngAfterViewInit(){
    this.start= MaterialService.initDatepicker(this.from ,this.validate.bind(this));
    this.end= MaterialService.initDatepicker(this.to,this.validate.bind(this));
    fromEvent(this.from.nativeElement,'change').pipe(takeUntil(this.unSubscribe)).subscribe(data=>{this.startDate=data['target'].value});
    fromEvent(this.to.nativeElement,'change').pipe(takeUntil(this.unSubscribe)).subscribe(data=>{this.endDate=data['target'].value
    });
   
    
  }
  validate(){
    if(this.start.date|| this.end.date){
        this.isValid=false;

    }
    else if (!this.start.date || !this.end.date ) {
      this.isValid=true
     
    }

    this.isValid=this.start.date<this.end.date;

    }
    chartForCliks(){
      const clickconfig:any={
        label:"TotalClicks",
        color:'rgb(255,199,99)'
      }
      this.detailService.getData().subscribe((data:Statictic[])=>{this.statictic=data
        for(let i=0; i<this.statictic.length;i++){
           this.dataClikcForChart.push(this.statictic[i].clicks)
           this.dateClikcForChart.push(this.statictic[i].date)
        }
        for(let i=0; i<this.dateClikcForChart.length;i++){
         this.temporyClickDate.push(moment(this.dateClikcForChart[i]).format('DDMMYYYY'))    
      } 
        
        clickconfig.labels= this.temporyClickDate.slice(this.startdefault,this.enddefault);
        clickconfig.data=this.dataClikcForChart.slice(this.startdefault,this.enddefault);
        const context=this.totalClicks.nativeElement.getContext('2d');
        context.height='600px';
        new Chart(context,createChartConfig(clickconfig))
      })
    }
    chartForView(){
      const clickconfig:any={
        label:"TotalViews",
        color:'rgb(255,199,99)'
      }
      this.detailService.getData().subscribe((data:Statictic[])=>{this.statictic=data
        for(let i=0; i<this.statictic.length;i++){
           this.datapage_viewsForChart.push(this.statictic[i].page_views)
           this.datepage_viewsForChart.push(this.statictic[i].date)
        }
        for(let i=0; i<this.datepage_viewsForChart.length;i++){
          this.temporyViewDate.push(moment(this.datepage_viewsForChart[i]).format('DDMMYYYY')) 
         } 
        clickconfig.labels= this.temporyViewDate. slice(this.startdefault,this.enddefault);
        clickconfig.data= this.datapage_viewsForChart.slice(this.startdefault,this.enddefault);
        const context=this.totalViews.nativeElement.getContext('2d');
        context.height='600px';
        new Chart(context,createChartConfig(clickconfig))
      })
    }
    getDate(){
       this.startdefault=this.temporyClickDate.indexOf(this.startDate);
       this.enddefault=this.temporyClickDate.indexOf(this.endDate)+1;
       this.chartForCliks();
       this.chartForView()
      
    }
    ngOnDestroy(){
      this.unSubscribe.next();
    this.unSubscribe.complete();
     
    }
}
function createChartConfig({labels,color,label,data}){
  return {
    type:'line',
    options:{
      responsive:true,
    },
    data:{
      labels,
      datasets:[{
        label,
        data,
        borderColor:color,
        stepedLine:false,
        fill:false
      }]
    }

  }
}