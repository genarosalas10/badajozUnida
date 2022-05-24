import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosUbicacionesComponent } from './datos-ubicaciones.component';

describe('DatosUbicacionesComponent', () => {
  let component: DatosUbicacionesComponent;
  let fixture: ComponentFixture<DatosUbicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosUbicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
