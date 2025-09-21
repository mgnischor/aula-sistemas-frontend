import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa, CreatePessoaRequest } from '../models/pessoa.model';

@Injectable({
    providedIn: 'root',
})
export class PessoaService {
    private readonly apiUrl = 'http://localhost:5000/api/v1/pessoas';

    constructor(private http: HttpClient) {}

    /**
     * Lista todas as pessoas
     */
    listarPessoas(): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(this.apiUrl);
    }

    /**
     * Busca uma pessoa específica por UUID
     */
    buscarPessoa(uuid: string): Observable<Pessoa> {
        return this.http.get<Pessoa>(`${this.apiUrl}/${uuid}`);
    }

    /**
     * Adiciona uma nova pessoa
     */
    adicionarPessoa(pessoa: CreatePessoaRequest): Observable<Pessoa> {
        return this.http.post<Pessoa>(this.apiUrl, pessoa);
    }
}
