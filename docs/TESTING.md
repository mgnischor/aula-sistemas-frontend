# Testes

Este arquivo explica como executar os testes existentes e adicionar novos testes unitários.

Executando testes

-   Usando npm:

    npm test

-   O comando roda o Karma + Jasmine conforme configurado nas dependências do projeto.

Escrevendo testes

-   Localize o arquivo `.spec.ts` correspondente ao componente/serviço que deseja testar. Ex.: `src/app/app.spec.ts`.
-   Teste componentes com `TestBed` e serviços com spies/mocks para dependências externas (HTTP, etc.).

Sugestões

-   Comece escrevendo testes para a camada de serviço (`PessoaService`) — cubra casos de sucesso e falha HTTP.
-   Para componentes, escreva testes de interação: preenchimento de formulário, submissão, e re-renderização da lista.

Integração contínua

-   Para adicionar CI, execute `npm test` em um job no seu pipeline (GitHub Actions, GitLab CI, Azure Pipelines, etc.).
