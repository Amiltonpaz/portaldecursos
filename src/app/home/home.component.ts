
import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngParallaxConf: IParallaxScrollConfig = {
    parallaxSpeed: 0.4,
    parallaxSmoothness: 0.8,
    parallaxDirection: 'left',
    parallaxTimingFunction: 'ease',
    parallaxThrottleTime: 80
  };

  ngOnInit(): void {

  }

}
