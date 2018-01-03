import { Component, OnInit } from '@angular/core';

import { Cliente } from './shared/cliente';
import { ClienteService } from './shared/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  private clientes: Cliente[] = [];
  private busca;
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => this.clientes = data);
  }

  buscaPorNome() {
    this.clienteService.getClienteByNome(this.busca).subscribe(
    data => {
      if(data != null) {
        this.clientes = data;
      }
  }
);
}

  buscaPorRG() {
        this.clienteService.getClienteByRG(this.busca).subscribe(
        data => {
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
      if(data != null) {
        this.clientes = [];
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
}
