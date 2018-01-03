import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class CepService {

  private url: string = 'https://viacep.com.br/ws/'; 

  constructor(private http: HttpClient) { }

  getCep(cep) {
    return this.http.get(this.url + cep + '/json/')
      .map(res => JSON.parse(JSON.stringify(res)));
  }
}
