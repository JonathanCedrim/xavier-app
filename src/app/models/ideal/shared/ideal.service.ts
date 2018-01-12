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

  getIdealByNome(nome) {
    return this.http.get(this.url + '/busca/nome/' + nome)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getIdealByCodigo(codigoVendedor, codigoIdeal) {
    return this.http.get(this.url + '/busca/codigo/ideal/' + codigoIdeal)
            .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getIdealByRG(rg) {
    return this.http.get(this.url + '/busca/rg/' + rg)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }

  getIdealByCPF(cpf) {
    return this.http.get(this.url + '/busca/cpf/' + cpf)
        .map(res => JSON.parse(JSON.stringify(res)),
            err => console.log(err));
  }


  addIdeal(ideal) {
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
    ideal.nome = ideal.nome.toUpperCase();
    if(ideal.conjugue != undefined)
      ideal.conjugue = ideal.conjugue.toUpperCase();
    if(ideal.estadoCivil != undefined)
      ideal.estadoCivil = ideal.estadoCivil.toUpperCase();
    if(ideal.email != undefined)
      ideal.email = ideal.email.toUpperCase();
    if(ideal.operadora != undefined)
      ideal.operadora = ideal.operadora.toUpperCase();
    if(ideal.operadoraII != undefined)
      ideal.operadoraII = ideal.operadoraII.toUpperCase();
    if(ideal.municipio != undefined)
      ideal.municipio = ideal.municipio.toUpperCase();    
    
    ideal.sigla = ideal.sigla.toUpperCase();    
    ideal.bairro = ideal.bairro.toUpperCase();
    ideal.endereco = ideal.endereco.toUpperCase();
    
    if(ideal.referencia != undefined)
    ideal.referencia = ideal.referencia.toUpperCase();    
  }
}
