import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ObtenerRolResponse } from '../../../core/models/Rol/ObtenerRol/ObtenerRolResponse';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RolService } from '../../../core/services/rol.service';
import { AgregarEditarRolComponent } from './agregar-editar-rol/agregar-editar-rol.component';
import Swal from 'sweetalert2';
import { AgregarMenuRolComponent } from './agregar-menu-rol/agregar-menu-rol.component';
import { DatatableComponent, NgxDatatableModule } from '@siemens/ngx-datatable';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    NgxDatatableModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  formulario: FormGroup;
  busquedaControl: FormControl = new FormControl('');

  roles: ObtenerRolResponse[] = [];
  RolFiltrados: ObtenerRolResponse[] = [];

  estadoSeleccionado: string = '';

  private _columnsQueryListPoints:any = {
    state: 992,
    id: 992,
  }

  _mdQueryList: MediaQueryList | null = null;
  private _mdQueryListener: (event: MediaQueryListEvent) => void = () => {};

  public bState:boolean = true;
  public bID:boolean = true;

  @ViewChild('table') table!: DatatableComponent;

  public _bFiltroActivo:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private rolServi: RolService,
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerRoles();

    Object.keys(this._columnsQueryListPoints).forEach( (key) => {
      const bp = this._columnsQueryListPoints[key];
      const min_bp:string = `(min-width: ${bp}px)`,
            max_bp:string = `(max-width: ${bp}px)`;

      for(let bkp of [min_bp, max_bp])
      {
        const show = bkp.includes('min');
        this._mdQueryList = window.matchMedia(bkp);
        this._mdQueryListener = (event:MediaQueryListEvent) => {
          if(event.matches)
          {
            switch(key)
            {
              case 'id':
                this.bID = show;
                break;
              case 'state':
                this.bState = show;
                break;
            }
          }
        }
        this._mdQueryList.addEventListener('change', this._mdQueryListener);
        switch(key)
        {
          case 'id':
            this.bID = !this._mdQueryList.matches;
            break;
          case 'state':
            this.bState = !this._mdQueryList.matches;
            break;
        }
      }
    } );

    // this.busquedaControl.valueChanges.subscribe(valor => {
    //   const filtro = (valor || '').toLowerCase();
    //   this.RolFiltrados = this.roles.filter(rol =>
    //     rol.nombre.toLowerCase().includes(filtro) ||
    //     rol.estado.toLowerCase().includes(filtro)
    //   );
    //   this.dataSource.data = this.RolFiltrados;
    // });
  }

  ngOnDestroy(): void {
    Object.keys(this._columnsQueryListPoints).forEach( (bp) => {
      this._mdQueryList!.removeEventListener('change',this._mdQueryListener);
    } );
  }

  toggleExpandRow(row: ObtenerRolResponse)
  {
    this.table!.rowDetail?.toggleExpandRow(row);
  }

  get showExpandableButton():boolean
  {
    try
    {
      const ret = window.matchMedia('(max-width: 992px)').matches;
      if(!ret && this.roles.length > 0)
      {
        this.table!.rowDetail?.collapseAllRows();
      }
      return ret;
    }
    catch(e)
    {
      return false;
    }
  }

  obtenerRoles(): void {
    const termino = this.formulario.get('nombre')?.value;
    this.rolServi.ObtenerRol(termino).subscribe((rol) => {
      console.log(rol[0])
      this.roles = rol;
      this.RolFiltrados = this.roles;
    });
  }

  AgregarRol(): void {
    const modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      panelClass: 'bootstrap-dialog',
      data: { id:null, edit:false },
    });

    modalAbierto.afterClosed().subscribe(() => {
      this.obtenerRoles();
    })
  }

  EditarRol(idRol: number): void {
    const modalAbierto = this.dialog.open(AgregarEditarRolComponent, {
      maxWidth: '750px',
      panelClass: 'bootstrap-dialog',
      data: { id: idRol, edit: true },
    });
    modalAbierto.afterClosed()
    .subscribe(() => {
      this.obtenerRoles();
    });
  }

  EliminarRol(idRol: number): void {
    const rol = this.roles.find(x => x.id === idRol);
    const texto = rol?.estado.startsWith('A') ? 'desactivar' : 'activar';

    Swal.fire({
      title: '¡Atención!',
      text: `¿Está seguro de ${texto} el rol?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'var(--color-principal)',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolServi.EliminarRol(idRol).subscribe(
          (response) => {
            if (response && response.codigo === 'OK') {
              this.obtenerRoles();
              Swal.fire({
                title: response.mensaje,
                icon: 'success',
                confirmButtonColor: 'var(--color-principal)',
              });
            } else {
              Swal.fire({
                title: response?.mensaje || 'Error inesperado',
                icon: 'error',
                confirmButtonColor: 'var(--color-principal)',
              });
            }
          },
          () => {
            Swal.fire({
              title: 'Ocurrió un error, comuníquese con soporte técnico',
              icon: 'error',
              confirmButtonColor: 'var(--color-principal)',
            });
          }
        );
      }
    });
  }

  AgregarPermisoRol(idRol: number): void {
    const modalAbierto = this.dialog.open(AgregarMenuRolComponent, {
      maxWidth: '750px',
      data: { id: idRol },
    });
    modalAbierto.componentInstance.onClose.subscribe(() => {
      this.obtenerRoles();
    });
  }

  filtrarPorEstado(): void {
    this._bFiltroActivo = true;
    const estado = this.estadoSeleccionado.toLowerCase();
    this.RolFiltrados = this.roles.filter(rol =>
      rol.estado.toLowerCase() === estado
    );
  }

  limpiarFiltroEstado(): void {
    this.estadoSeleccionado = '';
    this.RolFiltrados = [...this.roles];
  }

  limpiarFiltros() {
    this._bFiltroActivo = false;
    this.estadoSeleccionado = '';
    this.busquedaControl.setValue('');
    this.RolFiltrados = [...this.roles];
  }

}
