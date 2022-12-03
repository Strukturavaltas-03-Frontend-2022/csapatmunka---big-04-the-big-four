import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop';
  currPage2:string="Dashboard"

  upDateCurrPage(currPage1:string)
  {
    this.currPage2=currPage1;
  }

}
