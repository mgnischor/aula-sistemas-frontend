import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/pessoas',
        pathMatch: 'full',
    },
    {
        path: 'pessoas',
        loadComponent: () =>
            import('./components/pessoa-lista/pessoa-lista.component').then((m) => m.PessoaListaComponent),
    },
    {
        path: 'pessoas/cadastrar',
        loadComponent: () =>
            import('./components/pessoa-cadastro/pessoa-cadastro.component').then((m) => m.PessoaCadastroComponent),
    },
    {
        path: '**',
        redirectTo: '/pessoas',
    },
];
