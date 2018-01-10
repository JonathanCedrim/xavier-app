import { Component, OnInit } from '@angular/core';

import { Vendedor } from './shared/vendedor';
import { VendedorService } from './shared/vendedor.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

  vendedores: Vendedor[] = [];
  busca;
  constructor(private vendedorService: VendedorService) { }

  ngOnInit() {
    this.vendedorService.getVendedores().subscribe(data => 
      {
        this.vendedores = data;
      });
  }

  buscaPorNome() {
    this.vendedorService.getVendedorByNome(this.busca).subscribe(
      data => {
          this.vendedores = [];
          if(data != null) 
          {
            this.vendedores = data;
          }
      });
  }

  buscaPorRG() {
        this.vendedorService.getVendedorByRG(this.busca).subscribe(
        data => {
          this.vendedores = [];
          if(data != null) {
            this.vendedores.push(data)
          }
      }
    );
  }

  buscaPorCPF() {
    this.vendedorService.getVendedorByCPF(this.busca).subscribe(
    data => {
      this.vendedores = [];
      if(data != null) {
        this.vendedores.push(data)
      }
  }
);
}

  deleteVendedor(vendedor) {
    if(confirm("Tem certeza que deseja deletar: " + vendedor.nome + "?")) {

      let index = this.vendedores.indexOf(vendedor);
      this.vendedores.splice(index, 1);

      this.vendedorService.deleteVendedor(vendedor.id)
        .subscribe(null,
          err => {
                    alert("Não foi possivel remover vendedor: " + err.message);
                    this.vendedores.splice(index, 0, vendedor);
          });
    }
  }
}
