import { Component, OnInit } from '@angular/core';

import { Movimento } from './shared/movimento';
import { MovimentoService } from './shared/movimento.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './movimento.component.html',
  styleUrls: ['./movimento.component.css']
})
export class MovimentoComponent implements OnInit {

  movimentos: Movimento[] = [];
  busca;
  constructor(private movimentoService: MovimentoService) { }

  ngOnInit() {
    this.movimentoService.getMovimentos().subscribe(data => 
      {
        this.movimentos = data;
      });
  }

  buscaPorCodigo() {
    this.movimentoService.getMovimentoByCodigo(this.busca).subscribe(
      data => {
          if(data != null) 
          {
            this.movimentos = data;
          }
      });
  }

  buscaPorCodigoVendedor() {
        this.movimentoService.getMovimentoByCodigo(this.busca).subscribe(
        data => {
          if(data != null) {
            this.movimentos = [];
            this.movimentos.push(data)
          }
      }
    );
  }

  buscaPorCodigoCliente() {
    this.movimentoService.getMovimentoByCodigoCliente(this.busca).subscribe(
    data => {
      if(data != null) {
        this.movimentos = [];
        this.movimentos.push(data)
      }
    });
  }

  buscaPorNumeroRecibo() {
    this.movimentoService.getMovimentoByNumeroRecibo(this.busca).subscribe(
    data => {
      if(data != null) {
        this.movimentos = [];
        this.movimentos.push(data)
      }
    });
  }
  buscaPorNumeroPedido() {
    this.movimentoService.getMovimentoByNumeroPedido(this.busca).subscribe(
    data => {
      if(data != null) {
        this.movimentos = [];
        this.movimentos.push(data)
      }
    });
  }

  deleteMovimento(movimento) {
    if(confirm("Tem certeza que deseja deletar: " + movimento.nome + "?")) {

      let index = this.movimentos.indexOf(movimento);
      this.movimentos.splice(index, 1);

      this.movimentoService.deleteMovimento(movimento.id)
        .subscribe(null,
          err => {
                    alert("Não foi possivel remover movimento: " + err.message);
                    this.movimentos.splice(index, 0, movimento);
          });
    }
  }
}