# Hey Strangers App - Contexto para o Cursor AI

## Visão Geral do Projeto
Este é um projeto construído com Next.js 15 e Payload CMS 3, utilizando TypeScript, TailwindCSS e Radix UI para componentes. O objetivo principal é criar uma aplicação web moderna para conectar pessoas.

## Tecnologias Principais

### Next.js 15
- App Router para roteamento baseado em sistema de arquivos
- Suporte para Server Components e Client Components
- API Routes para endpoints de backend
- Renderização Híbrida (SSR, SSG, ISR)
- Documentação: https://nextjs.org/docs

### Payload CMS 3
- Headless CMS com API GraphQL e REST
- Sistema de autenticação e autorização integrado
- Upload e gerenciamento de mídias
- Editor de conteúdo rico Lexical
- Documentação: https://payloadcms.com/docs

### TypeScript
- Tipagem estática para prevenção de erros
- Interfaces e tipos para definir contratos de dados
- Generics para reutilização de código
- Documentação: https://www.typescriptlang.org/docs/

### TailwindCSS
- Framework CSS utilitário
- Design responsivo
- Temas personalizáveis
- Documentação: https://tailwindcss.com/docs

### Radix UI
- Componentes de UI primitivos e acessíveis
- Sem estilo pré-definido, customizável com TailwindCSS
- Suporte a temas claro/escuro
- Documentação: https://www.radix-ui.com/docs/primitives/overview/introduction

### Gerenciador de Pacotes PNPM
- Eficiente com armazenamento em disco
- Mais rápido que npm e yarn
- Documentação: https://pnpm.io/motivation

## Estrutura do Projeto

- `src/app/` - Rotas e páginas Next.js
- `src/components/` - Componentes React reutilizáveis
- `src/collections/` - Coleções do Payload CMS
- `src/globals/` - Globais do Payload CMS
- `src/domains/` - Lógica de domínio específica
- `src/lib/` - Utilitários e código compartilhado
- `src/i18n/` - Arquivos de internacionalização
- `src/database/` - Scripts e configurações de banco de dados

## Convenções de Código

- Componentes: PascalCase
- Funções e variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos de componentes: ComponentName.tsx
- Arquivos de utilitários: utilityName.ts

## Padrões Comuns

- Uso de React Hooks para gerenciamento de estado
- Componentes funcionais com TypeScript
- Estilização com TailwindCSS
- Validação de formulários com Zod e React Hook Form
- Internacionalização com next-intl

## Recursos de Referência

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Payload CMS API Reference](https://payloadcms.com/docs/api/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TailwindCSS CheatSheet](https://tailwindcss.com/docs/customizing-colors)
- [Radix UI Components](https://www.radix-ui.com/primitives/docs/components/accordion)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [Zod Documentation](https://zod.dev/)

## Glossário de Termos do Projeto

- **Payload**: O CMS headless usado no projeto
- **Collection**: Modelo de dados no Payload CMS
- **Global**: Singleton de dados no Payload CMS
- **App Router**: Sistema de roteamento do Next.js 15
- **Server Component**: Componente renderizado no servidor
- **Client Component**: Componente renderizado no cliente
- **Lexical**: Editor de rich text usado no Payload
- **Tailwind**: Framework CSS utilitário
- **Radix UI**: Biblioteca de componentes primitivos
- **next-intl**: Biblioteca de internacionalização
