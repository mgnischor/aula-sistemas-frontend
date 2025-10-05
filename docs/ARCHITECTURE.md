# Arquitetura

Visão geral da organização do projeto e principais decisões arquiteturais.

Stack

-   Framework: Angular 20
-   Linguagem: TypeScript

Organização do código

-   `src/app/` — raiz da aplicação Angular
    -   `components/` — componentes reutilizáveis e de página
        -   `pessoa-cadastro/` — componente de formulário de cadastro
        -   `pessoa-lista/` — componente de listagem
    -   `services/` — serviços para comunicação (HTTP, lógica de negócio)
    -   `models/` — modelos/DTOs usados pela aplicação

Padrões e convenções

-   Componentes focados em UI; lógica compartilhada deve ficar em serviços.
-   Serviços retornam Observables (RxJS) para se integrarem bem com o ecossistema Angular.
-   Tipagem em TypeScript para todos os modelos.

Backend e integração

-   A aplicação foi projetada para se comunicar com um backend REST. O `PessoaService` é o exemplo de adaptação entre a API e os componentes.

Testes

-   Testes unitários com Jasmine/Karma (configurados no projeto). Preferir testes unitários para serviços e componentes isolados.

Evolução sugerida

-   Adicionar estado centralizado (NgRx ou similar) se a aplicação crescer.
-   Implementar e documentar contratos de API (OpenAPI) para facilitar integração com servidores.
