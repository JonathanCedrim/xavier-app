import { Component, OnInit } from '@angular/core';

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
  
  constructor(
    private clienteService: ClienteService,
    private movimentoService: MovimentoService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
  }

  buscaPorNome() {
    this.clienteService.getClienteByNome(this.busca).subscribe(
    data => {
      this.clientes = [];
      if(data != null) {
        this.clientes = data;
      }
  }
);
}

  buscaPorRG() {
        this.clienteService.getClienteByRG(this.busca).subscribe(
        data => {
          this.clientes = [];
          if(data != null) {
            this.clientes = [];
            this.clientes.push(data)
          }
      }
    );
  }

  buscaPorCPF() {
    this.clienteService.getClienteByCPF(this.busca).subscribe(
    data => {
      this.clientes = [];
      if(data != null) {        
        this.clientes.push(data)        
      } 
  }
);
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
  }
}
