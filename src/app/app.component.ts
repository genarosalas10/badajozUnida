import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "./services/usuario.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'badajozUnida';
  constructor(public router: Router,private usuarioService: UsuarioService) {
    /*
    if(!usuarioService.getIdUsuarioActual() ){
      this.router.navigate(['login']);
    }
    */
  }
}
