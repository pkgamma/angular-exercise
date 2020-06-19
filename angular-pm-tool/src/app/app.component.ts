import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template:  `
  <div class = 'm-5'>
  <h1>{{pageTitle}}</h1>
  <pm-products></pm-products>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = "Project Management Tool Beta";
}