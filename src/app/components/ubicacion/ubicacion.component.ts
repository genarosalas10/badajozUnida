import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {

  ubicaciones:any;
  constructor(private formBuilder:FormBuilder, private appService:AppService, private router:Router) { }

  ngOnInit(): void {
    this.listadoUbicacion();
  }

  buscar(nombreUbicacion:any){
    //nombreUbicacion=nombreUbicacion.trim();

    nombreUbicacion=nombreUbicacion.toLowerCase().replace(/\s/g,"")
    console.log(nombreUbicacion)
  if(nombreUbicacion==''){
    this.listadoUbicacion();
  }else{
    this.listadoUbicacionPorNombre(nombreUbicacion);
  }
  }

  listadoUbicacion(){
    let datos = {
      tipo: "listarUbicaciones"
    }

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data)
          if (data['status'] != 'error') {
            this.ubicaciones=data;
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

  listadoUbicacionPorNombre(nombreUbicacion:any){

    let datos = {
      tipo: "listarUbicacionesPorNombre",
      nombre: nombreUbicacion
    }

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data)
          if (data['status'] != 'error') {
            this.ubicaciones=data;
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

  llamarFormulario(idUbicacion:number){
    console.log('Llamada');
    this.router.navigate(['/formularioUbicacion',idUbicacion]);
  }

  preguntaBorrado(id: any){
    //Realizar la pregunta

      if(confirm('¿Desea borrar la ubicacion?')==true){
        this.borrarUbicacion(id);
      }
  }
  borrarUbicacion(idUbicacion:any){
    console.log('Borro');
    let datos = {
      tipo: "eliminarUbicacion",
      idCategoria: `${idUbicacion}`
    }
    console.log(datos)
    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            console.log(data) ;
            window.location.reload();
          } else {
            console.log(data)

          }
        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);

        });

  }
}
