import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucursal',
  imports: [],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('SucursalComponent initialized');
  }
}
