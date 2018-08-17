import { Component, OnInit } from '@angular/core';

import { QuantityService } from '../quantity.service';
import { pluses, fruit, vegetables, dairy, biscuits } from '../mock-product';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private quanSer:QuantityService) { }

  ngOnInit() {
    var dataItems=[fruit, vegetables, dairy, pluses, biscuits];
  var quantity = this.quanSer.getQauntity();

    var checkTable = document.getElementById("checkTable");
    checkTable.innerHTML = "";

    var trHead = document.createElement("tr");
    var tableHead = ["Name", "Category", "MRP", "Quantity", "Price"];
    tableHead.forEach((head) => {
        var th = document.createElement("th");
        var node = document.createTextNode(head);
        th.appendChild(node);
        trHead.appendChild(th);
    });
    checkTable.appendChild(trHead);

    var total = 0;
    var index = 0;
    dataItems.forEach((dataItem) => {
        dataItem.forEach((data) => {
            if (quantity[index] > 0) {
                var trData = document.createElement("tr");

                Object.keys(data).forEach((key) => {
                    var td1 = document.createElement("td");
                    var node1 = document.createTextNode(data[key]);
                    td1.appendChild(node1);
                    trData.appendChild(td1);
                });
                var td2 = document.createElement("td");
                var node2 = document.createTextNode(quantity[index]);
                td2.appendChild(node2);
                trData.appendChild(td2);

                var td3 = document.createElement("td");
                var node3 = document.createTextNode((quantity[index] * data.mrp).toString());
                td3.appendChild(node3);
                trData.appendChild(td3);
                checkTable.appendChild(trData);

                total += quantity[index] * data.mrp;
            }
            index++;
        });
    });
    var trTotal = document.createElement("tr");

    var th4 = document.createElement("th");
    var node4 = document.createTextNode("Total");
    th4.appendChild(node4);
    th4.setAttribute("colSpan", '4');
    trTotal.appendChild(th4);

    var th5 = document.createElement("th");
    var node5 = document.createTextNode(total.toString());
    th5.appendChild(node5)
    trTotal.appendChild(th5);
    checkTable.appendChild(trTotal);
  }

}
