import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSubcategoriasComponent } from './datos-subcategorias.component';

describe('DatosSubcategoriasComponent', () => {
  let component: DatosSubcategoriasComponent;
  let fixture: ComponentFixture<DatosSubcategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosSubcategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSubcategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
