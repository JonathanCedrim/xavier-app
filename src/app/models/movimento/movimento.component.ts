import { Component, OnInit } from '@angular/core';

import { Movimento } from './shared/movimento';
import { MovimentoService } from './shared/movimento.service';
import { ClienteService } from '../cliente/shared/cliente.service';
import { VendedorService } from '../vendedor/shared/vendedor.service';


@Component({
  selector: 'app-vendedor',
  templateUrl: './movimento.component.html',
  styleUrls: ['./movimento.component.css']
})
export class MovimentoComponent implements OnInit {

  movimento: Movimento = new Movimento();
  movimentos: Movimento[] = [];
  saldo: number = 0;
  busca;
   

  constructor(
    private movimentoService: MovimentoService,
    private clienteService: ClienteService, 
    private vendedorService: VendedorService) { }

  ngOnInit() { 
    setTimeout(document.getElementById("primeiroInput").focus(), 200);
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

  buscaPorNumeroRecibo() {
    this.movimentoService.getMovimentoByNumeroRecibo(this.busca).subscribe(
    data => {
      if(data != null) {
        this.movimentos = [];
        this.movimentos.push(data)
      } else {
        this.movimentos =[];
      }
    });
  }
  
  buscaPorNumeroPedido() {
    this.movimentoService.getMovimentoByNumeroPedido(this.busca).subscribe(
    data => {
      if(data != null) {
        this.movimentos = [];
        this.movimentos.push(data)
      } else {
        this.movimentos =[];
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

  buscaMovimentos() {
      this.movimentoService.getMovimentosByCodigoVendedorAndCodigoCliente(this.movimento.vendedor.codigo, this.movimento.cliente.codigo)
        .subscribe(data => {
            if(data != null)
            {
              this.movimentos = [];
              this.movimentos = data;

              this.movimento.vendedor.nome = this.movimentos[0].vendedor.nome;
              this.movimento.cliente.nome = this.movimentos[0].cliente.nome;

              this.saldo = 0;
              if(this.movimentos.length == 0) 
              {   
                this.saldo = this.movimentos[0].valorCompra - this.movimento[0].valorRecebido;
              } else
              {
                for(let movimento of this.movimentos) {
                  this.saldo += movimento.valorCompra - movimento.valorRecebido;
              }
            }
          }
        });
  }

  atualizaCamposVendedor(codigo) {
    this.vendedorService.getVendedorByCodigo(codigo)
      .subscribe(data => {
        this.movimento.vendedor.nome = "Insira o codigo do vendedor";  
          if(data != null && data!= undefined) {
            this.movimento.vendedor = data;
          }
      });
  }

  atualizaCamposCliente() {
    let codigoCliente = this.movimento.cliente.codigo;
    let codigoVendedor = this.movimento.vendedor.codigo;
    
      this.clienteService.getClienteByCodigo(codigoVendedor, codigoCliente)
        .subscribe(data => {

          this.movimento.cliente.nome = "Insira o codigo do vendedor";
            if(data != null && data != undefined) {
              this.movimento.cliente = data;
            }   
        });    
  }
}
