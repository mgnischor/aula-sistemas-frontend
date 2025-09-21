import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa.model';

@Component({
    selector: 'app-pessoa-lista',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="container">
            <div class="header">
                <h2>Lista de Pessoas</h2>
                <button class="btn btn-primary" routerLink="/pessoas/cadastrar">Cadastrar Nova Pessoa</button>
            </div>

            <div class="loading" *ngIf="carregando">Carregando pessoas...</div>

            <div class="error" *ngIf="erro">
                <p>Erro ao carregar pessoas: {{ erro }}</p>
                <button class="btn btn-secondary" (click)="carregarPessoas()">Tentar Novamente</button>
            </div>

            <div class="pessoas-grid" *ngIf="!carregando && !erro">
                <div class="pessoa-card" *ngFor="let pessoa of pessoas" [attr.data-id]="pessoa.id">
                    <div class="pessoa-info">
                        <h3>{{ pessoa.nome }}</h3>
                        <p><strong>Email:</strong> {{ pessoa.email }}</p>
                        <p *ngIf="pessoa.telefone"><strong>Telefone:</strong> {{ pessoa.telefone }}</p>
                        <p *ngIf="pessoa.idade"><strong>Idade:</strong> {{ pessoa.idade }} anos</p>
                        <p *ngIf="pessoa.endereco"><strong>Endereço:</strong> {{ pessoa.endereco }}</p>
                    </div>
                    <div class="pessoa-actions">
                        <span class="uuid">ID: {{ pessoa.id }}</span>
                    </div>
                </div>

                <div class="empty-state" *ngIf="pessoas.length === 0">
                    <p>Nenhuma pessoa cadastrada ainda.</p>
                    <button class="btn btn-primary" routerLink="/pessoas/cadastrar">Cadastrar Primeira Pessoa</button>
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .container {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                flex-wrap: wrap;
                gap: 15px;
            }

            .header h2 {
                margin: 0;
                color: #333;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                font-size: 14px;
                transition: background-color 0.3s ease;
            }

            .btn-primary {
                background-color: #007bff;
                color: white;
            }

            .btn-primary:hover {
                background-color: #0056b3;
            }

            .btn-secondary {
                background-color: #6c757d;
                color: white;
            }

            .btn-secondary:hover {
                background-color: #545b62;
            }

            .loading,
            .error {
                text-align: center;
                padding: 40px;
            }

            .error {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 5px;
                color: #721c24;
            }

            .pessoas-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
            }

            .pessoa-card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 20px;
                background-color: white;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: box-shadow 0.3s ease;
            }

            .pessoa-card:hover {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            }

            .pessoa-info h3 {
                margin: 0 0 15px 0;
                color: #333;
                border-bottom: 2px solid #007bff;
                padding-bottom: 5px;
            }

            .pessoa-info p {
                margin: 8px 0;
                color: #555;
            }

            .pessoa-actions {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #eee;
            }

            .uuid {
                font-size: 12px;
                color: #888;
                font-family: monospace;
            }

            .empty-state {
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
                color: #666;
            }

            .empty-state p {
                font-size: 18px;
                margin-bottom: 20px;
            }

            @media (max-width: 768px) {
                .container {
                    padding: 15px;
                }

                .header {
                    flex-direction: column;
                    align-items: stretch;
                    text-align: center;
                }

                .pessoas-grid {
                    grid-template-columns: 1fr;
                }
            }
        `,
    ],
})
export class PessoaListaComponent implements OnInit {
    pessoas: Pessoa[] = [];
    carregando = true;
    erro: string | null = null;

    constructor(private pessoaService: PessoaService) {}

    ngOnInit(): void {
        this.carregarPessoas();
    }

    carregarPessoas(): void {
        this.carregando = true;
        this.erro = null;

        this.pessoaService.listarPessoas().subscribe({
            next: (pessoas) => {
                this.pessoas = pessoas;
                this.carregando = false;
            },
            error: (error) => {
                console.error('Erro ao carregar pessoas:', error);
                this.erro =
                    'Não foi possível carregar a lista de pessoas. Verifique se a API está rodando em http://localhost:5000';
                this.carregando = false;
            },
        });
    }
}
