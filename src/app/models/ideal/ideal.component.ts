import { Component, OnInit } from '@angular/core';

import { Ideal } from './shared/ideal';
import { IdealService } from './shared/ideal.service';
import { Movimento } from '../movimento/shared/movimento';
import { MovimentoService } from '../movimento/shared/movimento.service';

@Component({
  selector: 'app-ideal',
  templateUrl: './ideal.component.html',
  styleUrls: ['./ideal.component.css']
})
export class IdealComponent implements OnInit {

  ideal: Ideal = new Ideal();
  ideals: Ideal[] = [];
  movimentos: Movimento[] = [];
  movimento: Movimento = new Movimento();
  saldo: number = 0;
  busca;
  buscaII;
  
  constructor(
    private idealService: IdealService,
    private movimentoService: MovimentoService) { }

  ngOnInit() {
    this.idealService.getIdeals().subscribe(data => this.ideals = data);
  }

  buscaIdealPorCodigo() {
    this.idealService.getIdealByCodigo(this.busca).subscribe( 
        data => {
          this.ideals = [];
          if(data != null) {
            this.ideals = data;
          }        
      });
  }

  buscaIdealPorVendedor() {
      this.idealService.getIdealsByVendedor(this.busca).subscribe(
      data => {
        this.ideals = [];
        if(data != null) {
          this.ideals = data;
        }
    });
  }

  buscaIdealPorData() {
        this.idealService.getIdealByData(this.ideal).subscribe(
        data => {
          this.ideals = [];
          if(data != null) {
            this.ideals = [];
            this.ideals.push(data)
          }
      });
  }    

  deleteIdeal(ideal) {
    if(confirm("Tem certeza que deseja deletar: " + ideal.nome + "?")) {
      
      let index = this.ideals.indexOf(ideal);
      this.ideals.splice(index, 1);

      this.idealService.deleteIdeal(ideal.id)
        .subscribe(null, 
          err => {
                    alert("Não foi possivel remover vendedor: " + err.message);
                    this.ideals.splice(index, 0, ideal);
          });
    }
  }

  buscaMovimentos() {
    this.movimentoService.getMovimentosByVendedorAndData(this.movimento)
      .subscribe(data => {
          if(data != null)
          {
            this.movimentos = [];
            this.movimentos = data;

            if(this.movimentos.length == 0) 
            {
              this.saldo = this.movimentos[0].valorCompra - this.movimento[0].valorRecebido;
            } else
            {
              for(let movimento of this.movimentos) {
                this.saldo += movimento.valorCompra - movimento.valorRecebido;
                
                console.log("valor saldo: " + this.saldo);
                console.log("valor de compra: " + movimento.valorCompra);
                console.log("valor recebido: " + movimento.valorRecebido);
            }
          }
        }
    });
  }
}
