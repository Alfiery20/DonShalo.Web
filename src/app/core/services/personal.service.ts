import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { }
}
