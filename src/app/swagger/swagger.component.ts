import {AfterViewInit, Component, ElementRef} from '@angular/core';

import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styles: []
})
export class SwaggerComponent implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const ui = SwaggerUI({
      url: 'https://localhost:5001/swagger/v1/swagger.json',
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: true,
      presets: [
        SwaggerUI.presets.apis
      ],
    });
  }
}