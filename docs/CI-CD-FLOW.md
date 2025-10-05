# Fluxo de CI/CD - Diagrama Visual

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────────────────┐
│                     DESENVOLVIMENTO                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Criar Feature   │
                    │  Branch          │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Fazer Commits   │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Push to GitHub  │
                    └──────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        ▼                                           ▼
┌──────────────┐                            ┌──────────────┐
│ CI Workflow  │                            │   Abrir PR   │
│ (ci.yml)     │                            │              │
└──────────────┘                            └──────────────┘
        │                                           │
        │  • npm ci                                 │
        │  • npm test                               ▼
        │  • build:dev                      ┌──────────────┐
        │  • build:prod                     │   Preview    │
        │  • upload artifacts               │  Workflow    │
        │                                   │ (preview.yml)│
        ▼                                   └──────────────┘
┌──────────────┐                                   │
│  ✅ Success  │                                   │
│  ❌ Failure  │                                   │  • Build PR
└──────────────┘                                   │  • Comment PR
                                                   │  • Upload preview
                                                   │
                                                   ▼
                                           ┌──────────────┐
                                           │   Review &   │
                                           │   Approve    │
                                           └──────────────┘
                                                   │
                                                   ▼
                                           ┌──────────────┐
                                           │  Merge to    │
                                           │     main     │
                                           └──────────────┘
                                                   │
┌─────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────────────────┐
│                          RELEASE                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  npm version     │
                    │  (ou git tag)    │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Push tag        │
                    │  (v1.0.0)        │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Release         │
                    │  Workflow        │
                    │ (release.yml)    │
                    └──────────────────┘
                              │
                              │  • Run tests
                              │  • Build production
                              │  • Create tarball
                              │  • Generate changelog
                              │  • Create GitHub Release
                              │  • Upload artifacts
                              │  • (Optional) Deploy
                              │
                              ▼
                    ┌──────────────────┐
                    │  📦 Release      │
                    │     Created      │
                    └──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  🚀 Available    │
                    │  for Download    │
                    └──────────────────┘
```

## 📋 Gatilhos dos Workflows

### CI Workflow (ci.yml)

```
Trigger: push | pull_request
Branches: main, develop

Event Flow:
  push/PR → Install deps → Run tests → Build dev → Build prod → Upload artifacts
```

### Preview Workflow (preview.yml)

```
Trigger: pull_request
Types: opened, synchronize, reopened

Event Flow:
  Open PR → Install deps → Run tests → Build prod → Comment PR → Upload preview
```

### Release Workflow (release.yml)

```
Trigger: push
Tags: v*.*.*

Event Flow:
  Push tag → Test → Build → Package → Changelog → Create Release → Upload
```

## 🎯 Decisão de Fluxo

```
                    Novo Código
                        │
                        ▼
              ┌─────────────────┐
              │ Tipo de Change? │
              └─────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   ┌────────┐     ┌────────┐     ┌────────┐
   │  Bug   │     │Feature │     │Hotfix  │
   │  Fix   │     │        │     │        │
   └────────┘     └────────┘     └────────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
              ┌─────────────────┐
              │ Create Branch   │
              │ feat/*, fix/*   │
              └─────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  Develop &      │
              │  Commit         │
              └─────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  Push & Open PR │
              └─────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │ CI + Preview    │
              │ Workflows Run   │
              └─────────────────┘
                        │
                ┌───────┴───────┐
                ▼               ▼
          ┌─────────┐     ┌─────────┐
          │ ✅ Pass │     │ ❌ Fail │
          └─────────┘     └─────────┘
                │               │
                │               ▼
                │         ┌─────────┐
                │         │  Fix &  │
                │         │Re-Push  │
                │         └─────────┘
                │               │
                └───────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Code Review     │
              └─────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Approve & Merge │
              └─────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Ready for       │
              │ Release?        │
              └─────────────────┘
                        │
                ┌───────┴───────┐
                ▼               ▼
              [Yes]           [No]
                │               │
                │               └──► Continue Development
                │
                ▼
      ┌─────────────────┐
      │ Create Tag      │
      │ (v1.0.0)        │
      └─────────────────┘
                │
                ▼
      ┌─────────────────┐
      │ Release         │
      │ Workflow        │
      └─────────────────┘
                │
                ▼
      ┌─────────────────┐
      │ 📦 Published    │
      └─────────────────┘
```

## 🔀 Estratégia de Branching

```
main (produção)
  │
  ├── v1.0.0 (tag/release)
  │
  ├── v1.1.0 (tag/release)
  │
  └── develop (desenvolvimento)
        │
        ├── feat/nova-funcionalidade
        │
        ├── fix/correcao-bug
        │
        └── refactor/melhoria-codigo
```

## ⚙️ Jobs e Steps

### CI Workflow

```
Job: build-and-test
  ├── Checkout code
  ├── Setup Node.js (20.x, 22.x)
  ├── Install dependencies
  ├── Lint check
  ├── Run tests
  ├── Build development
  ├── Build production
  └── Upload artifacts

Job: code-coverage
  ├── Checkout code
  ├── Setup Node.js
  ├── Install dependencies
  ├── Run tests with coverage
  └── Upload coverage reports
```

### Release Workflow

```
Job: create-release
  ├── Checkout code
  ├── Setup Node.js
  ├── Install dependencies
  ├── Run tests
  ├── Build production
  ├── Create tarball
  ├── Generate changelog
  ├── Create GitHub Release
  └── Upload artifacts

Job: deploy-to-pages (optional)
  ├── Checkout code
  ├── Setup Node.js
  ├── Install dependencies
  ├── Build production
  └── Deploy to GitHub Pages
```

### Preview Workflow

```
Job: pr-preview
  ├── Checkout code
  ├── Setup Node.js
  ├── Install dependencies
  ├── Run tests
  ├── Build production
  ├── Comment PR with status
  └── Upload preview build
```

## 📊 Matriz de Execução

| Evento       | Workflow     | Node.js | Testes | Build Dev | Build Prod | Artefatos |
| ------------ | ------------ | ------- | ------ | --------- | ---------- | --------- |
| Push main    | CI           | 20, 22  | ✅     | ✅        | ✅         | 7 dias    |
| Push develop | CI           | 20, 22  | ✅     | ✅        | ✅         | 7 dias    |
| Open PR      | CI + Preview | 20, 22  | ✅     | ✅        | ✅         | 5 dias    |
| Push tag     | Release      | 20      | ✅     | ❌        | ✅         | 90 dias   |

## 🎨 Estados do Workflow

```
⏳ Queued    → Workflow aguardando execução
🔄 Running   → Workflow em execução
✅ Success   → Workflow concluído com sucesso
❌ Failure   → Workflow falhou
⚠️  Cancelled → Workflow cancelado pelo usuário
⏭️  Skipped   → Job pulado por condição
```

## 🔐 Permissões Necessárias

```
GITHUB_TOKEN Permissions:
  ├── contents: write       (para criar releases)
  ├── pull-requests: write  (para comentar em PRs)
  ├── issues: write         (para gerenciar issues)
  └── pages: write          (para deploy GitHub Pages)
```

## 📈 Métricas e Monitoramento

```
Visualização de Status:
  │
  ├── README Badges
  │   ├── CI Status
  │   └── Release Status
  │
  ├── GitHub Actions Tab
  │   ├── Workflow Runs
  │   ├── Job Logs
  │   └── Artifacts
  │
  └── GitHub Releases
      ├── Release Notes
      ├── Download Stats
      └── Assets
```

---

Este diagrama fornece uma visão visual completa do fluxo de CI/CD implementado no projeto.
