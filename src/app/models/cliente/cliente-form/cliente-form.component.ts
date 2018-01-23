import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Cliente } from '../shared/cliente';
import { ClienteService } from '../shared/cliente.service';
import { Vendedor } from '../../vendedor/shared/vendedor';
import { Cep } from '../../../shared/cep';
import { VendedorService } from '../../vendedor/shared/vendedor.service';
import { CepService } from '../../../shared/cep.service';
import { BasicValidators } from '../../../shared/basic-validators';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class ClienteFormComponent implements OnInit
 {
    id;
    firstFormGroup: FormGroup
    title: string;
    codigoWrite: boolean = false;
    cliente: Cliente = new Cliente();
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
      private clienteService: ClienteService,
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
            numero: ['', [Validators.minLength(1), Validators.maxLength(10)]],
            referencia: ['', [Validators.maxLength(70)]],
            observacao: ['', [Validators.minLength(2), Validators.maxLength(70)]],
            dataCadastro: ['', [Validators.minLength(1), Validators.maxLength(10)]],
        })
    }

    ngOnInit() {
      this.adapter.setLocale('pt-BR');
      
      let id = this.route.params.subscribe(params =>
      {
        let id = params['id'];
        let data = new Date();
        let dataCadastro = this.cliente.dataCadastro;
        this.title = id ? 'Editar Cliente': 'Novo Cliente';
        this.id = id ? id: null;
          
        if(!id)
        { 
          this.codigoWrite = true;
          this.cliente.dataCadastro = new Date();
          return ;
        }
        this.clienteService.getCliente(id)
          .subscribe(
            cliente => 
            {
              this.cliente = cliente
              this.vendedores = [];
              this.vendedores.push(this.cliente.vendedor);
              if(this.cliente.dataCadastro == null || this.cliente.dataCadastro == undefined) 
              {
                this.cliente.dataCadastro = new Date();        
              } else 
              {
                this.cliente.dataCadastro = new Date(this.cliente.dataCadastro);
              }
              if(this.cliente.dataNascimento != null || this.cliente.dataNascimento != undefined)
              {
                this.cliente.dataNascimento = new Date(this.cliente.dataNascimento);
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
      setTimeout(()=>{ document.getElementById("firstInput").focus();}, 200);
      this.vendedorService.getVendedores() //arrumar
      .subscribe(data => this.vendedores = data);   
    }

    save() {
      let resultado, cliente = this.cliente;

      if(this.id) 
      {
        cliente.id = this.id;
        resultado = this.clienteService.updateCliente(cliente);
      } else 
      {
        resultado = this.clienteService.addCliente(cliente);
      }

      resultado.subscribe(data => this.router.navigate(['cliente']));
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

    atualizaCamposVendedor(codigo) 
    {
      this.vendedorService.getVendedorByCodigo(codigo)
        .subscribe(data => {
          if(data == null || data == undefined || codigo == NaN) {
            this.cliente.vendedor.nome = "INVALIDO";         
            return null;
          }
          this.cliente.vendedor = data
        });
    }

    log() 
    {
        console.log("Data cadastro: " + this.cliente.dataCadastro);
        console.log("Data nascimento: " + this.cliente.dataNascimento)
    }

    private setEndereco(cep: Cep) 
    {
        this.cliente.sigla = cep.uf;
        this.cliente.bairro = cep.bairro;
        this.cliente.endereco = cep.logradouro;
    }
}
