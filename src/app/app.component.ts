import { Component, OnInit } from '@angular/core';
import { CreatePlacesServeice } from './create-places-in-hall/create-places-in-hall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataSection: any = [];

  constructor(
    private myService: CreatePlacesServeice
  ) { }
  
  refreshDataSection(){
    this.myService.getDataSection().subscribe((data: any) => {
      this.dataSection = data
    })
  }

  ngOnInit(){
    this.refreshDataSection()
  }

  postData(object){
    delete object.id
    this.myService.postDataSection(object).subscribe((data: any) => {
      this.refreshDataSection()
    })
  }

  deleteSection(id){
    this.myService.deleleSection(id).subscribe(data => this.refreshDataSection())
  }

  saveAllChange(arr){
    let arrPost:any = arr.filter(a=>{ return a})[0];
    let arrId:any = [];
    arrId.push(arrPost.map(data=>{
      return data.id
    }))
    arrId = arrId[0];

    for (let i = 0; i < arrPost.length; i++) {
      this.myService.saveAllChange(arrPost[i],arrId[i]).subscribe(data=>{})
    }
  }
  
}
