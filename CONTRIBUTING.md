# Contribuindo para o Hey Strangers App

## Configuração do Ambiente

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

3. Execute o servidor de desenvolvimento em modo seguro (limpa a pasta .next):
   ```bash
   pnpm devsafe
   ```

4. Gere os tipos do Payload CMS:
   ```bash
   pnpm generate:types
   ```

## Estrutura do Projeto

- `src/app/` - Rotas e páginas Next.js
- `src/components/` - Componentes React reutilizáveis
- `src/collections/` - Coleções do Payload CMS
- `src/globals/` - Globais do Payload CMS
- `src/domains/` - Lógica de domínio específica
- `src/lib/` - Utilitários e código compartilhado
- `src/i18n/` - Arquivos de internacionalização
- `src/database/` - Scripts e configurações de banco de dados

## Guia de Estilo de Código

- Use TypeScript para todo o código
- Siga as convenções de nomenclatura:
  - Componentes: PascalCase
  - Funções e variáveis: camelCase
  - Constantes: UPPER_SNAKE_CASE
- Use o formatador Prettier e o linter ESLint
- Organize as importações em ordem alfabética
- Documente funções e componentes complexos

## Fluxo de Trabalho com Git

1. Crie uma branch para sua feature ou correção
2. Faça commits frequentes e com mensagens descritivas
3. Antes de enviar um pull request, certifique-se de:
   - Executar o linter: `pnpm lint`
   - Gerar os tipos mais recentes: `pnpm generate:types`
   - Testar todas as alterações

## Tecnologias Principais

- Next.js 15
- Payload CMS 3
- TypeScript
- TailwindCSS
- Radix UI

## Dicas para Usar o Cursor IDE

1. Use o comando "ctrl + i" (ou "cmd + i" no Mac) para acessar o Cursor AI
2. Para navegação rápida entre arquivos, use "ctrl + p" (ou "cmd + p" no Mac)
3. Para ver a definição de um símbolo, use "F12" ou "ctrl + clique" (ou "cmd + clique" no Mac)
4. Para refatorar código, selecione o código e use "F2"
5. Aproveite os snippets de código para React e TypeScript
6. **Arquivos de Contexto do Cursor:**
   - `.vscode/cursor-context.md` - Contém informações detalhadas sobre o projeto e tecnologias
   - `.vscode/cursor-prompts.md` - Contém templates de prompts para tarefas comuns

## Links e Documentação

### Cursor IDE
- [Site Oficial do Cursor](https://cursor.sh/)
- [Documentação do Cursor](https://cursor.sh/docs)
- [Guia de Início Rápido do Cursor](https://cursor.sh/docs/quickstart)
- [Atalhos de Teclado do Cursor](https://cursor.sh/docs/advanced/keybinds)
- [Blog do Cursor](https://cursor.sh/blog)
- [Comunidade do Cursor no Discord](https://discord.com/invite/cursor)

### Tecnologias do Projeto
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Payload CMS](https://payloadcms.com/docs)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Documentação PNPM](https://pnpm.io/motivation)
- [Documentação React Hook Form](https://react-hook-form.com/get-started)

## Perguntas Frequentes

- **P: Como adiciono uma nova coleção ao Payload?**
  R: Crie um novo arquivo na pasta `src/collections/` e registre-o no arquivo `src/payload.config.ts`

- **P: Como adiciono uma nova rota ao aplicativo?**
  R: Crie pastas e arquivos apropriados na estrutura `src/app/` seguindo as convenções do Next.js 15

- **P: Como funciona a internacionalização?**
  R: O projeto usa next-intl. Adicione as strings no diretório `src/i18n/` e use os hooks de tradução nos componentes
