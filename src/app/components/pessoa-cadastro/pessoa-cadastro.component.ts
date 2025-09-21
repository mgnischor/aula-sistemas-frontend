import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { CreatePessoaRequest } from '../../models/pessoa.model';

@Component({
    selector: 'app-pessoa-cadastro',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
        <div class="container">
            <div class="header">
                <h2>Cadastrar Nova Pessoa</h2>
                <button class="btn btn-secondary" routerLink="/pessoas">Voltar para Lista</button>
            </div>

            <div class="form-container">
                <form [formGroup]="pessoaForm" (ngSubmit)="onSubmit()">
                    <div class="form-group">
                        <label for="nome">Nome *</label>
                        <input
                            type="text"
                            id="nome"
                            formControlName="nome"
                            [class.error]="isFieldInvalid('nome')"
                            placeholder="Digite o nome completo"
                        />
                        <div class="error-message" *ngIf="isFieldInvalid('nome')">
                            <span *ngIf="pessoaForm.get('nome')?.errors?.['required']">Nome é obrigatório</span>
                            <span *ngIf="pessoaForm.get('nome')?.errors?.['minlength']"
                                >Nome deve ter pelo menos 2 caracteres</span
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            formControlName="email"
                            [class.error]="isFieldInvalid('email')"
                            placeholder="exemplo@email.com"
                        />
                        <div class="error-message" *ngIf="isFieldInvalid('email')">
                            <span *ngIf="pessoaForm.get('email')?.errors?.['required']">Email é obrigatório</span>
                            <span *ngIf="pessoaForm.get('email')?.errors?.['email']"
                                >Email deve ter um formato válido</span
                            >
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="telefone">Telefone</label>
                        <input type="tel" id="telefone" formControlName="telefone" placeholder="(11) 99999-9999" />
                    </div>

                    <div class="form-group">
                        <label for="idade">Idade</label>
                        <input
                            type="number"
                            id="idade"
                            formControlName="idade"
                            min="1"
                            max="150"
                            placeholder="Ex: 25"
                        />
                        <div class="error-message" *ngIf="isFieldInvalid('idade')">
                            <span *ngIf="pessoaForm.get('idade')?.errors?.['min']">Idade deve ser maior que 0</span>
                            <span *ngIf="pessoaForm.get('idade')?.errors?.['max']">Idade deve ser menor que 150</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="endereco">Endereço</label>
                        <textarea
                            id="endereco"
                            formControlName="endereco"
                            rows="3"
                            placeholder="Digite o endereço completo"
                        ></textarea>
                    </div>

                    <div class="form-actions">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            (click)="limparFormulario()"
                            [disabled]="enviando"
                        >
                            Limpar
                        </button>
                        <button type="submit" class="btn btn-primary" [disabled]="pessoaForm.invalid || enviando">
                            {{ enviando ? 'Cadastrando...' : 'Cadastrar Pessoa' }}
                        </button>
                    </div>
                </form>

                <div class="success-message" *ngIf="sucessoMensagem">
                    {{ sucessoMensagem }}
                </div>

                <div class="error-message" *ngIf="erroMensagem">
                    {{ erroMensagem }}
                </div>
            </div>
        </div>
    `,
    styles: [
        `
            .container {
                padding: 20px;
                max-width: 800px;
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
                padding: 12px 24px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                display: inline-block;
                font-size: 14px;
                transition: all 0.3s ease;
                border: 1px solid transparent;
            }

            .btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .btn-primary {
                background-color: #007bff;
                color: white;
            }

            .btn-primary:hover:not(:disabled) {
                background-color: #0056b3;
            }

            .btn-secondary {
                background-color: #6c757d;
                color: white;
            }

            .btn-secondary:hover:not(:disabled) {
                background-color: #545b62;
            }

            .form-container {
                background-color: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                color: #333;
            }

            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 14px;
                transition: border-color 0.3s ease;
                box-sizing: border-box;
            }

            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #007bff;
            }

            .form-group input.error,
            .form-group textarea.error {
                border-color: #dc3545;
            }

            .form-group textarea {
                resize: vertical;
                min-height: 80px;
            }

            .form-actions {
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                margin-top: 30px;
                flex-wrap: wrap;
            }

            .error-message {
                color: #dc3545;
                font-size: 14px;
                margin-top: 5px;
                padding: 10px;
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 4px;
            }

            .success-message {
                color: #155724;
                font-size: 14px;
                margin-top: 20px;
                padding: 10px;
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                border-radius: 4px;
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

                .form-container {
                    padding: 20px;
                }

                .form-actions {
                    justify-content: stretch;
                }

                .form-actions .btn {
                    flex: 1;
                }
            }
        `,
    ],
})
export class PessoaCadastroComponent {
    pessoaForm: FormGroup;
    enviando = false;
    sucessoMensagem: string | null = null;
    erroMensagem: string | null = null;

    constructor(private fb: FormBuilder, private pessoaService: PessoaService, private router: Router) {
        this.pessoaForm = this.fb.group({
            nome: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            telefone: [''],
            idade: ['', [Validators.min(1), Validators.max(150)]],
            endereco: [''],
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.pessoaForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    limparFormulario(): void {
        this.pessoaForm.reset();
        this.sucessoMensagem = null;
        this.erroMensagem = null;
    }

    onSubmit(): void {
        if (this.pessoaForm.valid) {
            this.enviando = true;
            this.sucessoMensagem = null;
            this.erroMensagem = null;

            const pessoaData: CreatePessoaRequest = {
                nome: this.pessoaForm.value.nome.trim(),
                email: this.pessoaForm.value.email.trim(),
                telefone: this.pessoaForm.value.telefone?.trim() || undefined,
                idade: this.pessoaForm.value.idade || undefined,
                endereco: this.pessoaForm.value.endereco?.trim() || undefined,
            };

            this.pessoaService.adicionarPessoa(pessoaData).subscribe({
                next: (pessoaCriada) => {
                    this.sucessoMensagem = `Pessoa "${pessoaCriada.nome}" cadastrada com sucesso! ID: ${pessoaCriada.id}`;
                    this.limparFormulario();
                    this.enviando = false;

                    // Redirecionar para a lista após 2 segundos
                    setTimeout(() => {
                        this.router.navigate(['/pessoas']);
                    }, 2000);
                },
                error: (error) => {
                    console.error('Erro ao cadastrar pessoa:', error);
                    this.erroMensagem = 'Erro ao cadastrar pessoa. Verifique se a API está rodando e tente novamente.';
                    this.enviando = false;
                },
            });
        } else {
            // Marcar todos os campos como touched para mostrar erros
            Object.keys(this.pessoaForm.controls).forEach((key) => {
                this.pessoaForm.get(key)?.markAsTouched();
            });
        }
    }
}
