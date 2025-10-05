# 🚀 Guia de Primeiro Uso - CI/CD

Este documento guia você pelos primeiros passos após a configuração dos workflows de CI/CD.

## ✅ Pré-requisitos

Antes de começar, certifique-se de que:

-   [x] Todos os arquivos de workflow foram commitados
-   [x] O repositório está no GitHub
-   [x] Você tem permissões de administrador no repositório

## 🔧 Configuração Inicial

### Passo 1: Configurar Permissões do GitHub Actions

1. Acesse: `https://github.com/mgnischor/aula-sistemas-frontend/settings/actions`

2. Na seção **Workflow permissions**:
    - ✅ Selecione: **"Read and write permissions"**
    - ✅ Marque: **"Allow GitHub Actions to create and approve pull requests"**
    - Clique em **Save**

![Exemplo de configuração](https://docs.github.com/assets/cb-45061/images/help/settings/actions-workflow-permissions-repository.png)

### Passo 2: Verificar os Workflows

1. Vá para a aba **Actions**: `https://github.com/mgnischor/aula-sistemas-frontend/actions`

2. Você deve ver 3 workflows listados:

    - ✅ CI - Build & Test
    - ✅ Release - Build & Deploy
    - ✅ Preview - PR Build

3. Se não aparecerem, faça um commit para ativá-los:
    ```bash
    git add .github/
    git commit -m "chore: add GitHub Actions workflows"
    git push origin main
    ```

## 🧪 Teste 1: Workflow CI

Vamos testar o workflow de CI com um simples push.

```bash
# 1. Crie uma branch de teste
git checkout -b test/ci-workflow

# 2. Faça uma alteração simples (ex: no README)
echo "" >> README.md

# 3. Commit e push
git add README.md
git commit -m "test: trigger CI workflow"
git push origin test/ci-workflow
```

### O que esperar:

1. Vá para **Actions** no GitHub
2. Você verá o workflow **CI - Build & Test** executando
3. Aguarde a conclusão (leva ~5-10 minutos)
4. Deve aparecer ✅ verde quando concluir

### Verificar artefatos:

1. Clique no workflow concluído
2. Role até o final da página
3. Você verá os **artifacts** disponíveis para download:
    - `dist-20.x`
    - `dist-22.x`
    - `coverage-report`

## 🔀 Teste 2: Workflow Preview (Pull Request)

```bash
# 1. Usando a branch de teste anterior, abra um PR
# No GitHub: https://github.com/mgnischor/aula-sistemas-frontend/compare
# Selecione: base: main <- compare: test/ci-workflow
# Clique em "Create pull request"
```

### O que esperar:

1. Ambos workflows executarão: **CI** e **Preview**
2. Após alguns minutos, um comentário será adicionado automaticamente ao PR
3. O comentário incluirá:
    - ✅ Status do build
    - 📦 Informações sobre artefatos
    - Link para download

### Verificar:

-   ✅ Comentário automático no PR
-   ✅ Checks passando na parte inferior do PR
-   ✅ Artefatos disponíveis no workflow

```bash
# Limpe a branch de teste
git checkout main
git branch -D test/ci-workflow
git push origin --delete test/ci-workflow
```

## 🎉 Teste 3: Criar Primeiro Release

Agora vamos criar o primeiro release oficial do projeto.

### Preparação:

```bash
# 1. Certifique-se de estar na main atualizada
git checkout main
git pull origin main

# 2. Atualize a versão no package.json (se necessário)
# O projeto está em version "0.0.0", vamos para "1.0.0"
npm version 1.0.0 -m "chore: release v1.0.0 - initial release"

# Isso criará:
# - Commit com a versão atualizada
# - Tag v1.0.0
```

### Publicar:

```bash
# 3. Push do commit e da tag
git push origin main
git push origin v1.0.0
```

### O que esperar:

1. Vá para **Actions** > **Release - Build & Deploy**
2. Você verá o workflow executando para a tag `v1.0.0`
3. Aguarde conclusão (~5-10 minutos)
4. Vá para **Releases**: `https://github.com/mgnischor/aula-sistemas-frontend/releases`

### Verificar a Release:

Você deve ver:

-   ✅ Release **v1.0.0** criada
-   📦 Arquivo: `aula-sistemas-frontend-v1.0.0.tar.gz`
-   📝 Changelog gerado automaticamente
-   📋 Release notes do GitHub

### Baixar e testar a release:

```bash
# Em um diretório temporário
mkdir test-release
cd test-release

# Baixe a release
curl -L -o release.tar.gz \
  https://github.com/mgnischor/aula-sistemas-frontend/releases/download/v1.0.0/aula-sistemas-frontend-v1.0.0.tar.gz

# Extraia
tar -xzf release.tar.gz

# Liste os arquivos
ls -la

# (Opcional) Sirva localmente
# npx http-server . -p 8080
```

## 📊 Verificação Final

Execute este checklist para garantir que tudo está funcionando:

### Workflows

-   [ ] CI workflow executa em push para main
-   [ ] CI workflow executa em push para develop
-   [ ] CI workflow executa em pull requests
-   [ ] Preview workflow comenta em PRs
-   [ ] Release workflow executa ao criar tags
-   [ ] Artefatos são gerados e disponibilizados

### Badges

-   [ ] Badge do CI aparece no README
-   [ ] Badge do Release aparece no README
-   [ ] Badges mostram status correto (verde/vermelho)

### Releases

-   [ ] Release v1.0.0 foi criada com sucesso
-   [ ] Tarball está disponível para download
-   [ ] Changelog foi gerado
-   [ ] Artefatos estão presentes

### Templates

-   [ ] Template de bug report aparece ao criar issue
-   [ ] Template de feature request aparece ao criar issue
-   [ ] Template de PR aparece ao criar pull request

## 🎯 Próximas Ações

Após a configuração inicial, você pode:

### 1. Personalizar Workflows

Edite os arquivos em `.github/workflows/` para:

-   Adicionar mais versões do Node.js
-   Incluir lint checks
-   Configurar deploy automático
-   Adicionar notificações

### 2. Integrar Ferramentas Externas

Adicione ao workflow:

-   Codecov para cobertura
-   SonarQube para qualidade de código
-   Dependabot para dependências
-   Slack/Discord para notificações

### 3. Configurar GitHub Pages (Opcional)

Para servir a aplicação via GitHub Pages:

1. Vá em **Settings** > **Pages**
2. Source: "GitHub Actions"
3. Descomente as seções de Pages em `release.yml`:
    ```yaml
    # Remova os comentários de:
    # permissions:
    #   pages: write
    # E dos steps de deploy
    ```

### 4. Criar Pre-releases

Para versões beta/alpha:

```bash
npm version 1.1.0-beta.1
git push origin main --tags
```

## 🆘 Troubleshooting

### Workflow não executa

**Problema**: Push/tag feito mas workflow não iniciou

**Soluções**:

1. Verifique que os arquivos `.github/workflows/*.yml` estão na branch main
2. Confirme que Actions está habilitado: Settings > Actions
3. Veja se há erros de sintaxe nos arquivos YAML

### Permissões negadas

**Problema**: Workflow falha com erro de permissão

**Soluções**:

1. Configure "Read and write permissions" (Passo 1 acima)
2. Verifique a seção `permissions:` nos workflows

### Testes falhando

**Problema**: Testes passam localmente mas falham no CI

**Soluções**:

1. Execute `npm ci` localmente em vez de `npm install`
2. Verifique versão do Node.js: `node -v`
3. Revise os logs completos no GitHub Actions
4. Adicione `--verbose` aos comandos de teste

### Release não criada

**Problema**: Tag enviada mas release não foi criada

**Soluções**:

1. Verifique se a tag segue o padrão `v*.*.*`
2. Confirme que o workflow de release executou
3. Veja os logs do workflow para erros
4. Verifique permissões (passo 1)

## 📚 Documentação de Referência

-   [docs/WORKFLOWS.md](WORKFLOWS.md) - Detalhes técnicos dos workflows
-   [docs/RELEASE.md](RELEASE.md) - Guia completo de releases
-   [docs/CI-CD-SUMMARY.md](CI-CD-SUMMARY.md) - Resumo da infraestrutura
-   [docs/CI-CD-FLOW.md](CI-CD-FLOW.md) - Diagramas visuais

## ✨ Conclusão

Parabéns! 🎉 Seu projeto agora tem CI/CD completo configurado.

Todos os pushes e PRs serão automaticamente:

-   ✅ Testados
-   🏗️ Construídos
-   📦 Empacotados
-   🚀 Prontos para deploy

Releases são automatizadas e profissionais, com:

-   📝 Changelog automático
-   📦 Artefatos prontos
-   🏷️ Versionamento semântico

Continue desenvolvendo com confiança! 💪

---

**Criado em**: Outubro 2025  
**Versão**: 1.0  
**Próxima revisão**: Após primeiro release
