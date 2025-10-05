# GitHub Actions Workflows

Este documento descreve os workflows do GitHub Actions configurados neste projeto para CI/CD.

## Workflows Disponíveis

### 1. CI - Build & Test (`ci.yml`)

**Trigger**: Push ou Pull Request nas branches `main` e `develop`

**Propósito**: Validação contínua do código

**Etapas**:

-   Executa em múltiplas versões do Node.js (20.x e 22.x)
-   Instala dependências com `npm ci`
-   Executa testes unitários com Karma/Jasmine
-   Build de desenvolvimento
-   Build de produção
-   Upload dos artefatos de build (disponíveis por 7 dias)
-   Job adicional para análise de cobertura de código

**Como usar**:

-   O workflow é executado automaticamente a cada push ou PR
-   Verifique o status na aba "Actions" do GitHub
-   Artefatos de build podem ser baixados na página do workflow

### 2. Release - Build & Deploy (`release.yml`)

**Trigger**: Push de tags no formato `v*.*.*` (ex: v1.0.0, v2.1.3)

**Propósito**: Criar releases oficiais do projeto

**Etapas**:

-   Executa testes completos
-   Build de produção otimizado
-   Cria tarball compactado dos artefatos
-   Gera changelog automático baseado nos commits
-   Cria GitHub Release com notas e arquivos
-   Upload de artefatos (disponíveis por 90 dias)
-   (Opcional) Deploy para GitHub Pages

**Como criar um release**:

```bash
# 1. Garanta que está na branch main/develop atualizada
git checkout main
git pull origin main

# 2. Crie e envie a tag
git tag v1.0.0
git push origin v1.0.0

# Ou crie uma tag anotada com mensagem
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**Tipos de release**:

-   Tags com `alpha`, `beta` ou `rc` são marcadas como pre-release
-   Outras tags são releases estáveis

### 3. Preview - PR Build (`preview.yml`)

**Trigger**: Abertura, sincronização ou reabertura de Pull Requests

**Propósito**: Build de preview para validação de PRs

**Etapas**:

-   Build completo para cada PR
-   Executa testes
-   Comenta no PR com status do build
-   Upload de artefatos de preview (disponíveis por 5 dias)

**Como usar**:

-   Abra um Pull Request normalmente
-   O workflow executará automaticamente
-   Um comentário será adicionado ao PR com o status
-   Artefatos podem ser baixados para testes locais

## Configuração Adicional

### Habilitar GitHub Pages (Opcional)

Para deploy automático no GitHub Pages a cada release:

1. Vá em **Settings** > **Pages** no repositório
2. Em **Source**, selecione "GitHub Actions"
3. No arquivo `.github/workflows/release.yml`, descomente as linhas do job `deploy-to-pages`:
    - Seção `permissions`
    - Steps de Setup Pages, Upload e Deploy

### Variáveis de Ambiente e Secrets

Os workflows utilizam:

-   `GITHUB_TOKEN`: Fornecido automaticamente pelo GitHub Actions
-   Nenhum secret adicional é necessário para funcionalidade básica

Se você adicionar deploy para serviços externos (Netlify, Vercel, AWS, etc.), adicione os secrets necessários em **Settings** > **Secrets and variables** > **Actions**.

## Status dos Workflows

Adicione badges ao README.md para mostrar o status dos workflows:

```markdown
![CI](https://github.com/mgnischor/aula-sistemas-frontend/actions/workflows/ci.yml/badge.svg)
![Release](https://github.com/mgnischor/aula-sistemas-frontend/actions/workflows/release.yml/badge.svg)
```

## Troubleshooting

### Testes falhando no CI

Se os testes passam localmente mas falham no CI:

-   Verifique se todas as dependências estão no `package.json`
-   Use `npm ci` em vez de `npm install` localmente para reproduzir o ambiente
-   Verifique logs de execução na aba Actions

### Build falhando por memória

Se o build falhar por falta de memória:

-   Adicione `NODE_OPTIONS: --max_old_space_size=4096` nas variáveis de ambiente do job

### Permissões de release

Se o workflow de release falhar por permissões:

-   Verifique em **Settings** > **Actions** > **General**
-   Em "Workflow permissions", marque "Read and write permissions"

## Customização

### Adicionar deploy para outros serviços

Exemplo de step para deploy no Netlify:

```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  with:
      args: deploy --prod --dir=dist
  env:
      NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
      NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Modificar estratégia de testes

Para executar testes em paralelo ou com diferentes configurações, ajuste a `matrix` no `ci.yml`.

## Boas Práticas

1. **Commits**: Use mensagens descritivas para gerar changelogs melhores
2. **Tags**: Siga semantic versioning (MAJOR.MINOR.PATCH)
3. **Branches**: Use `main` para produção, `develop` para desenvolvimento
4. **Pull Requests**: Sempre crie PRs para mudanças importantes
5. **Testes**: Garanta que os testes passam antes de fazer merge

## Recursos Adicionais

-   [Documentação GitHub Actions](https://docs.github.com/en/actions)
-   [Semantic Versioning](https://semver.org/)
-   [Conventional Commits](https://www.conventionalcommits.org/)
