# Setup

Passos para configurar o ambiente de desenvolvimento localmente.

Pré-requisitos

-   Node.js (recomendado v20+)
-   npm (ou pnpm) instalado
-   Git (para clonar o repositório)
-   (Opcional) Angular CLI: `npm i -g @angular/cli`

Clonando e instalando dependências

1. Clone o repositório:

    git clone <repo-url>
    cd aula-sistemas-frontend

2. Instale dependências com npm:

    npm install

    Se preferir pnpm:

    pnpm install

Executando a aplicação

-   Inicie o servidor de desenvolvimento com:

    npm start

-   A aplicação será servida por padrão em `http://localhost:4200`.

Build

-   Build para desenvolvimento:

    npm run build:development

-   Build para produção:

    npm run build:production

Observações

-   Se você não tiver a CLI instalada globalmente, os scripts npm usam a CLI presente nas dependências do projeto.
-   Caso a porta 4200 já esteja em uso, passe `--port` ao `ng serve` via `package.json` ou execute manualmente com `npx ng serve --port 4300`.
