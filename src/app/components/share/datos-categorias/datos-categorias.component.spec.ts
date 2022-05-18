import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCategoriasComponent } from './datos-categorias.component';

describe('DatosCategoriasComponent', () => {
  let component: DatosCategoriasComponent;
  let fixture: ComponentFixture<DatosCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
