# Guia Rápido de Release

Este guia explica como criar releases do projeto usando os workflows do GitHub Actions.

## 📦 O que é incluído no Release

Cada release inclui automaticamente:

### Arquivos de Build

-   **`aula-sistemas-frontend-vX.Y.Z.tar.gz`** - Build compactado (Linux/Mac)
-   **`aula-sistemas-frontend-vX.Y.Z.zip`** - Build compactado (Windows)
-   **`3rdpartylicenses.txt`** - Licenças de dependências
-   **`prerendered-routes.json`** - Rotas pré-renderizadas

### Informações da Release

-   ✅ Tamanho do build
-   ✅ Número de arquivos
-   ✅ Versão do Angular
-   ✅ Data do build
-   ✅ Changelog automático
-   ✅ Instruções de deploy

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

### 6. Verifique a Release

Quando o workflow concluir, a release incluirá:

```
📦 Release v1.0.0
├── 📄 aula-sistemas-frontend-v1.0.0.tar.gz (build completo - Linux/Mac)
├── 📄 aula-sistemas-frontend-v1.0.0.zip (build completo - Windows)
├── 📄 3rdpartylicenses.txt (licenças de dependências)
├── 📄 prerendered-routes.json (rotas pré-renderizadas)
└── 📝 Release notes com:
    ├── Tamanho do build
    ├── Número de arquivos
    ├── Changelog automático
    └── Instruções de deploy
```

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

1. ✅ Executa todos os testes unitários
2. 🏗️ Build de produção otimizado
3. � Coleta informações do build (tamanho, arquivos)
4. 📦 Cria múltiplos formatos:
    - `.tar.gz` para Linux/Mac
    - `.zip` para Windows
5. 📝 Gera changelog automático dos commits
6. � Copia arquivos adicionais (licenças, rotas)
7. �🚀 Cria GitHub Release com todos os artefatos
8. 📤 Upload automático de todos os arquivos

## Como usar os arquivos da Release

### Download e Deploy

**Linux/Mac:**

```bash
# Baixar
wget https://github.com/mgnischor/aula-sistemas-frontend/releases/download/v1.0.0/aula-sistemas-frontend-v1.0.0.tar.gz

# Extrair
tar -xzf aula-sistemas-frontend-v1.0.0.tar.gz

# Deploy em servidor web
sudo cp -r * /var/www/html/

# Ou servir localmente
python -m http.server 8080
# Acesse: http://localhost:8080
```

**Windows:**

```powershell
# Baixar o arquivo .zip do GitHub Releases

# Extrair
Expand-Archive -Path aula-sistemas-frontend-v1.0.0.zip -DestinationPath C:\inetpub\wwwroot\

# Ou servir localmente com Node.js
npx http-server . -p 8080
# Acesse: http://localhost:8080
```

### Opções de Servidor Web

**Apache:**

```bash
# Copiar para diretório do Apache
sudo cp -r * /var/www/html/myapp/
sudo systemctl reload apache2
```

**Nginx:**

```bash
# Copiar para diretório do Nginx
sudo cp -r * /usr/share/nginx/html/myapp/
sudo nginx -s reload
```

**Docker:**

```dockerfile
FROM nginx:alpine
COPY aula-sistemas-frontend-v1.0.0/ /usr/share/nginx/html/
EXPOSE 80
```

### Verificação da Release

Após deploy, verifique:

1. ✅ Todos os arquivos foram extraídos
2. ✅ `index.html` está acessível
3. ✅ Assets (JS, CSS) estão carregando
4. ✅ Favicon aparece corretamente
5. ✅ Rotas funcionam (se usar routing)

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
