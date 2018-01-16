import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

import { Movimento } from './movimento';

@Injectable()
export class MovimentoService {

  private url: string = "http://localhost:8080/xavier-0.0.1-SNAPSHOT/rest/movimento";

  constructor(private http: HttpClient) { }

  getMovimentos() {
    return this.http.get(this.url)
      .map(res => JSON.parse(JSON.stringify(res)),
           err => console.log(err));
  }

  getMovimento(id: number) {
    return this.http.get(this.url + '/' + id)
        .map(res => JSON.parse(JSON.stringify(res)),
             err => console.log(err));
  }

  getMovimentoByCodigo(codigo: number) {
    return this.http.get(this.url + '/busca/codigo/' + codigo)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getMovimentoByCodigoVendedor(codigoVendedor: number) {
    return this.http.get(this.url + '/busca/vendedor/' + codigoVendedor)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getMovimentoByNumeroRecibo(numeroRecibo: number) {
    return this.http.get(this.url + '/busca/numeroRecibo/' + numeroRecibo)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getMovimentoByNumeroPedido(numeroPedido: number) {
    return this.http.get(this.url + '/busca/numeroPedido/' + numeroPedido)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getMovimentosByCodigoVendedorAndCodigoCliente(codigoVendedor: number, codigoCliente: number) {
    return this.http.get(this.url + '/busca/vendedor/' + codigoVendedor + '/cliente/' + codigoCliente)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getMovimentosByVendedorAndData(movimento) {
      return this.http.post(this.url + '/busca/vendedor/data', JSON.stringify(movimento),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).map(res => JSON.parse(JSON.stringify(res)),
              err => console.log(err));
  }

  addMovimento(movimento: Movimento) {
    this.upCaseMovimento(movimento);
    return this.http.post(this.url, JSON.stringify(movimento),
  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).map(res => JSON.parse(JSON.stringify(res)));
  }

  updateMovimento(movimento: Movimento) {
    this.upCaseMovimento(movimento);
    return this.http.put(this.url, JSON.stringify(movimento), 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map(res => JSON.parse(JSON.stringify(res)));
  }

  deleteMovimento(id) {
    return this.http.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'})
    .map(res => console.log("deletado com sucesso"),
         err => err);
  }

  private upCaseMovimento(movimento: Movimento) { 
    if(movimento.observacao != undefined)
     movimento.observacao.toUpperCase();
  }
}
