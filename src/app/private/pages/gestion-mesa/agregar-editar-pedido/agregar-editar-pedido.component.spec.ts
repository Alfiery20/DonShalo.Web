import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPedidoComponent } from './agregar-editar-pedido.component';

describe('AgregarEditarPedidoComponent', () => {
  let component: AgregarEditarPedidoComponent;
  let fixture: ComponentFixture<AgregarEditarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEditarPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
