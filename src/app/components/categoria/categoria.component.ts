import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';
import { DatosCategoriasComponent } from '../share/datos-categorias/datos-categorias.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias:any;
  categoriasPopup=new DatosCategoriasComponent
  constructor(private appService:AppService, private router:Router) {
    this.listadoCategoria();
  }
  

  ngOnInit(): void {
  }

  llamarPoppup(){
    this.categoriasPopup.mostrarForm('Añadir');
  }

  listadoCategoria()
  {
    let datos = {
      tipo: "listadoCategoria"
  }

    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            this.categorias=data;
          } else {
            console.log(data)
          }
        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });

  }

  listarSub(idCategoria:any)
  {
    //idCategoria=document.getElementById('iCategorias').value;
    let datos = {
      tipo: "listadoSubcategoriaId",
      id: idCategoria
  }

    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            this.categorias=data;
          } else {
            console.log(data)
          }
        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });

  }

  editarSub(){
    console.log('Editar');
  }

  borrarSub(){
    console.log('Borrar');
  }
}
