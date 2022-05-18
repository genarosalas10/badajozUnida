import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'badajozUnida';
  constructor(public router: Router) {
    if(!sessionStorage.getItem('id')){
      this.router.navigate(['login']);
    }
    
  }
}
