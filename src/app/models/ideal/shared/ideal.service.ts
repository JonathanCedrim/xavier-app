import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

import { Ideal } from './ideal';

@Injectable()
export class IdealService {

  private url: string = "http://localhost:8080/xavier-0.0.1-SNAPSHOT/rest/ideal";

  constructor(private http: HttpClient) { }

  getIdeals() {
    return this.http.get(this.url)
      .map(res => JSON.parse(JSON.stringify(res)),
           err => console.log(err));
  }

  getIdeal(id) {
    return this.http.get(this.url + '/' + id)
        .map(res => JSON.parse(JSON.stringify(res)),
             err => console.log(err));
  }

  getIdealByCodigo(codigoIdeal) {
    return this.http.get(this.url + '/busca/codigo/' + codigoIdeal)
            .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getIdealsByVendedor(codigoVendedor) {
    return this.http.get(this.url + '/busca/codigo/vendedor/' + codigoVendedor)
      .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getIdealByData(ideal) {
    return this.http.post(this.url + '/busca/data', JSON.stringify(ideal))
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  addIdeal(ideal: Ideal) {
    this.upCaseIdeal(ideal);
    return this.http.post(this.url, JSON.stringify(ideal),
  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).map(res => JSON.parse(JSON.stringify(res)));
  }

  updateIdeal(ideal) {
    this.upCaseIdeal(ideal);
    return this.http.put(this.url, JSON.stringify(ideal), 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map(res => JSON.parse(JSON.stringify(res)));
  }

  deleteIdeal(id) {
    return this.http.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'})
    .map(res => console.log("deletado com sucesso"),
         err => err);
  }

  private upCaseIdeal(ideal: Ideal) {
    ideal.vendedor.nome.toUpperCase();
    ideal.responsavel.toUpperCase();
  }
}
