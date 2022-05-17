import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private appService:AppService, private router:Router) {
    this.listadoCategoria();
  }

  ngOnInit(): void {
  }

  listadoCategoria()
  {
    let datos = {
      tipo: "listadoCategoria"
  }
    console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            console.log(data)
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
}
