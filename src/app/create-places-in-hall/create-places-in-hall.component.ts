import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-create-places-in-hall',
  templateUrl: './create-places-in-hall.component.html',
  styleUrls: ['./create-places-in-hall.component.scss']
})

export class CreatePlacesInHallComponent implements OnInit, OnChanges {


  @Input() dataSection: any = [];
  @Output() postData = new EventEmitter();
  @Output() deleteSection = new EventEmitter();
  @Output() saveAllChange = new EventEmitter();
  
  copyDatasSection:any = [];
  selectedElementId:number = 1;
  arrayWidthSection:string[] = [];
  idSelectedSectionForDiferentOperation:string = '';
  changeClassAfterClickEdit:boolean = false;
  idForSelectElementsAfterCreateThem:number = 1;
  memoryEvents:number = 1;
  needTitle:boolean = true;
  nowSelectedSetion = false;
  dataSelectedChair:any = {}; 


  // DATA FOR SECTION
  displayPanelsSettings:string = 'base-panel-with-tool';
  sectionNumber:number = 1;
  sectionSelect: string = 'Assigned Seating';
  sectionRows: number = 5;
  sectionSeats: number = 10;
  priceAllSeatInSectoin = 100;
  editDataSection:any = {};
  currency = "dollar";
  valueRotate = 0;
  valueSkew:string = '0';
  valueCurve:string = '0';

  // DATA FOR EDIT SECTION
  nameChairRow:string = '';
  nameSeat:string = '';
  idEditedSection:number = 0;
  idEditedChair:number = 0;
  editedObjectForPost:any;
  chosenAlign:string = 'justify';
  sectionCountRowName = 'Row';
  sectionCountSeatName = 'Seat';
  sectionTotalChair: number = 0;
  switcherClasswsBetweenLayoutAndLable = "layout";
  valueSkewElements:string = '0';
  fixedValueRotate:string = '0';


  // DATA CURVE SECTION

  isMouseForCurveDown:boolean = false;
  arrBetween: any[] = [];
  firstElements: any[] = [];
  secondElements: any[] = [];
  curveNameSection:any;
  countSeats:number;


  // DATA EDIT ROW

  dataRowEdit:any = {};


  ngOnInit():void {
    document.getElementById('container').style.height = window.innerHeight + 'px';
  }

  relozateDataRotate(id,value):void{
    this.fixedValueRotate = value;
    var slider:any = document.getElementById('section' + id);
    slider.style.transform = 'rotate(' + value + 'deg)';
    var elements: any = slider.getElementsByTagName('DIV');
    var arrWithElements: any[] = [];
    for (let i = 0; i < elements.length; i++) {
      arrWithElements.push(elements[i])
    }
    arrWithElements.map(a => {
      if (a.className != 'block-for-data-row' && a.className != 'rows') {
        a.style.transform = 'rotate(' + (-value) + 'deg)'
      }
    })
    arrWithElements.map(a => {
      if (a.className != 'block-for-data-row'
        && a.className != 'rows'
        && a.className != 'name-section'
        && a.className != 'cheir-span'
        && a.className != 'row-span') {
        a.style.transform = 'skewY(' + -this.valueSkewElements + 'deg)'
      }
    })
    this.dataSection.map(data=>{
      if( data.id === this.idSelectedSectionForDiferentOperation ){
        data.rotate = value;
      }
    })
  }

  relizateAllDataOverSectionSkew(value:string,id:number):void{
    var slider = document.getElementById('section'+id);
    var elements: any = slider.getElementsByTagName('DIV');
    var arrWithElements: any[] = [];
    for (let i = 0; i < elements.length; i++) {
      arrWithElements.push(elements[i])
    }
    arrWithElements.map(a => {
      if (a.className != "rows" && a.className != 'name-section' && a.className != 'content-for-chair') {
        if (a.className === 'block-for-data-row') {
          a.style.transform = 'skewY(' + value + 'deg)';
          this.valueSkewElements = value;
        } else if (a.className != 'cheir-span' && a.className != 'row-span') a.style.transform = 'skewY(' + -value + 'deg)'
      }
    })
  }

  FullInArrWithElements(id, data, value):void{
      this.countSeats = data;
      var index:number = 0;
      var slider = document.getElementById('section' + id);
      var elements: any = slider.getElementsByTagName('DIV')
      var arrWithElements: any = [];
      for (let i = 0; i < elements.length; i++) {
        arrWithElements.push(elements[i])
      }
      arrWithElements.map(a => {
        if (a.className === "cheir") {
          index++;
          this.arrBetween.push(a);
        }
      })
      this.curveNameSection = arrWithElements.filter(data=>{
         if( data.className === 'name-section' ) {
          return data
         }
      })
      var seatOnTwo:any = Math.round(this.countSeats / 2);
      for (let i = 0; i < this.arrBetween.length; i++) {
        if (i === seatOnTwo) {
          i += Math.floor(this.countSeats / 2);
          seatOnTwo += this.countSeats;
        }
        this.firstElements.push(this.arrBetween[i]);
      }
      this.arrBetween = this.arrBetween.reverse();
      seatOnTwo = Math.round(this.countSeats / 2);
      for (let i = 0; i < this.arrBetween.length; i++) {
        if (i === seatOnTwo) {
          i += Math.floor(this.countSeats / 2);
          seatOnTwo += this.countSeats;
        }
        this.secondElements.push(this.arrBetween[i]);
      }
      this.firstElements.splice(this.firstElements.indexOf(undefined));
      this.secondElements.splice(this.secondElements.indexOf(undefined)).reverse();
      this.relizateAllDataOverSectionCurve(value);
  }

  relizateAllDataOverSectionCurve(value):void{
      var valueNumb:number = Number(value);
      var index:number = Math.floor(this.countSeats / 2);
      var checkValue:number = Math.round(this.countSeats / 2) - 1;
      var checkLastElement:number = Math.floor(this.countSeats / 2);
      for (let i = 0; i < this.firstElements.length; i++) {
        if (value < 0) {
          this.firstElements[i].style.marginBottom = (index + valueNumb + "px");
          index += valueNumb;
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2)
            checkValue += Math.round(this.countSeats / 2)
            var marginOtherElements1: any = (Number(this.firstElements[i - 1].style.marginBottom.match(/\d+/g).join('')) -
              Math.floor(valueNumb / 3)) + 'px';
            this.firstElements[i].style.marginBottom = '-' + marginOtherElements1;
          };
        } else {
          var sum: any = (index + valueNumb + "px");
          this.firstElements[i].style.marginTop = '-' + sum;
          index += valueNumb;
          sum = '';
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2)
            checkValue += Math.round(this.countSeats / 2)
            var marginOtherElements2: any = (Number(this.firstElements[i - 1].style.marginTop.match(/\d+/g).join('')) +
              Math.floor(valueNumb / 3)) + 'px';
            this.firstElements[i].style.marginTop = '-' + marginOtherElements2;
          };
        }

      }
      index = Math.floor(this.countSeats / 2);
      checkValue = Math.round(this.countSeats / 2) - 1;
      var checkLastElement = Math.floor(this.countSeats / 2);
      for (let i = 0; i < this.secondElements.length; i++) {
        if (value <= 0) {
          this.secondElements[i].style.marginBottom = (index + valueNumb + "px");
          index = index + valueNumb;
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2);
            checkValue += Math.round(this.countSeats / 2);
            var marginOtherElements1: any = (Number(this.secondElements[i - 1].style.marginBottom.match(/\d+/g).join('')) -
              Math.floor(valueNumb / 3)) + 'px';
            this.secondElements[i].style.marginBottom = '-' + marginOtherElements1;
          };
        } else {
          var sum:any = (index + valueNumb + "px");
          this.secondElements[i].style.marginTop = '-' + sum;
          index = index + valueNumb;
          sum = '';
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2);
            checkValue += Math.round(this.countSeats / 2);
            var marginOtherElements2: any = (Number(this.secondElements[i - 1].style.marginTop.match(/\d+/g).join('')) +
              Math.floor(valueNumb / 3)) + 'px';
            this.secondElements[i].style.marginTop = '-' + marginOtherElements2;
          };
        }
      }
  }

  realizateAllData():void{
    this.dataSection.map(data=>{
        this.arrBetween = [];
        this.firstElements= [];
        this.secondElements = [];
        this.relizateAllDataOverSectionSkew(data.skew,data.id);
        this.FullInArrWithElements(data.id,data.arrayWidthPlaces[0].arrWithChair.length,data.curve);
        this.relozateDataRotate( data.id, data.rotate );
        this.sectionNumber = data.numberSection;
        this.sectionNumber+=1
      })
  }

  ngOnChanges(changes):void{
    if (changes.dataSection && changes.dataSection.currentValue && this.dataSection.length != 0) {
      this.arrayWidthSection = [];
      this.pushAllSectionInArrayWidthSection(this.dataSection);
      setTimeout( this.realizateAllData.bind(this) )
    }
  }

  selectContainerMap(value):void {
    if (!this.nowSelectedSetion) {
      this.arrayWidthSection.map(a => {
        document.getElementById(a).style.border = 'none';
      });
      this.displayPanelsSettings = 'panel-setting-section';
    }
  }

  saveAllChangesInSection():void{
    var arrAll:number[] = [];
    arrAll.push(this.dataSection.map(data=>{
      return data
    }))
    this.saveAllChange.emit(arrAll);
  }

  pushAllSectionInArrayWidthSection(data):void {
    data.map(a=>{
      this.arrayWidthSection.push('section' + a.id)
    })
  }

  switchDispalyPanelSettings(argument):void {
    this.displayPanelsSettings = argument;
  }

  createDataForSection(id):void {
    var idForChair:number = 1;
    var alphabet:string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var object = {
      numberSection: this.sectionNumber,
      price: this.priceAllSeatInSectoin,
      background: 'white',
      arrayWidthPlaces: [],
      curve: "-1",
      skew: "0",
      rotate: "0",
      marginTop: '0px',
      marginLeft: "0px"
    }
    var sectRow:number = Number(this.sectionRows) + 1;
    var sectSeat:number = Number(this.sectionSeats) + 1;
    var index:number = 1;
    while (index < sectRow) {
      object.arrayWidthPlaces.push(
        {
          nameRow: alphabet[index - 1].toUpperCase(),
          priceGiven: false,
          backgroundGiven: false,
          background: 'white',
          price: 100,
          id: index,
          arrWithChair: []
        }
      )
      index++;
    }
    object.arrayWidthPlaces.map(a => {
      for (let i = 1; i < sectSeat; i++) {
        a.arrWithChair.push(
          {
            seat: i,
            selected: false,
            priceGiven: false,
            backgroundGiven: false,
            price: this.priceAllSeatInSectoin,
            currency: this.currency,
            background: "white",
            deleted: false,
            id: idForChair
          }
        )
        idForChair++;
      }
    })
    this.postData.emit(object)
    this.sectionNumber++;
    this.switchDispalyPanelSettings('base-panel-with-tool');
    this.idForSelectElementsAfterCreateThem++;
  }

  duplicateSection():void {
    let arr = Object.assign( {}, this.dataSection.filter(a => a.id === this.idSelectedSectionForDiferentOperation)[0]);
    arr.numberSection = arr.numberSection+=1;
    var arrAll:number[] = [];
    arrAll.push(this.dataSection.map(data=>{
      return data
    }))
    this.saveAllChange.emit(arrAll);
    this.postData.emit(arr);
  }




  // FUNCTIONAL ROTATE SECTION

  sliderMouseMove(value):void {
    this.fixedValueRotate = value;
    var id:number|string = this.idSelectedSectionForDiferentOperation;
    var slider:any = document.getElementById('section' + id);
    slider.style.transform = 'rotate(' + value + 'deg)';
    var elements:any = slider.getElementsByTagName('DIV');
    var arrWithElements:any = [];
    for (let i = 0; i < elements.length; i++) {
      arrWithElements.push(elements[i])
    }
    arrWithElements.map(a => {
      if (a.className != 'block-for-data-row' && a.className != 'rows') {
        a.style.transform = 'rotate(' + (-value) + 'deg)'
      }
    })
    arrWithElements.map(a => {
      if (a.className != 'block-for-data-row'
        && a.className != 'rows'
        && a.className != 'name-section'
        && a.className != 'cheir-span'
        && a.className != 'row-span') {
        a.style.transform = 'skewY(' + -this.valueSkewElements + 'deg)'
      }
    })
    this.dataSection.map(data=>{
      if( data.id === this.idSelectedSectionForDiferentOperation ){
        data.rotate = value;
      }
    }) 
  }


  // FUNCTIONAL SKEW SECTION


  skewSection(value):void {
    var id:number|string = this.idSelectedSectionForDiferentOperation;
    var slider:any = document.getElementById('section' + id);
    var elements: any = slider.getElementsByTagName('DIV');
    var arrWithElements: any = [];
    for (let i = 0; i < elements.length; i++) {
      arrWithElements.push(elements[i])
    }
    arrWithElements.map(a => {
      if (a.className != "rows-edit" && a.className != 'name-section-edit' && a.className != 'content-for-chair') {
        if (a.className === 'block-for-data-row') {
          a.style.transform = 'skewY(' + value + 'deg)'
          this.valueSkewElements = value;
        } else if (a.className != 'cheir-span' && a.className != 'row-span') a.style.transform = 'skewY(' + -value + 'deg)'
      }
    })
    this.dataSection.map(data=>{
      if( data.id === this.idSelectedSectionForDiferentOperation ){
        data.skew = value;
      }
    })
  }
  
  
  // FUNCTIONAL MOVE SECTION


  isMouseDown:boolean = false;
  contX:number = 0;
  contY:number = 0;
  idElem:string;

  functionForDownSection(e, id):void {
    this.selectedSection(id)
    this.idElem = "section" + id;
    this.contX = (e.clientX - document.getElementById(this.idElem).offsetLeft + document.getElementById('map').offsetLeft);
    this.contY = (e.clientY - document.getElementById(this.idElem).offsetTop + document.getElementById('map').offsetTop - 0);
    this.isMouseDown = true;
  }

  selectedSection(id):void {
    this.nowSelectedSetion = true;
    this.idSelectedSectionForDiferentOperation = id;
    this.arrayWidthSection.map(a => {
      if (a === ("section" + id) && this.changeClassAfterClickEdit != true) {
        document.getElementById(a).style.border = '3px dashed #0093D7';
      } else document.getElementById(a).style.border = 'none';
    })
    if (this.displayPanelsSettings != 'editing-cair-settings' &&
        this.displayPanelsSettings != 'panel-edit-section' &&
        this.displayPanelsSettings != "panel-settings-row") {
      this.displayPanelsSettings = 'panel-setting-object-section';
    }
    this.howManySeatAndRowTogether()
    this.arrBetween = [];
    this.firstElements= [];
    this.secondElements = [];
    this.dataSection.map(data=>{
      if( data.id === this.idSelectedSectionForDiferentOperation ){
        this.valueSkew = data.skew;
        this.valueCurve = data.curve;
        this.valueRotate = data.rotate;
      }
    })
  }

  clickCancelAfterSelected():void{
    let id:string = this.idSelectedSectionForDiferentOperation;
    this.arrayWidthSection.map(a => {
      if (this.changeClassAfterClickEdit != true) {
        document.getElementById(a).style.border = 'none';
      }  
    })
    this.displayPanelsSettings = 'base-panel-with-tool'
  }

  howManySeatAndRowTogether():void {
    var arr = this.dataSection.filter(data => data.id === this.idSelectedSectionForDiferentOperation)[0];
    this.editDataSection = this.dataSection.filter(data => data.id === this.idSelectedSectionForDiferentOperation)[0];
    var arrPlaces = arr.arrayWidthPlaces;
    this.sectionTotalChair = 0;
    for (let i = 0; i < arrPlaces.length; i++) {
      this.sectionTotalChair += arrPlaces[i].arrWithChair.length
    }
  }

  changeCountSetAndRow(value):void {
    var idForChair:number = 1;
    var alphabet:string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var id = this.dataSection.indexOf( 
      this.dataSection.filter(a=>{
        if( a.id === Number(this.idSelectedSectionForDiferentOperation)){
          return a
        }
      })[0]
    )
    var object = {
      numberSection: this.sectionNumber,
      price: this.priceAllSeatInSectoin,
      id: this.idSelectedSectionForDiferentOperation,
      background: 'white',
      arrayWidthPlaces: [],
      curve: this.dataSection[id].curve,
      skew: this.dataSection[id].skew,
      rotate: this.dataSection[id].rotate,
      marginTop: this.dataSection[id].marginTop,
      marginLeft: this.dataSection[id].marginLeft
    }
    if( Number(this.sectionSeats) < 1 ) {
      this.sectionSeats = 1
    } else if( Number(this.sectionSeats) > 100 ){
      this.sectionSeats = 100
    }
    if( Number(this.sectionRows) < 1 ) {
      this.sectionRows = 1
    }
    var sectRow = Number(this.sectionRows) + 1;
    var sectSeat = Number(this.sectionSeats) + 1;
    var index = 1;
    while (index < sectRow) {
      object.arrayWidthPlaces.push(
        {
          nameRow: alphabet[index - 1].toUpperCase(),
          priceGiven: false,
          backgroundGiven: false,
          background: 'white',
          price: 100,
          id: index,
          arrWithChair: []
        }
      )
      index++;
    }
    object.arrayWidthPlaces.map(a => {
      for (let i = 1; i < sectSeat; i++) {
        a.arrWithChair.push(
          {
            seat: i,
            selected: false,
            priceGiven: false,
            backgroundGiven: false,
            price: this.priceAllSeatInSectoin,
            currency: this.currency,
            background: "white",
            deleted: false,
            id: idForChair
          }
        )
        idForChair++;
      }
    })
    this.dataSection[id] = object;
    this.howManySeatAndRowTogether();
    this.realizateAllData()
    this.arrBetween = [];
    this.firstElements = [];
    this.secondElements = [];
  }

  functionForUpSection(id):void {
    this.isMouseDown = false;
  }

  functionForMoveSection(e):void {
    if (this.isMouseDown) {
      var x:number = e.clientX;
      var y:number = e.clientY;
      var id = this.dataSection.indexOf( 
        this.dataSection.filter(a=>{
          if( a.id === Number(this.idSelectedSectionForDiferentOperation)){
            return a
          }
        })[0]
      )
      this.dataSection[id].marginTop = (y - this.contY + 'px');
      this.dataSection[id].marginLeft = (x - this.contX + 'px');
      document.getElementById(this.idElem).style.marginTop = y - this.contY + 'px';
      document.getElementById(this.idElem).style.marginLeft = x - this.contX + 'px';
    }
  }


  // FUNCTIONS FOR EDIT SECTION


  changeViewMapAndSection():void {
    var map:any = document.getElementById('map');
    var section:any = document.getElementById('section' + this.idSelectedSectionForDiferentOperation);
    section.style.border = 'none';
    map.style.background = 'rgba(0,0,0,0.65)';
    section.style.pointerEvents = 'none';
    this.changeClassAfterClickEdit = true;
    this.displayPanelsSettings = 'panel-edit-section';
    this.needTitle = false;
  }

  changeViewBack():void {
    var map:any = document.getElementById('map');
    var section:any = document.getElementById('section' + this.idSelectedSectionForDiferentOperation);
    section.style.border = '';
    map.style.background = 'rgba(0,0,0,0.04)';
    section.style.pointerEvents = 'all';
    this.changeClassAfterClickEdit = false;
    this.displayPanelsSettings = 'base-panel-with-tool';
    this.needTitle = true;
  }

  selectChair(idSection, idCair, event):void {
    if( this.dataRowEdit.nameRow != undefined ) {
      this.dataRowEdit.arrWithChair.map(a=>{
        a.selected = false
      })
      this.dataRowEdit = {}
    }
    this.idEditedSection = idSection;
    this.idEditedChair = idCair;
    this.displayPanelsSettings = 'editing-cair-settings';
    var arr = this.dataSection.filter(data => data.id === idSection)[0];
    arr.arrayWidthPlaces.map(a => {
      a.arrWithChair.map(data => {
        if (data.id === idCair) {
          data.selected = true;
          this.nameChairRow = a.nameRow;
          this.dataSelectedChair = data;
        } else data.selected = false
      })
    })
    this.editedObjectForPost = arr;
  }

  editDataChair():void {
    var arr = this.dataSection.filter(data => data.id === this.idEditedSection)[0];
    arr.arrayWidthPlaces.map(a => {
      a.arrWithChair.map(data => {
        if (data.id === this.idEditedChair) {
          a.nameRow = this.nameChairRow;
          a.arrWithChair[a.arrWithChair.indexOf(data)].id = this.idEditedChair;
        }
      })
    })
  }

  editPriceChair():void{
    this.dataSelectedChair.priceGiven = true;
  }

  editBackgroundChair():void{
    this.dataSelectedChair.backgroundGiven = true;
  }

  editBackgroundChairInSection():void{
    this.editDataSection.arrayWidthPlaces.map(dataRow=>{
      if( dataRow.backgroundGiven === false ) {
        dataRow.background = this.editDataSection.background;
        dataRow.arrWithChair.map(data =>{
          if( data.backgroundGiven === false ) {
            data.background = this.editDataSection.background;
          }
        })
      }
    })
  }

  editPriceChairInSection():void{
    this.editDataSection.arrayWidthPlaces.map(dataRow=>{
      if( dataRow.priceGiven === false ) {
        dataRow.price = this.editDataSection.price;
        dataRow.arrWithChair.map(data =>{
          if( data.priceGiven === false ) {
            data.price = this.editDataSection.price;
          }
        })
      }
    })
  }

  postEditedObject():void {
    this.dataSection.map(a => {
      if (a.id === this.editedObjectForPost.id) {
        a.arrayWidthPlaces.map(data => {
          data.arrWithChair.map(chair => {
            chair.selected = false;
          })
        })
      }
    });
    this.displayPanelsSettings = 'panel-edit-section';
  }

  deleteChair():void {
    var arr = this.dataSection.filter(data => data.id === this.idEditedSection)[0];
    arr.arrayWidthPlaces.map(a => {
      a.arrWithChair.map(data => {
        if (data.id === this.idEditedChair) {
          a.arrWithChair.splice(
            a.arrWithChair.indexOf(data),
            1
          )
        }
      })
    })
  }

  setBackgroundChair(color):void{
    this.dataSelectedChair.background = color;
    this.editBackgroundChair()
  }


  // FUNCTION DELETE SECTOIN


  deleteSelectedSection():void {
    if (this.idSelectedSectionForDiferentOperation != '') {
      var idElements = this.arrayWidthSection.indexOf('section' + this.idSelectedSectionForDiferentOperation);
      this.arrayWidthSection.splice(idElements, 1)
      this.deleteSection.emit( this.idSelectedSectionForDiferentOperation );
    }
    this.displayPanelsSettings = 'base-panel-with-tool';
  }

  resizeInput(e):void {
    var inputs = document.getElementsByTagName('INPUT');
    var arr:any[] = [];
    for (let i = 0; i < inputs.length; i++) {
      arr.push(inputs[i])
    }
    arr.map(a => {
      if (a.className === e.target.className) {
        if (e.target.value.length != 0) a.style.width = (e.target.value.length * 20) + 'px';
        else a.style.width = 20 + 'px';
      }
    })
  }

  changeAlignment(arg):void {
    this.chosenAlign = arg;
  }


  // FUNCTIONS FOR SELECTED AND EDIT DATA ROW


  selectedRow(RowsId , SectionId):void{
    var arr = this.dataSection.filter(data => data.id === SectionId)[0];
    arr.arrayWidthPlaces.map(a => {
      if( a.id === RowsId ) {
        this.dataRowEdit = a
        a.arrWithChair.map( data => {
          data.selected = true
        })
      } else {
         a.arrWithChair.map( data => {
          data.selected = false
        })
      }
    })
    this.displayPanelsSettings = "panel-settings-row";
  }

  editDataPriceInRow():void{
    this.dataRowEdit.priceGiven = true;
    this.dataRowEdit.arrWithChair.map(data=>{
      if( data.priceGiven === false ){
        data.price = this.dataRowEdit.price
      }
    })
  }

  editBackgroundChairInRow(color):void{
    this.dataRowEdit.backgroundGiven = true;
    this.dataRowEdit.arrWithChair.map(data=>{
      if( data.backgroundGiven === false ){
        data.background = this.dataRowEdit.background
      }
    })
  }

  deleteRow():void{
    this.dataRowEdit.arrWithChair.map(data => {
      data.deleted = true
    })
  }


  postEditedRow():void{
    this.dataRowEdit.arrWithChair.map(data => {
      data.selected = false
    })
    this.displayPanelsSettings = 'panel-edit-section';
  }


  // FUNCTIONAL FOR CURVE SECTION


  downMouceForCurve():void {
    this.isMouseForCurveDown = true;
    if (this.arrBetween.length === 0) {
      var id = this.dataSection.indexOf( 
        this.dataSection.filter(a=>{
          if( a.id === Number(this.idSelectedSectionForDiferentOperation)){
            return a
          }
        })[0]
      )
      this.countSeats = this.dataSection[id].arrayWidthPlaces[0].arrWithChair.length;
      var index = 0;
      var slider = document.getElementById('section' + this.idSelectedSectionForDiferentOperation);
      var elements: any = slider.getElementsByTagName('DIV')
      var arrWithElements: any = [];
      for (let i = 0; i < elements.length; i++) {
        arrWithElements.push(elements[i])
      }
      arrWithElements.map(a => {
        if (a.className === "cheirEdit") {
          index++;
          this.arrBetween.push(a);
        }
      })
      this.curveNameSection = arrWithElements.filter(data=>{
         if( data.className === 'name-section-edit' ) {
          return data
         }
      })
      var seatOnTwo = Math.round(this.countSeats / 2);
      for (let i = 0; i < this.arrBetween.length; i++) {
        if (i === seatOnTwo) {
          i += Math.floor(this.countSeats / 2);
          seatOnTwo += this.countSeats;
        }
        this.firstElements.push(this.arrBetween[i]);
      }
      this.arrBetween = this.arrBetween.reverse();
      seatOnTwo = Math.round(this.countSeats / 2);
      for (let i = 0; i < this.arrBetween.length; i++) {
        if (i === seatOnTwo) {
          i += Math.floor(this.countSeats / 2);
          seatOnTwo += this.countSeats;
        }
        this.secondElements.push(this.arrBetween[i]);
      }
      this.firstElements.splice(this.firstElements.indexOf(undefined));
      this.secondElements.splice(this.secondElements.indexOf(undefined)).reverse();
    }
  }

  upMouseForCurve():void {
    this.isMouseForCurveDown = false;
  }

  curveSection(value):void {
    if (this.isMouseForCurveDown) {
      var valueNumb:number = Number(value);
      var index:number = Math.floor(this.countSeats / 2);
      var checkValue:number = Math.round(this.countSeats / 2) - 1;
      var checkLastElement:number = Math.floor(this.countSeats / 2);
      for (let i = 0; i < this.firstElements.length; i++) {
        if (value < 0) {
          this.firstElements[i].style.marginBottom = (index + valueNumb + "px");
          index += valueNumb;
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2)
            checkValue += Math.round(this.countSeats / 2)
            var marginOtherElements1: any = (Number(this.firstElements[i - 1].style.marginBottom.match(/\d+/g).join('')) -
              Math.floor(valueNumb / 3)) + 'px';
            this.firstElements[i].style.marginBottom = '-' + marginOtherElements1;
          };
        } else {
          var sum: any = (index + valueNumb + "px");
          this.firstElements[i].style.marginTop = '-' + sum;
          index += valueNumb;
          sum = '';
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2)
            checkValue += Math.round(this.countSeats / 2)
            var marginOtherElements2: any = (Number(this.firstElements[i - 1].style.marginTop.match(/\d+/g).join('')) +
              Math.floor(valueNumb / 3)) + 'px';
            this.firstElements[i].style.marginTop = '-' + marginOtherElements2;
          };
        }

      }
      index = Math.floor(this.countSeats / 2);
      checkValue = Math.round(this.countSeats / 2) - 1;
      var checkLastElement:number = Math.floor(this.countSeats / 2);
      for (let i = 0; i < this.secondElements.length; i++) {
        if (value <= 0) {
          this.secondElements[i].style.marginBottom = (index + valueNumb + "px");
          index = index + valueNumb;
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2);
            checkValue += Math.round(this.countSeats / 2);
            var marginOtherElements1: any = (Number(this.secondElements[i - 1].style.marginBottom.match(/\d+/g).join('')) -
              Math.floor(valueNumb / 3)) + 'px';
            this.secondElements[i].style.marginBottom = '-' + marginOtherElements1;
          };
        } else {
          var sum: any = (index + valueNumb + "px");
          this.secondElements[i].style.marginTop = '-' + sum;
          index = index + valueNumb;
          sum = '';
          if (i === checkValue) {
            index = Math.round(this.countSeats / 2);
            checkValue += Math.round(this.countSeats / 2);
            var marginOtherElements2: any = (Number(this.secondElements[i - 1].style.marginTop.match(/\d+/g).join('')) +
              Math.floor(valueNumb / 3)) + 'px';
            this.secondElements[i].style.marginTop = '-' + marginOtherElements2;
          };
        }

      }
    }
    this.dataSection.map(data=>{
      if( data.id === this.idSelectedSectionForDiferentOperation ) {
        data.curve = value
      }
    })
  }
}