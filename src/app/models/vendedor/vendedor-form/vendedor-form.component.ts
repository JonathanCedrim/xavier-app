import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Vendedor } from '../shared/vendedor';
import { Cep } from '../../../shared/cep';
import { CepService } from '../../../shared/cep.service';
import { VendedorService } from '../shared/vendedor.service';
import { BasicValidators } from '../../../shared/basic-validators';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html',
  styleUrls: ['./vendedor-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class VendedorFormComponent implements OnInit {

  id;
  firstFormGroup: FormGroup
  title: string;
  codigoWrite: boolean = false;
  vendedor: Vendedor = new Vendedor();
  cep: Cep = new Cep();
  operadoras: string[] = ['TIM', 'VIVO', 'OI', 'CLARO', 'NEXTEL', 'ALGAR'];
  startDate = new Date(1970, 0, 1);

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adapter: DateAdapter<any>,
    private vendedorService: VendedorService,
    private cepService: CepService
  ) {
      this.firstFormGroup = formBuilder.group({
          id:['', [Validators.minLength(0)]],
          codigo: [''],
          nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
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
          bairro: ['', [Validators.min(2), Validators.maxLength(70)]],
          endereco: ['', [Validators.min(2), Validators.maxLength(70)]],
          numero: ['', [Validators.min(1), Validators.maxLength(10)]],
          observacao: ['', [Validators.min(2), Validators.maxLength(70)]],
          salario: [''],
          pedidoInicial: [''],
          pedidoFinal: [''],
          registroInicial: [''],
          registroFinal: ['']
      })
  }

  ngOnInit() {
    this.adapter.setLocale("pt-BR");

    let id = this.route.params.subscribe(params => {
    
    let id = params['id'];

    this.title = id ? 'Editar Vendedor': 'Novo Vendedor';
    this.id = id ? id: null;

    if(!id) {
      this.codigoWrite = true;
      return ;}

    this.vendedorService.getVendedor(id)
      .subscribe(
        vendedor => {
           this.vendedor = vendedor;           
              if(this.vendedor.dataNascimento != null || this.vendedor.dataNascimento != undefined)
              {
                this.vendedor.dataNascimento = new Date(this.vendedor.dataNascimento);
              }
          },
        response => {
          if(response.status == 404) 
          {
            this.router.navigate(['NotFound']);
          }
      });      
    });    
  }

  save() {
    let resultado, vendedor = this.vendedor;

    if(this.id) 
    {
      vendedor.id = this.id;
      resultado = this.vendedorService.updateVendedor(vendedor);
    } else 
    {
      resultado = this.vendedorService.addVendedor(vendedor);
    }

    resultado.subscribe(data => this.router.navigate(['vendedor']));
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

  private setEndereco(cep: Cep) 
  {
      this.vendedor.sigla = cep.uf;
      this.vendedor.bairro = cep.bairro;
      this.vendedor.endereco = cep.logradouro;
  }
}
