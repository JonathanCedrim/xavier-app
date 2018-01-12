import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Ideal } from '../shared/ideal';
import { IdealService } from '../shared/ideal.service';
import { Vendedor } from '../../vendedor/shared/vendedor';
import { Cep } from '../../../shared/cep';
import { VendedorService } from '../../vendedor/shared/vendedor.service';
import { CepService } from '../../../shared/cep.service';
import { BasicValidators } from '../../../shared/basic-validators';

@Component({
  selector: 'app-ideal-form',
  templateUrl: './ideal-form.component.html',
  styleUrls: ['./ideal-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class IdealFormComponent implements OnInit
 {
    id;
    firstFormGroup: FormGroup
    title: string;
    codigoWrite: boolean = false;
    ideal: Ideal = new Ideal();
    vendedor: Vendedor = new Vendedor();
    cep: Cep = new Cep();
    vendedores: Vendedor[] = [];
    data: Date;
    operadoras: string[] = ['TIM', 'VIVO', 'OI', 'CLARO', 'NEXTEL', 'ALGAR'];
    startDate = new Date(1970, 0, 1);

    constructor(
      formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,        
      private adapter: DateAdapter<any>,
      private idealService: IdealService,
      private vendedorService: VendedorService,
      private cepService: CepService
    ) {    
        this.firstFormGroup = formBuilder.group({
            id:['', [Validators.minLength(0)]],
            nome: [''],
            codigo: [''],
            vendedorCodigo: [''],
            vendedorNome: [''],
            dataInicial: [''],
            dataFinal: [''],
            dataLancamento: ['', [Validators.minLength(1), Validators.maxLength(10)]]
            
        })
    }

    ngOnInit() {
      this.adapter.setLocale('pt-BR');
      
      let id = this.route.params.subscribe(params =>
      {
        let id = params['id'];
        let data = new Date();
        let dataLancamento = this.ideal.dataLancamento;
        this.title = id ? 'Editar Ideal': 'Novo Ideal';
        this.id = id ? id: null;
          
        if(!id)
        { 
          this.codigoWrite = true;
          this.ideal.dataLancamento = new Date();
          return ;
        }
        this.idealService.getIdeal(id)
          .subscribe(
            ideal => 
            {
              this.ideal = ideal
              this.vendedores = [];
              this.vendedores.push(this.ideal.vendedor);
              if(this.ideal.dataLancamento == null || this.ideal.dataLancamento == undefined) 
              {
                this.ideal.dataLancamento = new Date();        
              } else 
              {
                this.ideal.dataLancamento = new Date(this.ideal.dataLancamento);
              }
              if(this.ideal.dataInicial != null || this.ideal.dataInicial != undefined)
              {
                this.ideal.dataInicial = new Date(this.ideal.dataInicial);
              }
              if(this.ideal.dataFinal != null || this.ideal.dataFinal != undefined)
              {
                this.ideal.dataFinal = new Date(this.ideal.dataFinal);
              }
            },
            response => 
            {
              if(response.status == 404) 
              {
                this.router.navigate(['NotFound']);
              }
            });
      });

      this.vendedorService.getVendedores() //arrumar
      .subscribe(data => this.vendedores = data);   
    }

    save() {
      let resultado, ideal = this.ideal;

      if(this.id) 
      {
        ideal.id = this.id;
        resultado = this.idealService.updateIdeal(ideal);
      } else 
      {
        resultado = this.idealService.addIdeal(ideal);
      }

      resultado.subscribe(data => this.router.navigate(['ideal']));
    }

    atualizaCodigoVendedor(codigo) {
      this.vendedor.codigo = codigo;
      console.log("Codigo : " + codigo);
    }


    atualizaCamposVendedor(codigo: number) 
    {
      this.vendedorService.getVendedorByCodigo(codigo)
        .subscribe(data => {
                    
          if(data == undefined || data == null) {
            this.ideal.vendedor.nome = "Insira codigo do vendedor";
            return null;
          }
          this.ideal.vendedor = data;          
      });
    }
}
