import { Cliente } from "../../cliente/shared/cliente";
import { Vendedor } from "../../vendedor/shared/vendedor";

export class Movimento {
    id: number;
    codigo:number;
    vendedor: Vendedor = new Vendedor();
    cliente: Cliente = new Cliente();
    dataCadastro: Date;
    numeroRecibo: number;
    numeroPedido: number;
    valorCompra: number;
    valorRecebido: number;
    saldo: string;
    observacao: string
    dataPagamento: Date;
    dataPagamentoII: Date;
}
