import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionRequest } from '../../../core/models/iniciarSesion/iniciarSesionRequest';
import { LocalStorageService } from '../../../core/services/local-storage.service';

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
    private localService: LocalStorageService
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

  IniciarSesion(){
    var userLogin: IniciarSesionRequest = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave,
    };
    console.log(userLogin);
    
  }

}
