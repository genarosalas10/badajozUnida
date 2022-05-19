import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Crea un modal personalizado.
   * 
   * @param title - Título del modal
   * @param body - Mensaje del modal
   * @param btnText - Texto del botón del modal
   * @param type - Tipo del modal (normal, success, error)
   */
  generateModal(title:string, body:string, btnText:string, type:string){
    const modal=document.createElement('div');
    modal.classList.add('modal-container');

    if(type=='success'){
      modal.innerHTML=`
      <div class="modal-inner">
          <div class="modal-title success">
              <h2>${title}</h2>
              <button>
                  <i class="bi bi-x"></i>
              </button>
          </div>
          <div class="modal-body">
              <p>
                ${body}
              </p>
              <button>
                ${btnText}
              </button>
          </div>
      </div>
      `;
    }

    if(type=='error'){
      modal.innerHTML=`
      <div class="modal-inner">
          <div class="modal-title error">
              <h2>${title}</h2>
              <button>
                  <i class="bi bi-x"></i>
              </button>
          </div>
          <div class="modal-body">
              <p>
                ${body}
              </p>
              <button>
                ${btnText}
              </button>
          </div>
      </div>
      `;
    }

    if(type=='normal'){
      modal.innerHTML=`
        <div class="modal-inner">
            <div class="modal-title">
                <h2>${title}</h2>
                <button>
                    <i class="bi bi-x"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>
                  ${body}
                </p>
                <button>
                  ${btnText}
                </button>
            </div>
        </div>
      `;
    }

    document.querySelector('.show-modal')!.appendChild(modal);
    document.querySelector('.modal-title button')!.addEventListener('click', this.deleteModal);
    document.querySelector('.modal-body button')!.addEventListener('click', this.deleteModal);
  }

  /**
   * Elimina el modal.
   */
  deleteModal(){
    document.querySelector('.modal-container')?.remove();
  }

}
