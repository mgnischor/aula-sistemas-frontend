# Guia Rápido de Release

Este guia explica como criar releases do projeto usando os workflows do GitHub Actions.

## Pré-requisitos

-   Acesso de push ao repositório
-   Git configurado localmente
-   Branch `main` atualizada

## Processo de Release

### 1. Prepare o código

Garanta que todas as alterações estão commitadas e a branch principal está atualizada:

```bash
git checkout main
git pull origin main
```

### 2. Atualize a versão (opcional)

Se quiser atualizar o `package.json` com a nova versão:

```bash
# Atualiza automaticamente package.json e cria commit
npm version patch  # Para 1.0.0 -> 1.0.1
npm version minor  # Para 1.0.0 -> 1.1.0
npm version major  # Para 1.0.0 -> 2.0.0

# Ou manualmente especifique a versão
npm version 1.2.3
```

> **Nota**: O comando `npm version` cria automaticamente um commit e uma tag git.

### 3. Crie a tag manualmente (alternativa)

Se preferir criar a tag manualmente sem usar `npm version`:

```bash
# Tag simples
git tag v1.0.0

# Tag anotada (recomendado)
git tag -a v1.0.0 -m "Release version 1.0.0 - Descrição das mudanças"
```

### 4. Envie a tag para o GitHub

```bash
# Envia a tag específica
git push origin v1.0.0

# Ou envia todas as tags
git push origin --tags
```

### 5. Aguarde o workflow

-   O workflow `release.yml` será executado automaticamente
-   Acesse **Actions** no GitHub para acompanhar o progresso
-   Quando concluído, a release estará disponível em **Releases**

## Tipos de Versão

### Semantic Versioning (MAJOR.MINOR.PATCH)

-   **MAJOR** (v2.0.0): Mudanças incompatíveis com versões anteriores
-   **MINOR** (v1.1.0): Novas funcionalidades compatíveis
-   **PATCH** (v1.0.1): Correções de bugs

### Pre-releases

Para versões de teste:

```bash
git tag -a v1.0.0-alpha.1 -m "Alpha release for testing"
git tag -a v1.0.0-beta.1 -m "Beta release for testing"
git tag -a v1.0.0-rc.1 -m "Release candidate"
```

Tags com `alpha`, `beta` ou `rc` são automaticamente marcadas como pre-release.

## Exemplo Completo

```bash
# 1. Atualize sua branch
git checkout main
git pull origin main

# 2. Crie changelog ou notas de release localmente (opcional)
# Edite CHANGELOG.md se você mantém um

# 3. Use npm version para incrementar e criar tag
npm version minor -m "Release v%s - Nova funcionalidade de cadastro"

# 4. Envie commits e tags
git push origin main
git push origin --tags

# 5. Verifique o workflow no GitHub
# https://github.com/mgnischor/aula-sistemas-frontend/actions
```

## O que acontece no workflow de Release?

1. ✅ Executa todos os testes
2. 🏗️ Build de produção
3. 📦 Cria tarball compactado
4. 📝 Gera changelog automático dos commits
5. 🚀 Cria GitHub Release
6. 📤 Upload de artefatos

## Conteúdo da Release

Cada release incluirá:

-   **Tarball**: `aula-sistemas-frontend-vX.Y.Z.tar.gz` (build compilado)
-   **Changelog**: Gerado automaticamente dos commits
-   **Artefatos**: Build completo disponível para download
-   **Release notes**: Gerado pelo GitHub com base nos PRs merged

## Verificando uma Release

Após a release ser criada:

1. Vá para **Releases** no GitHub
2. A release deve estar listada com a tag
3. Baixe o tarball para testar:

```bash
# Baixe o tarball
wget https://github.com/mgnischor/aula-sistemas-frontend/releases/download/v1.0.0/aula-sistemas-frontend-v1.0.0.tar.gz

# Extraia
tar -xzf aula-sistemas-frontend-v1.0.0.tar.gz

# Sirva localmente para testar (exemplo com Python)
cd dist
python -m http.server 8080
```

## Corrigindo Erros

### Tag criada por engano

```bash
# Deletar tag local
git tag -d v1.0.0

# Deletar tag remota
git push origin :refs/tags/v1.0.0
```

### Release com problemas

1. Delete a release no GitHub (interface web)
2. Delete a tag (comandos acima)
3. Corrija o problema
4. Crie nova tag e release

## Boas Práticas

1. ✅ Sempre teste localmente antes de criar release
2. ✅ Use mensagens descritivas nos commits para changelog
3. ✅ Siga semantic versioning
4. ✅ Documente breaking changes no changelog
5. ✅ Revise a release no GitHub antes de publicar (se usar draft)
6. ✅ Comunique releases importantes à equipe

## Automação Adicional

Para automatizar ainda mais, você pode:

-   Usar Conventional Commits para gerar changelogs automáticos
-   Integrar com ferramentas como `standard-version` ou `semantic-release`
-   Adicionar notificações (Slack, Discord) no workflow

## Troubleshooting

### "Permission denied" ao criar release

-   Verifique **Settings** > **Actions** > **General**
-   Marque "Read and write permissions" em Workflow permissions

### Workflow não executa

-   Certifique-se que a tag segue o padrão `v*.*.*`
-   Verifique que o arquivo `release.yml` está em `.github/workflows/`

### Build falha no CI mas funciona localmente

-   Use `npm ci` em vez de `npm install` localmente
-   Verifique versão do Node.js
-   Revise os logs do workflow

## Recursos

-   [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)
-   [Semantic Versioning](https://semver.org/)
-   [Keep a Changelog](https://keepachangelog.com/)
