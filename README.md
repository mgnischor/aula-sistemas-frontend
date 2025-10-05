# Aula - Sistemas Distribuídos — Frontend

![CI](https://github.com/mgnischor/aula-sistemas-frontend/actions/workflows/ci.yml/badge.svg)
![Release](https://github.com/mgnischor/aula-sistemas-frontend/actions/workflows/release.yml/badge.svg)

Este repositório contém o frontend para as atividades da disciplina "Sistemas Distribuídos". É uma aplicação Angular (v20) leve criada como apoio às aulas e exercícios práticos.

Principais objetivos:

-   Servir de base para demonstrações em aula.
-   Exemplificar organização de projeto Angular com componentes simples (cadastro/lista de pessoas).
-   Fornecer exercícios de integração com serviços e backend (quando disponível).

Arquivos de documentação estão em `docs/` e explicam como configurar, executar, testar e contribuir.

## Status

Em desenvolvimento — código-base mínimo com componentes de exemplo.

## CI/CD

Este projeto utiliza GitHub Actions para automação:

-   **CI**: Build e testes automáticos em cada push/PR
-   **Release**: Criação automática de releases ao criar tags (`v*.*.*`)
-   **Preview**: Build de preview para Pull Requests

📖 Veja [docs/WORKFLOWS.md](docs/WORKFLOWS.md) para detalhes sobre os workflows.

🚀 **Primeiro uso?** Siga o [Guia de Início Rápido](docs/GETTING-STARTED-CI-CD.md) para configurar e testar os workflows.

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

## Documentação

### Desenvolvimento

-   [`docs/SETUP.md`](docs/SETUP.md) — instruções de ambiente e execução.
-   [`docs/USAGE.md`](docs/USAGE.md) — como usar a aplicação e exemplos de fluxo.
-   [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — visão geral da arquitetura e do layout do código.
-   [`docs/TESTING.md`](docs/TESTING.md) — como executar e escrever testes.

### CI/CD

-   [`docs/GETTING-STARTED-CI-CD.md`](docs/GETTING-STARTED-CI-CD.md) — 🚀 guia de primeiro uso (comece aqui!).
-   [`docs/WORKFLOWS.md`](docs/WORKFLOWS.md) — workflows do GitHub Actions (CI/CD).
-   [`docs/RELEASE.md`](docs/RELEASE.md) — guia rápido para criar releases.
-   [`docs/CI-CD-SUMMARY.md`](docs/CI-CD-SUMMARY.md) — resumo da infraestrutura CI/CD.
-   [`docs/CI-CD-FLOW.md`](docs/CI-CD-FLOW.md) — diagramas visuais dos fluxos.

### Colaboração

-   [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — orientações para contribuir.
