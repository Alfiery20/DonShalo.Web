import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionRequest } from '../../../core/models/iniciarSesion/iniciarSesionRequest';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localService: LocalStorageService,
    private autentitacionService: AutenticacionService,
    private loaderServi: LoaderService
  ) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }


  ValidarInicioSesion() {
    if (this.ValidarFormulario()) {
      this.formulario.markAllAsTouched();
    } else {
      this.IniciarSesion();
    }
  }

  ValidarFormulario() {
    var correo = this.formulario.value.correo;
    var clave = this.formulario.value.clave;
    var formularioValidado =
      correo == '' || correo == null || clave == '' || clave == null;
    return formularioValidado;
  }

  IniciarSesion() {
    var userLogin: IniciarSesionRequest = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave,
    };
    this.loaderServi.MostrarLoader();
    this.autentitacionService.IniciarSesion(userLogin).subscribe(
      (response) => {
        if (response != null && response.token != null) {
          this.localService.setItem('token', response.token);
          this.localService.setItem('usuario', JSON.stringify(response));
          this.loaderServi.OcultarLoader();
          Swal.fire({
            title: "Bienvenido!",
            icon: "success"
          });
          this.router.navigate(['/intranet']);
        } else {
          this.loaderServi.OcultarLoader();
          Swal.fire({
            title: "Datos incorrectos",
            icon: "error",
          });
        }
      },
      (error) => {
        this.loaderServi.OcultarLoader();
        Swal.fire({
          title: "Datos incorrectos",
          icon: "error",
        });
      }
    );

  }

}
