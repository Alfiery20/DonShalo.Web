import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerSucursalRequest } from '../../../core/models/obtenerSucursal/ObtenerSucursalResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;

  displayedColumns: string[] =
    [
      'Nro',
      'Id',
      'CodSuc',
      'Nombre',
      'Direcc',
      'Telef',
      'HoraEntr',
      'HoraSal',
      'Estado',
      'Respo',
      'Accion'
    ];
  Sucursales: ObtenerSucursalRequest[] = []
  dataSource = new MatTableDataSource<ObtenerSucursalRequest>(this.Sucursales);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
}
