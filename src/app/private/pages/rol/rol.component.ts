import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerRolResponse } from '../../../core/models/ObtenerRol/ObtenerRolResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonalService } from '../../../core/services/personal.service';
import { RolService } from '../../../core/services/rol.service';

@Component({
  selector: 'app-rol',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'TipoDoc',
      'NumDoc',
      'Nombre',
      'Telef',
      'Correo',
      'Estado',
      'Rol',
      'Sucursal',
      'Accion',
    ];
  Personales: ObtenerRolResponse[] = []
  dataSource = new MatTableDataSource<ObtenerRolResponse>(this.Personales);

  rolSeleccionado: ObtenerRolResponse = {} as ObtenerRolResponse;
  Roles: ObtenerRolResponse[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private persServi: PersonalService,
    private rolServi: RolService,
  ) {
    this.formulario = this.fb.group({
      codPersonal: ['', Validators.required],
      nroDoru: ['', Validators.required],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

}
