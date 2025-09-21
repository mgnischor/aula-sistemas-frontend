export interface Pessoa {
    id?: string; // UUID gerado pela API
    nome: string;
    email: string;
    telefone?: string;
    idade?: number;
    endereco?: string;
}

export interface CreatePessoaRequest {
    nome: string;
    email: string;
    telefone?: string;
    idade?: number;
    endereco?: string;
}
