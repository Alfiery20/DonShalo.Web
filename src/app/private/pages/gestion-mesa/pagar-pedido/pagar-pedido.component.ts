import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerCategoriaResponse } from '../../../../core/models/Categoria/VerCategoria/VerCategoriaResponse';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { AgregarEditarCategoriaComponent } from '../../categoria/agregar-editar-categoria/agregar-editar-categoria.component';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../../core/services/pedido.service';
import { VerDetallePedidoPagarResponse } from '../../../../core/models/Pedido/VerDetallePedidoPagar/VerDetallePedidoPagarResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VerDetallePedidoParaPagarDetalle } from '../../../../core/models/Pedido/VerDetallePedidoPagar/VerDetallePedidoParaPagarDetalleResponse';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteService } from '../../../../core/services/cliente.service';
import { ObtenerClienteDocResponse } from '../../../../core/models/Cliente/ObtenerClienteDoc/ObtenerClienteDocResponse';
import Swal from 'sweetalert2';
import { PagarPedidoDivididoRequest } from '../../../../core/models/Pedido/PagarPedidoDividido/PagarPedidoDivididoRequest';
import { PagarPedidoDivididoDetalle } from '../../../../core/models/Pedido/PagarPedidoDividido/PagarPedidoDivididoDetalle';
import { PagarPedidoDivididoRequestSubcuenta } from '../../../../core/models/Pedido/PagarPedidoDividido/PagarPedidoDivididoRequestSubcuenta';
import { PagarPedidoDivididoPreview } from '../../../../core/models/Pedido/PagarPedidoDividido/PagarPedidoDividioPreview';
import { PagarPedidoRequest } from '../../../../core/models/Pedido/PagarPedido/PagarPedidoRequest';
import { MedioPagoService } from '../../../../core/services/medio-pago.service';
import { ObtenerMedioPagoMenuResponse } from '../../../../core/models/MedioPago/ObtenerMedioPagoMenu/ObtenerMedioPagoMenuResponse';

@Component({
  selector: 'app-pagar-pedido',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    FormsModule,
  ],
  templateUrl: './pagar-pedido.component.html',
  styleUrl: './pagar-pedido.component.scss'
})
export class PagarPedidoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  // formulario: FormGroup;

  detallePedido: VerDetallePedidoPagarResponse = {} as VerDetallePedidoPagarResponse;

  total: number = 0

  totalDivida: number = 0

  dataSource = new MatTableDataSource<VerDetallePedidoParaPagarDetalle>(this.detallePedido.detalles);

  detallesSeparados: VerDetallePedidoParaPagarDetalle[] = [];

  dataSourceDivididas = new MatTableDataSource<VerDetallePedidoParaPagarDetalle>(this.detallesSeparados);

  cuentaDividas: boolean = false

  displayedColumns: string[] =
    [
      // 'Nro',
      // 'Compartido',
      'Plato',
      'Precio',
      'Cantidad',
      'Subtotal'
    ];

  displayedColumnsCuentaDividida: string[] =
    [
      'Compartido',
      'Plato',
      'Precio',
      'Cantidad',
      'Subtotal'
    ];

  numeroDocumento: string = '';

  clienteAsignado: ObtenerClienteDocResponse = {
    id: 0,
    nombre: ''
  } as ObtenerClienteDocResponse;

  pedidosNuevos: PagarPedidoDivididoRequestSubcuenta[] = [];

  pedidosMuestras: PagarPedidoDivididoPreview[] = [];

  mediosPago: ObtenerMedioPagoMenuResponse[] = [];


  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private pediServ: PedidoService,
    private clieServ: ClienteService,
    private medioPagoServ: MedioPagoService
  ) {
    // this.formulario = this.fb.group({
    //   nombre: ['', Validators.required]
    // });
  }

  ngOnInit(): void {
    this.obtenerDetallePedido();
    this.obtenerMedioPagoMenu();
  }

  obtenerMedioPagoMenu() {
    this.medioPagoServ.ObtenerMedioPagoMenu().subscribe(
      (response) => {
        this.mediosPago = response;
      }
    )
  }

  obtenerDetallePedido() {
    this.pediServ.VerDetallePedidoPagar(this.data.id).subscribe(
      (request) => {
        this.detallePedido = request;
        this.dataSource.data = this.detallePedido.detalles;

        this.detallesSeparados = this.detallePedido.detalles.map(detalle => ({ ...detalle }));
        this.detallesSeparados.forEach(element => {
          element.cantidad = 0;
          element.subtotal = 0;
        });
        this.dataSourceDivididas.data = this.detallesSeparados;
        this.getTotalPrecio()
      }
    )
  }

  getTotalPrecio() {
    var total = 0;
    this.detallePedido.detalles.forEach(detalle => {
      total += detalle.subtotal
    });
    this.total = total;
  }

  getTotalPrecioDivididas() {
    var total = 0;
    this.detallesSeparados.forEach(detalle => {
      total += detalle.subtotal
    });
    this.totalDivida = total;
  }

  ModificarColumnas() {
    this.cuentaDividas = !this.cuentaDividas
    if (this.cuentaDividas) {
      this.displayedColumns.unshift('Compartido');
    } else {
      this.displayedColumns.shift();
    }
  }

  ValidarCantidadPlatos() {
    var isVacia = 0;
    this.detallePedido.detalles.forEach(detalle => {
      isVacia += detalle.cantidad;
    });
    return isVacia;
  }

  DividirCuentas(detalle: VerDetallePedidoParaPagarDetalle) {
    if (this.ValidarCantidadPlatos() == 1) {
      Swal.fire({
        title: "Advertencia!",
        icon: "info"
      });
      return;
    }

    var detalleDividido = this.detallesSeparados.filter((item) => item.id === detalle.id)[0];

    detalleDividido.cantidad += 1;
    detalle.cantidad -= 1;

    detalleDividido.subtotal = detalleDividido.precio * detalleDividido.cantidad;
    detalle.subtotal = detalle.precio * detalle.cantidad;

    this.dataSource.data = this.detallePedido.detalles;
    this.dataSourceDivididas.data = this.detallesSeparados;
    this.getTotalPrecioDivididas()
    this.getTotalPrecio();
  }

  RegresarCuentas(detalledividio: VerDetallePedidoParaPagarDetalle) {
    var detalle = this.detallePedido.detalles.filter((item) => item.id === detalledividio.id)[0];

    detalle.cantidad += 1;
    detalledividio.cantidad -= 1;

    detalle.subtotal = detalle.precio * detalle.cantidad;
    detalledividio.subtotal = detalledividio.precio * detalledividio.cantidad;

    this.dataSource.data = this.detallePedido.detalles;
    this.dataSourceDivididas.data = this.detallesSeparados;
    this.getTotalPrecioDivididas()
    this.getTotalPrecio();
  }

  BuscarCliente() {
    if (this.numeroDocumento.length >= 8) {
      this.clieServ.ObtenerClientePorDoc(this.numeroDocumento).subscribe(
        (response) => {
          this.clienteAsignado = response;
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

  SepararPerdido() {
    const medioPagoSelect = document.getElementById('medioPagoSubCuenta') as HTMLSelectElement;
    const medioPagoValue = medioPagoSelect ? medioPagoSelect.value : null;

    var pedidoDividio: PagarPedidoDivididoRequestSubcuenta = {
      idCliente: this.clienteAsignado.id,
      idMedioPago: parseInt(medioPagoValue!),
      detallePedidoSubcuenta: this.detallesSeparados
    }
    this.pedidosNuevos.push(pedidoDividio);

    var preview: PagarPedidoDivididoPreview = {
      idCliente: this.clienteAsignado.id,
      cliente: this.clienteAsignado.nombre,
      numeroDocumento: this.numeroDocumento,
      total: this.totalDivida
    }

    this.pedidosMuestras.push(preview)

    this.detallesSeparados = this.detallePedido.detalles.map(detalle => ({ ...detalle }));
    this.detallesSeparados.forEach(element => {
      element.cantidad = 0;
      element.subtotal = 0;
    });
    this.numeroDocumento = '';
    this.clienteAsignado = {} as ObtenerClienteDocResponse;
    this.getTotalPrecioDivididas();
    this.getTotalPrecio();
    this.dataSourceDivididas.data = this.detallesSeparados;
    this.dataSource.data = this.detallePedido.detalles;

  }

  AccionGuardar() {
    if (this.cuentaDividas) {
      this.GuardarDividido();
    } else {
      this.GuardarCuenta();
    }
  }

  GuardarCuenta() {
    this.pediServ.PagarPedido(this.data.id).subscribe(
      (response) => {
        if (response.codigo === 'OK') {
          Swal.fire({
            title: "Exito!",
            text: "Pedido pagado correctamente!",
            icon: "success"
          });
          this.CerrarModal();
        } else {
          Swal.fire({
            title: "Error!",
            text: response.mensaje,
            icon: "error"
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Error!",
          text: "No se pudo pagar el pedido, intente nuevamente.",
          icon: "error"
        });
      }
    );
  }

  GuardarDividido() {
    const medioPagoSelect = document.getElementById('medioPago') as HTMLSelectElement;
    const medioPagoValue = medioPagoSelect ? medioPagoSelect.value : null;
    var request: PagarPedidoDivididoRequest = {
      idPedido: this.data.id,
      idMedioPago: parseInt(medioPagoValue!),
      detallePedido: this.detallePedido.detalles.filter((item) => item.cantidad > 0),
      subcuentas: this.pedidosNuevos.filter((item) => item.detallePedidoSubcuenta.length > 0)
    }

    this.pediServ.RegistrarPedidoDividido(request).subscribe(
      (response) => {
        if (response.codigo === 'OK') {
          Swal.fire({
            title: "Exito!",
            text: "Pedido pagado correctamente!",
            icon: "success"
          });
          this.CerrarModal();
        } else {
          Swal.fire({
            title: "Error!",
            text: response.mensaje,
            icon: "error"
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Error!",
          text: "No se pudo pagar el pedido, intente nuevamente.",
          icon: "error"
        });
      }
    );
  }

  HabilitarBotonDividir() {
    const todosCeros = this.detallesSeparados.every(detalle => detalle.cantidad === 0);
    const clienteNoAsignado = this.clienteAsignado.id === 0;

    return (todosCeros || clienteNoAsignado);
  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }
}
