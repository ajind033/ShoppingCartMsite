import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuantityService } from '../quantity.service';
import { pluses, fruit, vegetables, dairy, biscuits } from '../mock-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private quanSer: QuantityService, private router: Router) {
    if (!!localStorage.getItem("category"))
      this.category = localStorage.getItem("category")
  }

  ngOnInit() {
    switch (this.category) {
      case "All":
        this.dataItems = [fruit, vegetables, dairy, pluses, biscuits];
        break;
      case "Fruits":
        this.dataItems = [fruit];
        break;
      case "Vegetables":
        this.dataItems = [vegetables];
        break;
      case "Dairy":
        this.dataItems = [dairy];
        break;
      case "Pulses":
        this.dataItems = [pluses];
        break;

      case "Biscuits":
        this.dataItems = [biscuits];
        break;
    }
    console.log(this.dataItems)
    this.finditem();
  }
  ItemsNo: number = 0;
  category: string = "All";
  item: string = '';
  dataItems: any;
  quantity = this.quanSer.getQauntity();
  finditem() {
    console.log(this.item)
    var searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = "";
    var trHead = document.createElement("tr");
    var tableHead = ["Name", "Category", "MRP", "Quantity"];
    tableHead.forEach((head) => {
      var th = document.createElement("th");
      var node = document.createTextNode(head);
      th.appendChild(node);
      trHead.appendChild(th);
    });
    searchResult.appendChild(trHead);

    this.item = this.item.toLowerCase();
    var reg = new RegExp(this.item, "g");
    var index;
    switch (this.category) {
      case "All":
        index = 0;
        break;
      case "Fruits":
        index = 0;
        break;
      case "Vegetables":
        index = fruit.length;
        break;
      case "Dairy":
        index = fruit.length + vegetables.length;
        break;
      case "Pulses":
        index = fruit.length + vegetables.length + dairy.length;
        break;

      case "Biscuits":
        index = fruit.length + vegetables.length + dairy.length + pluses.length;
        break;
    }
    this.dataItems.forEach((dataItem) => {
      dataItem.forEach((data) => {
        if (reg.test(data.name.toLowerCase())) {
          var trData = document.createElement("tr");

          Object.keys(data).forEach((key) => {
            var td = document.createElement("td");
            var node = document.createTextNode(data[key]);
            td.appendChild(node);
            trData.appendChild(td);
          });
          var input = document.createElement("input");
          input.type = "number";
          input.min = '0';
          input.value = this.quantity[index];
          input.id = index.toString();
          input.setAttribute("style", "background-color: inherit; width: inhert;height:inherit")
          trData.appendChild(input);
          searchResult.appendChild(trData);
        }
        index++;
      });
    });
    document.getElementById("bodyButtons").style.visibility = "visible";
  }
  saveQuantity() {
    var reg = new RegExp(this.item, "g");
    var index;
    switch (this.category) {
      case "All":
        index = 0;
        break;
      case "Fruits":
        index = 0;
        break;
      case "Vegetables":
        index = fruit.length;
        break;
      case "Dairy":
        index = fruit.length + vegetables.length;
        break;
      case "Pulses":
        index = fruit.length + vegetables.length + dairy.length;
        break;

      case "Biscuits":
        index = fruit.length + vegetables.length + dairy.length + pluses.length;
        break;
    }
    this.dataItems.forEach((dataItem) => {
      dataItem.forEach((data) => {
        if (reg.test(data.name.toLowerCase())) {
          this.quantity[index] = document.getElementById(index.toString()).value;
        }
        index++;
      });
    });
    this.quanSer.setQauntity(this.quantity);

  }
  addToCart() {
    this.saveQuantity();

    var cartTable = document.getElementById("cartTable");
    cartTable.innerHTML = "";

    var trHead = document.createElement("tr");
    var tableHead = ["Name", "Quantity"];
    tableHead.forEach((head) => {
      var th = document.createElement("th");
      var node = document.createTextNode(head);
      th.appendChild(node);
      trHead.appendChild(th);
    });
    cartTable.appendChild(trHead);

    var index = 0;
    this.ItemsNo = 0;
    var quantity = this.quanSer.getQauntity();

    var dataItems = [fruit, vegetables, dairy, pluses, biscuits];
    dataItems.forEach((dataItem) => {
      dataItem.forEach((data) => {
        if (this.quantity[index] > 0) {
          this.ItemsNo++;
          var trData = document.createElement("tr");

          var td1 = document.createElement("td");
          var node1 = document.createTextNode(data.name);
          td1.appendChild(node1);
          trData.appendChild(td1);


          var td2 = document.createElement("td");
          var node2 = document.createTextNode(quantity[index]);
          td2.appendChild(node2)
          trData.appendChild(td2);
          cartTable.appendChild(trData);
        }
        index++;
      });
    });
    if (this.ItemsNo > 0) {
      localStorage.setItem("key","qdwdwqdq5w7d==");
      document.getElementById("cartBody").style.visibility = "visible";
    }
    else{
      alert("Add some Items to cart");
    }
  }
  checkMeOut() {
    this.router.navigate(["/check"]);
  }
}
