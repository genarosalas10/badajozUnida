import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  forma!: FormGroup;
  modal = new ModalComponent();
  ubicaciones:any;
  subcategorias:any;
  idUbicacion:any;
  idSubcategoria:any;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.listadoUbicacion();
    this.listadoSubcategoria();
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  /**
   * Inizializa los validadores del formulario.
   */
  crearFormulario() {
    this.forma = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      imagen: ['', [Validators.required, Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      fechaHora: ['', [Validators.required, Validators.minLength(10)]],
      idSubcategoria: ['', [Validators.required]],
      idUbicacion: ['', [Validators.required]]
    });
  }

  /**
   * Lista todas las ubicaciones.
   */
  listadoUbicacion() {
    let datos = {
      tipo: 'listarUbicaciones',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {
          this.ubicaciones = data;
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }


  /**
   * Muestra en pantalla las subcategorías
   */
  listadoSubcategoria() {
    let datos = {
      tipo: 'listarSubcategoria',
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.subcategorias = data;
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
        //this.toast=true;
      }
    );
  }

  guardarIdUicacion(idUbicacion: any) {
    console.log(idUbicacion)
    this.idUbicacion=idUbicacion;
  }
  guardarIdSubcategoria(idSubcategoria: any) {
    this.idUbicacion=idSubcategoria;
  }

  guardar(forma: FormGroup){
    let prueba=forma.value;
    prueba.idUbicacion=this.idUbicacion;
    console.log(forma.value)
    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })
      return;
    }

    console.log(forma.value);
    //this.actualizarUsuario(forma);
  }
  validar(campo1: string){
    let campo: any = this.forma.get(campo1);

    return !(campo.invalid && campo.touched);
  }
}
