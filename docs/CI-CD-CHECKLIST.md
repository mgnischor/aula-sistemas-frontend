# ✅ Checklist de Validação - CI/CD

Use este checklist para validar que toda a infraestrutura de CI/CD foi configurada corretamente.

## 📁 Arquivos Criados

### GitHub Actions Workflows

-   [ ] `.github/workflows/ci.yml` existe
-   [ ] `.github/workflows/release.yml` existe
-   [ ] `.github/workflows/preview.yml` existe

### Templates

-   [ ] `.github/ISSUE_TEMPLATE/bug_report.md` existe
-   [ ] `.github/ISSUE_TEMPLATE/feature_request.md` existe
-   [ ] `.github/pull_request_template.md` existe

### Documentação

-   [ ] `docs/WORKFLOWS.md` existe
-   [ ] `docs/RELEASE.md` existe
-   [ ] `docs/CI-CD-SUMMARY.md` existe
-   [ ] `docs/CI-CD-FLOW.md` existe
-   [ ] `docs/GETTING-STARTED-CI-CD.md` existe

### Configuração

-   [ ] `.gitattributes` existe
-   [ ] `README.md` atualizado com badges
-   [ ] `README.md` atualizado com seção CI/CD

## 🔧 Configuração do GitHub

### Permissões

-   [ ] Acesso ao repositório: `https://github.com/mgnischor/aula-sistemas-frontend`
-   [ ] GitHub Actions habilitado
-   [ ] Permissão "Read and write" configurada
-   [ ] Permissão para criar PRs configurada

### Verificação

-   [ ] Aba "Actions" está visível
-   [ ] 3 workflows aparecem na lista
-   [ ] Nenhum erro de sintaxe nos workflows

## 🧪 Testes Funcionais

### Teste 1: CI em Push

-   [ ] Push para branch `main` ou `develop`
-   [ ] Workflow CI iniciou automaticamente
-   [ ] Todos os jobs completaram com sucesso
-   [ ] Artefatos foram gerados
-   [ ] Tempo de execução: ~5-10 minutos

### Teste 2: Preview em Pull Request

-   [ ] Pull Request criado
-   [ ] Workflow Preview iniciou
-   [ ] Comentário automático foi adicionado ao PR
-   [ ] Checks aparecem na parte inferior do PR
-   [ ] Artefatos de preview disponíveis

### Teste 3: Release com Tag

-   [ ] Tag no formato `v*.*.*` criada
-   [ ] Workflow Release iniciou
-   [ ] Release criada na seção "Releases"
-   [ ] Tarball disponível para download
-   [ ] Changelog gerado automaticamente

## 📊 Badges e Status

### README Badges

-   [ ] Badge CI aparece no README
-   [ ] Badge Release aparece no README
-   [ ] Badges mostram status correto
-   [ ] Badges são clicáveis e levam aos workflows

### Links de Verificação

Substitua URLs e verifique:

-   [ ] Actions: `https://github.com/mgnischor/aula-sistemas-frontend/actions`
-   [ ] Releases: `https://github.com/mgnischor/aula-sistemas-frontend/releases`
-   [ ] Settings: `https://github.com/mgnischor/aula-sistemas-frontend/settings`

## 📦 Artefatos

### CI Workflow

-   [ ] `dist-20.x` gerado
-   [ ] `dist-22.x` gerado
-   [ ] `coverage-report` gerado
-   [ ] Retenção: 7 dias

### Release Workflow

-   [ ] `aula-sistemas-frontend-vX.Y.Z.tar.gz` criado
-   [ ] `production-build-vX.Y.Z` disponível
-   [ ] Retenção: 90 dias

### Preview Workflow

-   [ ] `pr-{number}-preview` criado
-   [ ] Retenção: 5 dias

## 🎯 Funcionalidades

### Integração Contínua

-   [ ] Testes executam em múltiplas versões do Node.js
-   [ ] Build de desenvolvimento funciona
-   [ ] Build de produção funciona
-   [ ] Cobertura de código calculada
-   [ ] Logs detalhados disponíveis

### Release Automatizado

-   [ ] Tags disparam workflow automaticamente
-   [ ] Changelog gerado dos commits
-   [ ] Release notes incluídas
-   [ ] Artefatos anexados
-   [ ] Pre-releases identificadas corretamente

### Preview de PRs

-   [ ] Build executado para cada PR
-   [ ] Comentário adicionado automaticamente
-   [ ] Status do build visível
-   [ ] Artefatos disponíveis para teste

## 🔍 Verificação de Qualidade

### Workflows (YAML)

-   [ ] Sintaxe YAML válida
-   [ ] Indentação correta
-   [ ] Todas as chaves necessárias presentes
-   [ ] Versões de actions atualizadas

### Documentação

-   [ ] Markdown renderiza corretamente
-   [ ] Links internos funcionam
-   [ ] Comandos são copiáveis
-   [ ] Exemplos são claros
-   [ ] Sem erros de digitação evidentes

### Templates

-   [ ] Templates aparecem ao criar issue
-   [ ] Templates aparecem ao criar PR
-   [ ] Campos são apropriados
-   [ ] Labels sugeridas fazem sentido

## 🚨 Troubleshooting

Se algo não passou no checklist:

### Workflow não aparece

```bash
# Verificar se arquivos foram commitados
git status
git add .github/
git commit -m "chore: add CI/CD workflows"
git push origin main
```

### Permissões negadas

1. Vá em Settings > Actions > General
2. Marque "Read and write permissions"
3. Salve e tente novamente

### Teste falhou

1. Veja logs completos em Actions
2. Execute comando localmente: `npm ci && npm test`
3. Verifique versão do Node.js: `node -v`
4. Compare com matriz do workflow

### Badge não aparece

1. Verifique URL no README.md
2. Confirme nome do arquivo workflow
3. Aguarde primeiro workflow completar
4. Recarregue página (Ctrl+F5)

## 📋 Comandos Úteis de Verificação

### Listar workflows

```bash
# Listar arquivos de workflow
ls -la .github/workflows/

# Ver conteúdo de um workflow
cat .github/workflows/ci.yml
```

### Verificar sintaxe YAML

```bash
# Se tiver yamllint instalado
yamllint .github/workflows/*.yml

# Ou use ferramenta online
# https://www.yamllint.com/
```

### Validar package.json

```bash
npm run lint
npm test
npm run build:production
```

## ✨ Próximos Passos

Após validar tudo neste checklist:

-   [ ] Commit e push de todos os arquivos
-   [ ] Criar primeiro release (v1.0.0)
-   [ ] Compartilhar documentação com equipe
-   [ ] Configurar notificações (opcional)
-   [ ] Integrar ferramentas externas (opcional)

## 📝 Notas Adicionais

### Data de Validação

-   Primeira validação: **_/_**/\_\_\_
-   Validado por: ******\_\_\_******
-   Status geral: ⬜ Passou ⬜ Precisa ajustes

### Problemas Encontrados

```
Liste aqui qualquer problema encontrado durante a validação:

1.
2.
3.
```

### Melhorias Sugeridas

```
Liste aqui melhorias que podem ser implementadas:

1.
2.
3.
```

---

## 🎉 Conclusão

Se todos os itens estão marcados: **Parabéns!** 🎉

Sua infraestrutura de CI/CD está completamente configurada e funcional.

Se houver itens não marcados, consulte:

-   [docs/GETTING-STARTED-CI-CD.md](GETTING-STARTED-CI-CD.md) para configuração inicial
-   [docs/WORKFLOWS.md](WORKFLOWS.md) para detalhes técnicos
-   [docs/RELEASE.md](RELEASE.md) para processo de release

---

**Versão do Checklist**: 1.0  
**Última atualização**: Outubro 2025  
**Compatível com**: GitHub Actions, Angular 20, Node.js 20+
