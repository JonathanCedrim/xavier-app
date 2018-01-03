import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

import { Vendedor } from './vendedor';

@Injectable()
export class VendedorService {

  private url: string = "http://localhost:8080/xavier-0.0.1-SNAPSHOT/rest/vendedor";

  constructor(private http: HttpClient) { }

  getVendedores() {
    return this.http.get(this.url)
      .map(res => JSON.parse(JSON.stringify(res)),
           err => console.log(err));
  }

  getVendedor(id) {
    return this.http.get(this.url + '/' + id)
        .map(res => JSON.parse(JSON.stringify(res)),
             err => console.log(err));
  }

  getVendedorByNome(nome) {
    return this.http.get(this.url + '/busca/nome/' + nome)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getVendedorByCodigo(codigo) {
    return this.http.get(this.url + '/busca/codigo/' + codigo)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getVendedorByRG(rg) {
    return this.http.get(this.url + '/busca/rg/' + rg)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getVendedorByCPF(cpf) {
    return this.http.get(this.url + '/busca/cpf/' + cpf)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }


  addVendedor(vendedor: Vendedor) {
    
    this.upCaseVendedor(vendedor);
    return this.http.post(this.url, JSON.stringify(vendedor),
  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).map(res => JSON.parse(JSON.stringify(res)));
  }

  updateVendedor(vendedor) {
    this.upCaseVendedor(vendedor);
    return this.http.put(this.url, JSON.stringify(vendedor), 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map(res => JSON.parse(JSON.stringify(res)));
  }

  deleteVendedor(id) {
    return this.http.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'})
    .map(res => console.log("deletado com sucesso"),
         err => err);
  }

  upCaseVendedor(vendedor: Vendedor) {
    vendedor.nome = vendedor.nome.toUpperCase();
    
    if(vendedor.email != undefined)
     vendedor.email = vendedor.email.toUpperCase();
    
    if(vendedor.operadora != undefined)
     vendedor.operadora = vendedor.operadora.toUpperCase();

    if(vendedor.operadoraII != undefined)
    vendedor.operadoraII = vendedor.operadoraII.toUpperCase();


    vendedor.municipio = vendedor.municipio.toUpperCase();
    vendedor.sigla = vendedor.sigla.toUpperCase();
    vendedor.bairro = vendedor.bairro.toUpperCase();
    vendedor.endereco = vendedor.endereco.toUpperCase();

    if(vendedor.observacao != undefined)
    vendedor.observacao = vendedor.observacao.toUpperCase();
  }
}
