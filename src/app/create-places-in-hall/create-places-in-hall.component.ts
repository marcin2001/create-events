import { Component, OnInit, OnChanges } from '@angular/core';
import { CreatePlacesServeice } from './create-places-in-hall.service';
@Component({
  selector: 'app-create-places-in-hall',
  templateUrl: './create-places-in-hall.component.html',
  styleUrls: ['./create-places-in-hall.component.scss']
})
export class CreatePlacesInHallComponent implements OnInit, OnChanges {

  dataSection:any = '';
  selectedElementId = 1;
  arrayWidthSection:any = [];
  idSelectedSectionForDiferentOperation:string = '';
  changeClassAfterClickEdit = false;
  idForSelectElementsAfterCreateThem = 1;
  memoryEvents = 1;

  // DATA FOR SECTION
  displayPanelsSettings = 'base-panel-with-tool';
  sectionNumber = 1;
  sectionSelect:string = 'Assigned Seating';
  sectionRows:number = 5;
  sectionSeats:number = 10;

  // DATA FOR EDIT SECTION
  nameChairRow = '';
  nameSeat = '';
  idEditedSection = 0;
  idEditedChair = 0;
  editedObjectForPost:any;

  constructor(
    private myService: CreatePlacesServeice
  ) { }

  refreshDataSection(){
    this.myService.getDataSection().subscribe((data: any)=>{
      this.dataSection = data;
      this.pushAllSectionInArrayWidthSection(data.length)
    })
  }

  ngOnInit() {

    this.refreshDataSection()
    document.getElementById('container').style.height = window.innerHeight + 'px';
  }

  ngOnChanges(changes){
    if( changes.howManyIdOFSection && changes.howManyIdOFSection.currentValue ) {

    }

  }

  pushAllSectionInArrayWidthSection(legth){
    for (let i = 1; i < legth+1; i++) {
      this.arrayWidthSection.push( "section" + i);  
    }
  }

  switchDispalyPanelSettings(argument){
    this.displayPanelsSettings = argument;
  }
  
  createDataForSection(id){
    var idForChair = 1;
    var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l'];
    var object = {
      numberSection: this.sectionNumber,
      arrayWidthPlaces: []
    }
    var sectRow = Number(this.sectionRows)+1;
    var sectSeat = Number(this.sectionSeats)+1;
    var index = 1;
    while( index < sectRow ) {
      object.arrayWidthPlaces.push(
        {
          nameRow:alphabet[index-1].toUpperCase(),
          arrWithChear:[]
        }
      )
      index++;
    }
    object.arrayWidthPlaces.map(a=>{

      for (let i = 1; i < sectSeat; i++) {
        a.arrWithChear.push(
          {
            seat: i,
            selected: false,
            id: idForChair
          }
        )
        idForChair++;
      }
    })
    var dataId = 1
    this.myService.postDataSection(object).subscribe((data:any)=> {
      console.log( data )
      this.refreshDataSection()
      dataId = data.id;
    });
    this.sectionNumber++;
    this.switchDispalyPanelSettings('panel-setting-object-section');
    this.idForSelectElementsAfterCreateThem++;
    this.selectedSection(dataId);
  }

  duplicateSection(){
    var arr = this.dataSection.filter(a=>a.id === this.idSelectedSectionForDiferentOperation);
    arr.numberSection = this.sectionNumber;
    delete arr.id;
    console.log( arr )
  }  

  // FUNCTIONAL MOVE


  isMouseDown = false;
  contX = 0;
  contY = 0;
  idElem;

  functionForDownSection(e, id){
    this.selectedSection(id)
    this.idElem = "section" + id;
  	this.contX = (e.clientX - document.getElementById(this.idElem).offsetLeft + document.getElementById('map').offsetLeft );
    this.contY = (e.clientY - document.getElementById(this.idElem).offsetTop + document.getElementById('map').offsetTop );
    this.isMouseDown = true;
  }

  selectedSection(id){
    this.idSelectedSectionForDiferentOperation = id;
    this.arrayWidthSection.map(a=>{
      if( a === ("section"+id) && this.changeClassAfterClickEdit != true ){
        document.getElementById(a).style.border = '3px dashed #0093D7';
      } else document.getElementById(a).style.border = 'none';  
    })
    if( this.displayPanelsSettings != 'editing-cair-settings' ) {
      this.displayPanelsSettings = 'panel-setting-object-section';
    }
  }

  functionForUpSection(){
    	this.isMouseDown = false;
  }

  functionForMoveSection(e) {
  	if( this.isMouseDown ){
      var x = e.clientX;
      var y = e.clientY;
      document.getElementById(this.idElem).style.marginTop = y - this.contY + 'px';
      document.getElementById(this.idElem).style.marginLeft = x - this.contX + 'px';
    }
  }

  // FUNCTIONS FOR EDIT SECTION

  changeViewMapAndSection(){
    var map = document.getElementById('map');
    var section = document.getElementById('section' + this.idSelectedSectionForDiferentOperation);
    section.style.border = 'none';
    map.style.background = 'rgba(0,0,0,0.65)';
    section.style.pointerEvents = 'none';
    this.changeClassAfterClickEdit = true;
    this.displayPanelsSettings = 'editing-cair-settings';
  }
  
  selectChair(idSection, idCair){
    this.idEditedSection = idSection;
    this.idEditedChair = idCair;
    this.displayPanelsSettings = 'editing-cair-settings';
    var arr = this.dataSection.filter(data => data.id === idSection);
    arr = arr[0];
    arr.arrayWidthPlaces.map(a=>{
      a.arrWithChear.map(data=>{
        if( data.id === idCair ) {
          data.selected = true;
          this.nameSeat = data.seat;
          this.nameChairRow = a.nameRow;
        }
      })
    })
    
  }

  editDataChair(){
    var editedChairObject = {
      seat: this.nameSeat,
      selected: false,
      id:this.idEditedChair
    }
    var arr = this.dataSection.filter(data => data.id === this.idEditedSection);
    arr = arr[0];
    arr.arrayWidthPlaces.map(a=>{
      a.arrWithChear.map(data=>{
        if( data.id === this.idEditedChair ){
          a.nameRow = this.nameChairRow;
          a.arrWithChear.splice( 
            a.arrWithChear.indexOf(data),
            1,
            editedChairObject
          )
        } 
      })
    })
    this.editedObjectForPost = arr;
  }
  
  postEditedObject(){
    if( this.editedObjectForPost != undefined ) {
      this.myService.updateSections(this.editedObjectForPost.id , this.editedObjectForPost).subscribe(data => {
        console.log( data )
        this.refreshDataSection()
      })
    }
  }

  deleteChair(){
    var arr = this.dataSection.filter(data => data.id === this.idEditedSection);
    arr = arr[0];
    arr.arrayWidthPlaces.map(a=>{
      a.arrWithChear.map(data=>{
        if( data.id === this.idEditedChair ){
          a.arrWithChear.splice( 
            a.arrWithChear.indexOf(data),
            1
          )
        } 
      })
    })
    this.myService.updateSections(arr.id , arr).subscribe(data => {
      console.log( data )
      this.refreshDataSection()
    })
  }

  // FUNCTION DELETE SECTOIN

  deleteSelectedSection(){
    if( this.idSelectedSectionForDiferentOperation != '' ) {
      var idElements =  this.arrayWidthSection.indexOf('section' + this.idSelectedSectionForDiferentOperation);
      this.arrayWidthSection.splice( idElements , 1 )
      this.myService.deleleSection(this.idSelectedSectionForDiferentOperation)
      .subscribe(data=>this.refreshDataSection())
    }
    
  }
  
}
