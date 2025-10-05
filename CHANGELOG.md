# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado

-   Infraestrutura completa de CI/CD com GitHub Actions
-   Workflows: CI, Release e Preview
-   Documentação completa em `docs/`
-   Templates para issues e pull requests
-   Badges de status no README
-   Guias de configuração e uso

### Mudado

-   README.md atualizado com informações de CI/CD

## [1.0.0] - 2025-10-04 (Planejado)

### Adicionado

-   Projeto Angular 20 inicial
-   Componentes de exemplo: `pessoa-cadastro` e `pessoa-lista`
-   Serviço `PessoaService` para gerenciamento de dados
-   Modelo `Pessoa` com tipagem TypeScript
-   Configuração de testes com Jasmine/Karma
-   Scripts npm para build e desenvolvimento

### Infraestrutura

-   Workflow CI para testes e builds automáticos
-   Workflow Release para criação automática de releases
-   Workflow Preview para builds de Pull Requests
-   Templates para issues (bug report, feature request)
-   Template para Pull Requests
-   Documentação completa em Markdown

## Tipos de Mudanças

-   `Added` (Adicionado): para novas funcionalidades
-   `Changed` (Mudado): para mudanças em funcionalidades existentes
-   `Deprecated` (Descontinuado): para funcionalidades que serão removidas
-   `Removed` (Removido): para funcionalidades removidas
-   `Fixed` (Corrigido): para correções de bugs
-   `Security` (Segurança): para vulnerabilidades corrigidas

## Como Manter

### Ao adicionar uma feature

```markdown
### Adicionado

-   Nova funcionalidade X que permite Y
```

### Ao corrigir um bug

```markdown
### Corrigido

-   Bug Z que causava problema W (#issue-number)
```

### Ao fazer uma release

1. Mova itens de `[Unreleased]` para nova seção com versão
2. Adicione data da release
3. Atualize links no final do arquivo
4. Commit: `chore: update CHANGELOG for vX.Y.Z`

## Links

[Unreleased]: https://github.com/mgnischor/aula-sistemas-frontend/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mgnischor/aula-sistemas-frontend/releases/tag/v1.0.0
