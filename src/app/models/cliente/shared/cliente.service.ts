import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Rx';

import { Cliente } from './cliente';

@Injectable()
export class ClienteService {

  private url: string = "http://localhost:8080/xavier-0.0.1-SNAPSHOT/rest/cliente";

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get(this.url)
      .map(res => JSON.parse(JSON.stringify(res)),
           err => console.log(err));
  }

  getCliente(id) {
    return this.http.get(this.url + '/' + id)
        .map(res => JSON.parse(JSON.stringify(res)),
             err => console.log(err));
  }

  getClienteByNome(nome) {
    return this.http.get(this.url + '/busca/nome/' + nome)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getClienteByCodigo(codigo) {
    return this.http.get(this.url + '/busca/codigo/' + codigo)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getClienteByRG(rg) {
    return this.http.get(this.url + '/busca/rg/' + rg)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getClienteByCPF(cpf) {
    return this.http.get(this.url + '/busca/cpf/' + cpf)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }


  addCliente(cliente) {
    this.upCaseCliente(cliente);
    return this.http.post(this.url, JSON.stringify(cliente),
  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  }).map(res => JSON.parse(JSON.stringify(res)));
  }

  updateCliente(cliente) {
    this.upCaseCliente(cliente);
    return this.http.put(this.url, JSON.stringify(cliente), 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).map(res => JSON.parse(JSON.stringify(res)));
  }

  deleteCliente(id) {
    return this.http.delete(this.url + '/' + id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'})
    .map(res => console.log("deletado com sucesso"),
         err => err);
  }

  private upCaseCliente(cliente: Cliente) {
    cliente.nome = cliente.nome.toUpperCase();
    if(cliente.conjugue != undefined)
      cliente.conjugue = cliente.conjugue.toUpperCase();
    if(cliente.estadoCivil != undefined)
      cliente.estadoCivil = cliente.estadoCivil.toUpperCase();
    if(cliente.email != undefined)
      cliente.email = cliente.email.toUpperCase();
    if(cliente.operadora != undefined)
      cliente.operadora = cliente.operadora.toUpperCase();
    if(cliente.operadoraII != undefined)
      cliente.operadoraII = cliente.operadoraII.toUpperCase();
    if(cliente.municipio != undefined)
      cliente.municipio = cliente.municipio.toUpperCase();    
    
    cliente.sigla = cliente.sigla.toUpperCase();    
    cliente.bairro = cliente.bairro.toUpperCase();
    cliente.endereco = cliente.endereco.toUpperCase();
    
    if(cliente.referencia != undefined)
    cliente.referencia = cliente.referencia.toUpperCase();    
  }
}
