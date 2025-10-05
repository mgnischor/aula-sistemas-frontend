# Aula - Sistemas Distribuídos — Frontend

Este repositório contém o frontend para as atividades da disciplina "Sistemas Distribuídos". É uma aplicação Angular (v20) leve criada como apoio às aulas e exercícios práticos.

Principais objetivos:

-   Servir de base para demonstrações em aula.
-   Exemplificar organização de projeto Angular com componentes simples (cadastro/lista de pessoas).
-   Fornecer exercícios de integração com serviços e backend (quando disponível).

Arquivos de documentação estão em `docs/` e explicam como configurar, executar, testar e contribuir.

## Status

Em desenvolvimento — código-base mínimo com componentes de exemplo.

## Requisitos

-   Node.js (recomendado v20+)
-   npm ou PNPM instalado
-   Angular CLI compatível (opcional, a CLI também é usada via scripts npm)

## Scripts úteis (npm)

-   `npm start` — inicia o servidor de desenvolvimento (ng serve).
-   `npm run build:production` — build otimizado para produção.
-   `npm run build:development` — build para desenvolvimento.
-   `npm run watch` — build em modo watch para desenvolvimento.
-   `npm test` — executa os testes.

## Estrutura do repositório (resumo)

Principais pastas e arquivos:

-   `src/app/` — código-fonte Angular da aplicação.
    -   `components/` — componentes da UI (ex.: `pessoa-cadastro`, `pessoa-lista`).
    -   `services/` — serviços (ex.: `pessoa.service.ts`).
    -   `models/` — modelos/DTOs (ex.: `pessoa.model.ts`).
-   `src/index.html`, `src/main.ts`, `src/styles.scss` — ponto de entrada e estilos.
-   `angular.json`, `package.json`, `tsconfig.json` — configuração do projeto.

Para documentação detalhada de uso, contribuição, arquitetura e testes veja a pasta `docs/`.

## Licença

O repositório não define uma licença explícita. Se você pretende publicar ou colaborar, adicione uma `LICENSE` adequada (por exemplo MIT) ou peça instruções ao proprietário.

---

Arquivos adicionados/atualizados:

-   `README.md` — documentação principal (este arquivo).
-   `docs/SETUP.md` — instruções de ambiente e execução.
-   `docs/USAGE.md` — como usar a aplicação e exemplos de fluxo.
-   `docs/ARCHITECTURE.md` — visão geral da arquitetura e do layout do código.
-   `docs/TESTING.md` — como executar e escrever testes.
-   `docs/CONTRIBUTING.md` — orientações para contribuir.
