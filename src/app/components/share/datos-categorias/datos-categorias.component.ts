import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-datos-categorias',
  templateUrl: './datos-categorias.component.html',
  styleUrls: ['./datos-categorias.component.css'],
})
export class DatosCategoriasComponent implements OnInit {
  forma!: FormGroup;
  modal = new ModalComponent();
  categoria: any;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((parametros) => {
      if (parametros['id'] > 0) {
        this.sacarCategoria(parametros['id']);
      }
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      idCategoria: ['0', [Validators.minLength(1)]],
    });
  }

  //comprobar formulario
  guardar(forma: FormGroup) {

    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });
      return;
    }
    if (forma.value.idCategoria == 0) {
      this.anadirCategoria(forma);
    } else {
      this.modificarCategoria(forma);
    }
  }

  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  //llamar a la api para crear categoria
  anadirCategoria(forma: any) {
    let datos = forma.value;
    datos.tipo = 'crearCategoria';

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.router.navigate(['/categoria']);
        } else {
          this.modal.generateModal(
            `Algo salió mal`,
            `${data['result']['error_msg']}`,
            'De acuerdo',
            'error'
          );
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  //llamar a la api para  modificar categoria
  modificarCategoria(forma: any) {
    let datos = forma.value;
    datos.tipo = 'modificarCategoria';

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.router.navigate(['/categoria']);
        } else {
          this.modal.generateModal(
            `Algo salió mal`,
            `${data['result']['error_msg']}`,
            'De acuerdo',
            'error'
          );
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  volver() {
    this.router.navigate(['categoria']);
  }

  sacarCategoria(idCategoria: any) {
    let datos = {
      tipo: 'sacarCategoriaId',
      idCategoria: idCategoria,
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {

        if (data['status'] != 'error') {
          this.categoria = data[0];
          this.cargarDatosFormulario();

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
  cargarDatosFormulario() {
    this.forma.reset({
      nombre: this.categoria.nombre,
      descripcion: this.categoria.descripcion,
      idCategoria: this.categoria.idCategoria,
    });
  }
}
