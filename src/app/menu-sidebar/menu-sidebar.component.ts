import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  openNav() {
    const el = document.getElementById('mySidepanel');
    if (el) {
      el.style.width = '250px';
    }
  }

  // tslint:disable-next-line: typedef
  closeNav() {
    const el = document.getElementById('mySidepanel');
    if (el) {
      el.style.width = '0';
    }
  }

}
