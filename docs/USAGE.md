# Uso

Este documento descreve como usar a aplicação durante o desenvolvimento e demonstrações.

Fluxos principais

1. Cadastro de pessoa

    - Acesse a rota de cadastro (no layout atual há um componente `pessoa-cadastro`).
    - Preencha os campos obrigatórios (nome, email, etc. conforme `pessoa.model.ts`).
    - Enviar o formulário chama o `PessoaService` para persistir a entidade. Atualmente o serviço pode usar um mock local ou integrar com um backend quando configurado.

2. Listagem de pessoas

    - O componente `pessoa-lista` solicita a lista de pessoas via `PessoaService`.
    - A lista é exibida em forma de tabela/grade com ações básicas (editar, excluir) quando implementadas.

Integração com backend

-   O serviço `src/app/services/pessoa.service.ts` é o ponto de integração com o backend. Por padrão pode estar usando um array em memória para testes locais.
-   Para conectar a um backend REST, altere as URLs no `PessoaService` e garanta CORS no servidor.

Rotas

-   As rotas da aplicação estão em `src/app/app.routes.ts`.

Dicas

-   Use as ferramentas de desenvolvimento do navegador para inspecionar chamadas HTTP.
-   Edite e recarregue rapidamente com `npm start`; o Angular fará reload automático ao salvar.
