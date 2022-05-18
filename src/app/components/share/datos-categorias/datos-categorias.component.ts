import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-categorias',
  templateUrl: './datos-categorias.component.html',
  styleUrls: ['./datos-categorias.component.css']
})
export class DatosCategoriasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public mostrarForm(buttonValue:String){
    let container=document.createElement('div');
    container.classList.add('popup-form-container');
      container.innerHTML=`<form class="popup-form">
        <label>Nombre:</label><br/>
        <input type="text"/><br/>
        <label>Descripción:</label><br/>
        <textarea></textarea><br/>
        <button>${buttonValue}</button>
        <span (click)='this.borrarForm()'>Cerrar</span>
      </form>`;
    document.getElementById('showForm')?.appendChild(container);
  }

  public borrarForm(){
    document.querySelector('.popup-form-container')?.remove();
  }

}