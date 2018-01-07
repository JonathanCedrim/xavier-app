import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { Movimento } from '../shared/movimento';
import { MovimentoService } from '../shared/movimento.service';
import { BasicValidators } from '../../../shared/basic-validators';
import { VendedorService } from '../../vendedor/shared/vendedor.service';
import { ClienteService } from '../../cliente/shared/cliente.service';

@Component({
  selector: 'app-movimento-form',
  templateUrl: './movimento-form.component.html',
  styleUrls: ['./movimento-form.component.css'],  
})
export class MovimentoFormComponent implements OnInit {

  id;
  firstFormGroup: FormGroup
  title: string;
  codigoWrite: boolean = false;
  movimento: Movimento = new Movimento();
  startDate = new Date(1970, 0, 1);

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private movimentoService: MovimentoService,
    private vendedorService: VendedorService,
    private clienteService: ClienteService
  ) {
      this.firstFormGroup = formBuilder.group({
          id:['', [Validators.minLength(0)]],
          codigo: [''],
          vendedor: ['', [Validators.minLength(0)]],
          clienteCodigo: ['', [Validators.minLength(0)]],
          clienteNome: ['', [Validators.minLength(0)]],
          vendedorCodigo: [''],
          vendedorNome: ['', [Validators.minLength(0)]],
          dataCadastro: [''],
          numeroRecibo: ['', [Validators.min(2), Validators.maxLength(70)]],
          numeroPedido: ['', [Validators.min(2), Validators.maxLength(70)]],
          valorCompra: ['', [Validators.min(2), Validators.maxLength(70)]],
          valorRecebido: ['', [Validators.min(2), Validators.maxLength(70)]],
          saldo: ['', [Validators.min(2), Validators.maxLength(70)]],
          observacao: ['', [Validators.min(2), Validators.maxLength(70)]],          
          dataPagamento: [''],
          dataPagamentoII: ['']
      })
  }

  ngOnInit() {
    let id = this.route.params.subscribe(params => {
    
    let id = params['id'];

    this.title = id ? 'Editar Movimento': 'Novo Movimento';
    this.id = id ? id: null;

    if(!id) {
      this.movimento.dataCadastro = new Date();      
      this.codigoWrite = true;
      return ;}

    this.movimentoService.getMovimento(id)
      .subscribe(
        movimento => {
          this.movimento = movimento;
              if(this.movimento.dataPagamento != null || this.movimento.dataPagamento != undefined)
              {
                this.movimento.dataCadastro = new Date(this.movimento.dataCadastro);
              }              

              if(this.movimento.dataPagamento != null || this.movimento.dataPagamento != undefined)
              {
                this.movimento.dataPagamento = new Date(this.movimento.dataPagamento);
              }

              if(this.movimento.dataPagamentoII != null || this.movimento.dataPagamentoII != undefined)
              {
                this.movimento.dataPagamentoII = new Date(this.movimento.dataPagamentoII);
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
    let resultado, movimento = this.movimento;

    if(this.id) 
    {
      movimento.id = this.id;
      resultado = this.movimentoService.updateMovimento(movimento);
    } else 
    {
      resultado = this.movimentoService.addMovimento(movimento);
    }

    resultado.subscribe(data => this.router.navigate(['movimento']));
  }

  atualizaCamposVendedor(codigo) {
    this.vendedorService.getVendedorByCodigo(codigo)
      .subscribe(data => {
        this.movimento.vendedor = data;
      });
  }

  atualizaCamposCliente(codigo) {
    this.clienteService.getClienteByCodigo(codigo)
      .subscribe(data => {
          this.movimento.cliente = data;
      });
  }
}
