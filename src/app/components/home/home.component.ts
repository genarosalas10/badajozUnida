import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.comprobarAutenticacion();
  }

  ngOnInit(): void {
  }

}
