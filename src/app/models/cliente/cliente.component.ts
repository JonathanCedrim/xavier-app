import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { Cliente } from './shared/cliente';
import { ClienteService } from './shared/cliente.service';
import { Movimento } from '../movimento/shared/movimento';
import { MovimentoService } from '../movimento/shared/movimento.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  movimentos: Movimento[] = [];
  movimento: Movimento = new Movimento();
  saldo: number = 0;
  busca;

  length = 0;
  pageSize = 50;
  pageSizeOptions = [50, 100, 200];
  pageEvent: PageEvent = new PageEvent;
  

  constructor(
    private clienteService: ClienteService,
    private movimentoService: MovimentoService) { }

  ngOnInit() {        
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = this.pageSize;

    this.clienteService.getTotalClientes().subscribe(data => {
      this.length = data;
    });

    this.clienteService.getClientes(this.pageEvent.pageIndex, this.pageEvent.pageSize)
      .subscribe(data => this.clientes = data);

    setTimeout(document.getElementById("filter").focus(), 200);
  }

  setPageSizeOptions(setPageSizeOptions: string) {
    console.log("vish");
    this.pageSizeOptions = setPageSizeOptions.split(',').map(str => +str);
  }

  atualizaClientes(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    console.log("oi");
    this.clienteService.getClientes(this.pageEvent.pageIndex, this.pageEvent.pageSize)
      .subscribe(data => this.clientes = data);
  }

  buscaPorNome() {
    this.clienteService.getClienteByNome(this.busca).subscribe(
    data => {
      this.clientes = [];
      if(data != null) {
        this.clientes = data;
      }
  });
}

  buscaPorRG() {
        this.clienteService.getClienteByRG(this.busca).subscribe(
        data => {
          this.clientes = [];
          if(data != null) {
            this.clientes = [];
            this.clientes.push(data)
          }
      });
  }

  buscaPorCPF() {
    this.clienteService.getClienteByCPF(this.busca).subscribe(
    data => {
      this.clientes = [];
      if(data != null) {        
        this.clientes.push(data)        
      } 
<<<<<<< HEAD
  });
=======
  }
);
>>>>>>> de295b07dd93b4f05298f47aa5b39b437c98feee
}

  buscaPorVendedor() {
    this.clienteService.getClientesPorVendedor(this.busca, this.pageEvent.pageIndex, this.pageEvent.pageSize)
        .subscribe(data => {
            this.clientes = data;
        });
  }

  deleteCliente(cliente) {
    if(confirm("Tem certeza que deseja deletar: " + cliente.nome + "?")) {
      
      let index = this.clientes.indexOf(cliente);
      this.clientes.splice(index, 1);

      this.clienteService.deleteCliente(cliente.id)
        .subscribe(null, 
          err => {
                    alert("Não foi possivel remover vendedor: " + err.message);
                    this.clientes.splice(index, 0, cliente);
          });
    }
  }

  buscaMovimentos(codigoVendedor, codigoCliente) {
    this.movimentoService.getMovimentosByCodigoVendedorAndCodigoCliente(codigoVendedor, codigoCliente)
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
<<<<<<< HEAD
=======
}

  clear(){ this.saldo = 0; console.error("try");}//POG
  
  
  
  log(d, e) {
    console.log("test: " + d + e);
>>>>>>> de295b07dd93b4f05298f47aa5b39b437c98feee
  }
}
