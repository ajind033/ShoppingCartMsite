import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }
  showCatFlag: boolean = false;
  categories: any = ["All","Fruits", "Vegetables", "Dairy", "Pulses", "Biscuits"];
  showCategory() {
    this.showCatFlag = !this.showCatFlag;
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
  setCategory(category) {
    localStorage.setItem("category", category);
    this.closeNav();
    this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
    this.router.navigate(["/"]));
  }
}
