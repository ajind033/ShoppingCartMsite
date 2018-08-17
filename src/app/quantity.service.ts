import { Injectable } from '@angular/core';
import{pluses,fruit,vegetables,dairy,biscuits} from './mock-product';


@Injectable({
  providedIn: 'root'
})
export class QuantityService {

  constructor() { }
  qauntity = new Array(pluses.length+fruit.length+vegetables.length+dairy.length+biscuits.length).fill(0);
  setQauntity(qauntity){
    this.qauntity=qauntity;
    console.log(this.qauntity)
  }
  getQauntity(){
    return this.qauntity;
  }
}
