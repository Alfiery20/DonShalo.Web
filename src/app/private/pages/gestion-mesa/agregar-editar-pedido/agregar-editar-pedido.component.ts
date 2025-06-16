import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarEditarCategoriaComponent } from '../../categoria/agregar-editar-categoria/agregar-editar-categoria.component';
import { CommonModule } from '@angular/common';
import { ObtenerMenuCategoriaResponse } from '../../../../core/models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';
import { ObtenerMenuPlatoResponse } from '../../../../core/models/Plato/ObtenerMenuPlato/ObtenerMenuPlatoResponse';
import { PlatoService } from '../../../../core/services/plato.service';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ObtenerClienteDocResponse } from '../../../../core/models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import Swal from 'sweetalert2';
import { AgregarClienteComponent } from '../agregar-cliente/agregar-cliente.component';
import { AgregarDetallePedidoRequest } from '../../../../core/models/DetallePedido/AgregarDetallePedido/AgregarDetallePedidoRequest';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AgregarPedidoRequest } from '../../../../core/models/Pedido/AgregarPedido/AgregarPedidoRequest';
import { AgregarPedidoDetalle } from '../../../../core/models/Pedido/AgregarPedido/AgregarPedidoDetalle';
import { PedidoService } from '../../../../core/services/pedido.service';
import { ObtenerPedidoResponse } from '../../../../core/models/Pedido/ObtenerPedido/ObtenerPedidoResponse';
import { ObtenerDetallePedidoResponse } from '../../../../core/models/Pedido/ObtenerDetallePedido/ObtenerDetallePedidoResponse';
import { EditarPedidoDetalle } from '../../../../core/models/Pedido/EditarPedido/EditarPedidoDetalle';
import { EditarPedidoRequest } from '../../../../core/models/Pedido/EditarPedido/EditarPedidoRequest';
import { PagarPedidoComponent } from '../pagar-pedido/pagar-pedido.component';

@Component({
  selector: 'app-agregar-editar-pedido',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './agregar-editar-pedido.component.html',
  styleUrl: './agregar-editar-pedido.component.scss'
})
export class AgregarEditarPedidoComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

  Categoria: VerCategoriaResponse = {} as VerCategoriaResponse;

  categoriasMenu: ObtenerMenuCategoriaResponse[] = [];
  platosMenu: ObtenerMenuPlatoResponse[] = [];


  clienteAsignado: ObtenerClienteDocResponse = {
    id: 0,
    nombre: ''
  } as ObtenerClienteDocResponse;

  esEditar: boolean = false;
  titulo = 'Agregar';

  displayedColumns: string[] =
    [
      'Nro',
      'Plato',
      'Cantidad',
      'Accion'
    ];
  detallesDePedido: AgregarDetallePedidoRequest[] = [];

  dataSource = new MatTableDataSource<AgregarDetallePedidoRequest>(this.detallesDePedido);

  datosPedido: ObtenerPedidoResponse = {} as ObtenerPedidoResponse;


  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number, estado: number },
    private catServ: CategoriaService,
    private platoServ: PlatoService,
    private clieServ: ClienteService,
    private pediServ: PedidoService,
    private dialog: MatDialog,
  ) {
    this.formulario = this.fb.group({
      nroSerie: [{ value: '', disabled: true }, Validators.required],
      nroCorre: [{ value: '', disabled: true }, Validators.required],
      nroDoumento: ['', Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      categoria: [0, Validators.required],
      plato: [0, Validators.required],
      cantidad: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    this.esEditar = this.data.estado != 0;

    this.titulo = 'Agregar';
    this.ObtenerMenuCategoria();
    if (this.esEditar) {
      this.titulo = 'Modificar';
      this.ObtenerPedido(this.data.id);
    }
  }

  ObtenerPedido(id: number) {
    this.pediServ.ObtenerPedido(id).subscribe(
      (response) => {
        this.datosPedido = response
        this.formulario.get('nroSerie')?.setValue(this.datosPedido.serie);
        this.formulario.get('nroCorre')?.setValue(this.datosPedido.correlativo);
        this.formulario.get('nroDoumento')?.setValue(this.datosPedido.numeroDocumento);
        this.formulario.get('nombre')?.setValue(this.datosPedido.nombre);
        this.BuscarCliente()
        this.ObtenerDetallePedido(this.datosPedido.idPedido)
      }
    )
  }

  ObtenerDetallePedido(id: number) {
    var detallesPedidoResponse: ObtenerDetallePedidoResponse[] = [];
    this.pediServ.ObtenerDetallePedido(id).subscribe(
      (response) => {
        detallesPedidoResponse = response;
        response.forEach(detalle => {
          this.detallesDePedido.push(
            {
              idPlato: detalle.idPlato,
              nombrePlato: detalle.plato,
              cantidad: detalle.cantidad
            }
          )
        });
        this.dataSource.data = this.detallesDePedido;
      }
    )
  }

  BuscarCliente() {
    if (this.formulario.value.nroDoumento.length >= 8) {
      this.clieServ.ObtenerClientePorDoc(this.formulario.value.nroDoumento).subscribe(
        (response) => {
          this.clienteAsignado = response;
          this.formulario.get('nombre')?.setValue(this.clienteAsignado.nombre);
          if (this.clienteAsignado.id == 0) {
            Swal.fire({
              title: "Advertencia!",
              text: "Por favor, registrar usuario!",
              icon: "info"
            });
          }
        }
      )
    } else {
      this.clienteAsignado = {} as ObtenerClienteDocResponse;
    }
  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }

  ObtenerMenuCategoria() {
    this.catServ.ObtenerMenuCategoria().subscribe((response) => {
      this.categoriasMenu = response;
    })
  }

  ObtenerMenuPlato(event: any) {
    const id = event.target.value;
    this.platoServ.ObtenerMenuPlato(id).subscribe((response) => {
      this.platosMenu = response;
    })
  }

  RegistrarCliente() {
    var modalAbierto = this.dialog.open(AgregarClienteComponent, {
      width: '400px',
      data: { id: this.clienteAsignado.id },
    });
  }

  AgregarDetallePedido() {
    var platoNombre = this.platosMenu.filter(plato => plato.id == this.formulario.value.plato)[0].nombre;

    var detallePedido: AgregarDetallePedidoRequest = {
      idPlato: this.formulario.value.plato,
      nombrePlato: platoNombre,
      cantidad: this.formulario.value.cantidad,
    };
    this.detallesDePedido.push(detallePedido);
    this.dataSource.data = this.detallesDePedido;
    this.formulario.get('categoria')?.setValue(0);
    this.formulario.get('plato')?.setValue(0);
    this.formulario.get('cantidad')?.setValue(1);

  }

  EliminarDetallePedido(element: AgregarDetallePedidoRequest) {
    this.detallesDePedido.splice(this.detallesDePedido.indexOf(element), 1);
    this.dataSource.data = this.detallesDePedido;
  }

  AgregarPedido() {
    var detallesPedidoRequest: AgregarPedidoDetalle[] = [];
    this.detallesDePedido.forEach(detalle => {
      detallesPedidoRequest.push({
        cantidad: detalle.cantidad,
        idPlato: detalle.idPlato
      })
    });

    var request: AgregarPedidoRequest = {
      idCliente: this.clienteAsignado.id,
      idMesa: this.data.id,
      idPersonal: 0,
      detallePedido: detallesPedidoRequest
    }
    this.pediServ.AgregarPedido(request).subscribe(
      (response) => {
        if (response != null && response.codigo == 'OK') {
          this.CerrarModal();
          Swal.fire({
            title: response.mensaje,
            icon: "success",
            confirmButtonColor: "var(--color-principal)",
          });
        } else {
          Swal.fire({
            title: response.mensaje,
            icon: "error",
            confirmButtonColor: "var(--color-principal)",
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Ocurrio un error, comunicarse con servicio tecnico",
          icon: "error",
          confirmButtonColor: "var(--color-principal)",
        });
      }
    )
  }

  PagarPedido() {
    var modalAbierto = this.dialog.open(PagarPedidoComponent, {
      width: '400px',
      data: { id: this.datosPedido.idPedido },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
    });
  }

  EditarPedido() {
    var detallesPedidoRequest: EditarPedidoDetalle[] = [];
    this.detallesDePedido.forEach(detalle => {
      detallesPedidoRequest.push({
        cantidad: detalle.cantidad,
        idPlato: detalle.idPlato
      })
    });

    var request: EditarPedidoRequest = {
      idPedido: this.datosPedido.idPedido,
      idCliente: this.clienteAsignado.id,
      detallePedido: detallesPedidoRequest
    }
    this.pediServ.EditarPedido(request).subscribe(
      (response) => {
        if (response != null && response.codigo == 'OK') {
          this.CerrarModal();
          Swal.fire({
            title: response.mensaje,
            icon: "success",
            confirmButtonColor: "var(--color-principal)",
          });
        } else {
          Swal.fire({
            title: response.mensaje,
            icon: "error",
            confirmButtonColor: "var(--color-principal)",
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Ocurrio un error, comunicarse con servicio tecnico",
          icon: "error",
          confirmButtonColor: "var(--color-principal)",
        });
      }
    )
  }

  EliminarPedido() {
    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de eliminar el pedido?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.pediServ.EliminarPedido(this.datosPedido.idPedido).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              Swal.fire({
                title: response.mensaje,
                icon: "success",
                confirmButtonColor: "var(--color-principal)",
              });
            } else {
              Swal.fire({
                title: response.mensaje,
                icon: "error",
                confirmButtonColor: "var(--color-principal)",
              });
            }
            this.CerrarModal();
          },
          (error) => {
            Swal.fire({
              title: "Ocurrio un error, comunicarse con servicio tecnico",
              icon: "error",
              confirmButtonColor: "var(--color-principal)",
            });
            this.CerrarModal();
          }
        )
      }
    });
  }

  AccionGuardar() {
    if (this.esEditar) {
      this.EditarPedido();
    } else {
      this.AgregarPedido();
    }
  }
}
