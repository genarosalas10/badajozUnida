import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nombreUsuario:any=";"
  constructor(public router: Router) {
    console.log(sessionStorage.getItem('nombre'));
    this.nombreUsuario=sessionStorage.getItem('nombre');
  }

  ngOnInit(): void {
  }

  comprobarTipo(){
    if(sessionStorage.getItem('tipo')=='u'){
      return false;
    }else {
      return true;
    }
  }
  cerrarSesion()
  {
    sessionStorage.clear();
    window.location.reload();

  }
}
