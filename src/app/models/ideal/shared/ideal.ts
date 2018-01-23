import { Vendedor } from '../../vendedor/shared/vendedor';

export class Ideal {    
    id: number;
    codigo: number;
    vendedor: Vendedor = new Vendedor();
    dataLancamento: Date;
    dataInicial: Date;
    dataFinal: Date;
    totalRecebido: number;
    ideal: number;
    sobra: number;
    responsavel: string;
}
