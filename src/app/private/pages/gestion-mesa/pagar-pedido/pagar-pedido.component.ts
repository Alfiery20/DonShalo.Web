import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-pagar-pedido',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './pagar-pedido.component.html',
  styleUrl: './pagar-pedido.component.scss'
})
export class PagarPedidoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  formulario: FormGroup;

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
      'Plato',
      'Precio',
      'Cantidad',
      'Subtotal'
    ];

  constructor(
    private fb: FormBuilder,
    private modalAgregarCategoria: MatDialogRef<AgregarEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private pediServ: PedidoService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.pediServ.VerDetallePedidoPagar(this.data.id).subscribe(
      (request) => {
        this.detallePedido = request;
        this.dataSource.data = this.detallePedido.detalles;
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

  DividirCuentas(detalle: VerDetallePedidoParaPagarDetalle) {
    const index = this.detallesSeparados.indexOf(detalle);
    if (index !== -1) {
      this.detallesSeparados.splice(index, 1);
    } else {
      this.detallesSeparados.push(detalle);
    }
    this.dataSourceDivididas.data = this.detallesSeparados;
    this.getTotalPrecioDivididas()
  }

  AccionGuardar() {

  }

  CerrarModal() {
    this.modalAgregarCategoria.close();
    this.onClose.emit();
  }
}
