import { Vendedor } from '../../vendedor/shared/vendedor';

export class Cliente {
    id: number;
    codigo: number;
    nome: string;
    rg: string;
    cpf: string;
    conjugue: string;
    estadoCivil: string;
    dataNascimento: Date;
    email: string;
    telefone: string;
    operadora: string;
    celular: string;    
    operadoraII: string;
    celularII: string;
    municipio: string;
    sigla: string;
    cep: string;
    bairro: string;
    endereco: string;
    numero: number;
    referencia: string;
    observacao: string;
    salario: number;    
    dataCadastro: Date;
    selecionado: boolean;
    spc: boolean;
    vendedor: Vendedor = new Vendedor();
}
