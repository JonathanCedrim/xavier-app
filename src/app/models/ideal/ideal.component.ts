import { Component, OnInit } from '@angular/core';

import { Ideal } from './shared/ideal';
import { IdealService } from './shared/ideal.service';
import { Movimento } from '../movimento/shared/movimento';
import { MovimentoService } from '../movimento/shared/movimento.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-ideal',
  templateUrl: './ideal.component.html',
  styleUrls: ['./ideal.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class IdealComponent implements OnInit {

  ideal: Ideal = new Ideal();
  ideals: Ideal[] = [];
  movimentos: Movimento[] = [];
  movimento: Movimento = new Movimento();
  saldo: number = 0;
  busca;
  buscaII;
  startDate = new Date(2018, 0, 1);  

  constructor(
    private adapter: DateAdapter<any>,
    private idealService: IdealService,
    private movimentoService: MovimentoService) { }

  ngOnInit() {
    this.adapter.setLocale('pt-BR');
    let dataInicial = new Date();    
    let ideal = new Ideal();

    dataInicial.setMonth(dataInicial.getMonth() - 1);
    dataInicial.setDate(1);

    ideal.dataInicial = dataInicial;
    ideal.dataFinal = new Date();

    this.idealService.getIdealByDataLancamento(ideal).subscribe(
      data => {
        this.ideals = [];        
        this.ideals = data;
      });

    setTimeout(document.getElementById("primeiroInput").focus(), 200);
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

  buscaIdealPorVendedorEData() {
        this.idealService.getIdealByVendedorEData(this.ideal).subscribe(        
        data => {
          this.ideals = [];        
          if(data != null && this.ideal.vendedor.codigo != null || this.ideal.vendedor.codigo != undefined) {            
            this.ideals = data;
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
    });
  }
}
