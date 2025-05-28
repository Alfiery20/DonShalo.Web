import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ObtenerPlatoRequest } from '../../../core/models/Plato/ObtenerPlato/ObtenerPlatoRequest';
import { ObtenerPlatoResponse } from '../../../core/models/Plato/ObtenerPlato/ObtenerPlatoResponse';
import { PlatoService } from '../../../core/services/plato.service';
import { AgregarEditarPlatoComponent } from './agregar-editar-plato/agregar-editar-plato.component';
import { CategoriaService } from '../../../core/services/categoria.service';
import { ObtenerMenuCategoriaResponse } from '../../../core/models/Categoria/ObtenerMenuCategoria/ObtenerMenuCategoriaResponse';

@Component({
  selector: 'app-plato',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './plato.component.html',
  styleUrl: './plato.component.scss'
})
export class PlatoComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'Nombre',
      'Monto',
      'Estado',
      'Accion'
    ];

  platos: ObtenerPlatoResponse[] = []

  dataSource = new MatTableDataSource<ObtenerPlatoResponse>(this.platos);

  categoriasMenu: ObtenerMenuCategoriaResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private platServ: PlatoService,
    private catServ: CategoriaService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.ObtenerPlato();
    this.ObtenerMenuCategoria();
  }

  ObtenerMenuCategoria() {
    this.catServ.ObtenerMenuCategoria().subscribe((response) => {
      this.categoriasMenu = response;
    })
  }

  ObtenerPlato() {
    var request: ObtenerPlatoRequest = {
      nombre: this.formulario.get('nombre')?.value || '',
      idCategoria: parseInt(this.formulario.get('idCategoria')?.value) || 0
    }
    this.platServ.ObtenerPlato(request).subscribe((response) => {
      this.platos = response
      this.dataSource.data = this.platos;
    })
  }

  AgregarPlato() {
    var modalAbierto = this.dialog.open(AgregarEditarPlatoComponent, {
      width: '400px',
      data: { id: 0 },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPlato();
    });
  }

  EditarPlato(idPlato: number) {
    var modalAbierto = this.dialog.open(AgregarEditarPlatoComponent, {
      width: '400px',
      data: { id: idPlato },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.ObtenerPlato();
    });
  }

  EliminarPlato(idPlato: number) {
    var plato = this.platos.find(x => x.id == idPlato);
    var texto = ''
    plato?.estado.substring(0, 1) == 'A' ? texto = 'eliminar' : texto = 'activar';

    Swal.fire({
      title: "¡Atención!",
      text: `¿Esta seguro de ${texto} el plato?`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "var(--color-principal)",
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        this.platServ.EliminarPlato(idPlato).subscribe(
          (response) => {
            if (response != null && response.codigo == 'OK') {
              this.ObtenerPlato();
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
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
