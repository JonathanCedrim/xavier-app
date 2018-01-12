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
            codigo: [''],
            vendedorCodigo: [''],
            vendedorNome: [''],
            nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
            conjugue: ['', [ Validators.minLength(2), Validators.maxLength(70)]],
            rg: ['', [Validators.minLength(9), Validators.maxLength(14)]],
            cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
            email: ['', [BasicValidators.email] ],
            dataNascimento: [''],
            telefone: ['', [Validators.pattern('^([0-9]?){2}([0-9]){4}([-]?)([0-9]){4}$')]],
            operadora: ['', [Validators.minLength(2), Validators.maxLength(10)]],
            celular: ['', [Validators.pattern('^([0-9]?){2}([0-9]){5}([-]?)([0-9]){4}$')]],
            operadoraII: ['', [Validators.minLength(2), Validators.maxLength(10)]],
            celularII: ['', [Validators.pattern('^([0-9]?){2}([0-9]{5})([-]?)([0-9]){4}$')]],
            municipio: ['', [Validators.minLength(3) ,Validators.maxLength(30)]],
            sigla: ['', [Validators.minLength(2), Validators.maxLength(5)]],
            cep: ['', [Validators.pattern('^([0-9]){5}([-]?)([0-9]){3}$')]],
            bairro: ['', [Validators.minLength(2), Validators.maxLength(70)]],
            endereco: ['', [Validators.minLength(2), Validators.maxLength(70)]],
            numero: ['', [Validators.maxLength(10)]],
            referencia: ['', [Validators.maxLength(70)]],
            observacao: ['', [Validators.minLength(2), Validators.maxLength(70)]],
            dataCadastro: ['', [Validators.minLength(1), Validators.maxLength(10)]],
            spc: ['', [Validators.minLength(1), Validators.maxLength(10)]],
            selecionado: ['', [Validators.minLength(1), Validators.maxLength(10)]],
        })
    }

    ngOnInit() {
      this.adapter.setLocale('pt-BR');
      
      let id = this.route.params.subscribe(params =>
      {
        let id = params['id'];
        let data = new Date();
        let dataCadastro = this.ideal.dataCadastro;
        this.title = id ? 'Editar Ideal': 'Novo Ideal';
        this.id = id ? id: null;
          
        if(!id)
        { 
          this.codigoWrite = true;
          this.ideal.dataCadastro = new Date();
          return ;
        }
        this.idealService.getIdeal(id)
          .subscribe(
            ideal => 
            {
              this.ideal = ideal
              this.vendedores = [];
              this.vendedores.push(this.ideal.vendedor);
              if(this.ideal.dataCadastro == null || this.ideal.dataCadastro == undefined) 
              {
                this.ideal.dataCadastro = new Date();        
              } else 
              {
                this.ideal.dataCadastro = new Date(this.ideal.dataCadastro);
              }
              if(this.ideal.dataNascimento != null || this.ideal.dataNascimento != undefined)
              {
                this.ideal.dataNascimento = new Date(this.ideal.dataNascimento);
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

    atualizaEnderecoViaCep(codigo: string) {
      if(codigo.length == 8) 
      {
        this.cepService.getCep(codigo)
            .subscribe(data =>
              {
                this.cep = data
                this.setEndereco(this.cep);
            });
      } else 
      {
        console.log("invalido");
      }
    }

    atualizaCamposVendedor(codigo: number) 
    {
      this.vendedorService.getVendedorByCodigo(codigo)
        .subscribe(data => this.ideal.vendedor = data);          
    }

    log() 
    {
        console.log("Data cadastro: " + this.ideal.dataCadastro);
        console.log("Data nascimento: " + this.ideal.dataNascimento)
    }

    private setEndereco(cep: Cep) 
    {
        this.ideal.sigla = cep.uf;
        this.ideal.bairro = cep.bairro;
        this.ideal.endereco = cep.logradouro;
    }
}
