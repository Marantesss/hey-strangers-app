# 🔍 Sistema de Debug de Autenticação

Este documento explica como usar o sistema de logging condicional para debuggar problemas de autenticação no projeto.

## 📋 Como Ativar os Logs

### 1. **Usando Arquivo .env**

Adicione uma das seguintes linhas ao seu arquivo `.env` ou `.env.local`:

```bash
# Ativa logs básicos de debug
DEBUG_AUTH=true

# Ativa logs detalhados (verbose)
DEBUG_AUTH=verbose
```

### 2. **Usando Variáveis de Ambiente**

```bash
# Para uma sessão específica
DEBUG_AUTH=true npm run dev

# Para produção (se necessário)
DEBUG_AUTH=true npm start
```

## 🎛️ Níveis de Logging

### **Sem DEBUG_AUTH (Padrão)**

```bash
# Nenhuma variável definida - SILÊNCIO TOTAL
# Apenas erros críticos aparecerão
```

### **DEBUG_AUTH=true**

```bash
DEBUG_AUTH=true
```

**Mostra:**

- ✅ Sucessos na autenticação
- ⚠️ Warnings quando payload.auth() falha
- 🔍 Informações de debug básicas
- ❌ Erros de autenticação
- 📊 Debug completo das configurações e testes

### **DEBUG_AUTH=verbose**

```bash
DEBUG_AUTH=verbose
```

**Mostra tudo do nível anterior MAIS:**

- 📝 Headers limpos sendo criados
- 📝 Detalhes do cookie (tamanho, preview)
- 📝 Logs detalhados de cada etapa

## 📊 Exemplo dos Logs

### **Logs Normais (DEBUG_AUTH=true)**

```
[2025-01-29T10:30:45.123Z] ✅ [AUTH] payload.auth() funcionou normalmente
```

### **Logs Detalhados (DEBUG_AUTH=verbose)**

```
=== COMPREHENSIVE AUTH DEBUG ===

1. CONFIGURATION
   cookiePrefix: payload
   secret length: 32
   NODE_ENV: development
   isDev: true

2. USERS COLLECTION CONFIG
   auth enabled: true
   auth strategy disabled: true
   token expiration: 7200
   cookie domain: undefined
   cookie secure: false
   cookie sameSite: Lax

3. COOKIES
   Expected cookie name: payload-token
   Auth cookie exists: true
   Auth cookie value length: 249
   Cookie value preview: eyJhbGciOiJIUzI1NiIs...

[2025-01-29T10:30:45.125Z] 📝 [AUTH] Headers limpos criados, excluindo x-forwarded-*
[2025-01-29T10:30:45.127Z] ✅ [AUTH] payload.auth() funcionou com headers limpos
```

## 🚀 Casos de Uso

### **Debug em Desenvolvimento**

```bash
# No seu .env.local
DEBUG_AUTH=true
npm run dev
```

### **Debug em Produção (Emergência)**

```bash
# Apenas temporariamente, para investigar problema
DEBUG_AUTH=true npm start
```

### **Debug Detalhado (Problemas Complexos)**

```bash
# Para investigação profunda
DEBUG_AUTH=verbose
npm run dev
```

## 🔧 Integração no Código

O sistema é **completamente automático**. Os logs aparecem quando:

1. **getMe()** é chamado (autenticação de usuário)
2. **debugAuth()** é executado no layout da app
3. Qualquer problema de autenticação ocorre

### **Não é necessário modificar código** - apenas definir a variável de ambiente!

## 📝 Troubleshooting com Logs

### **Problema: User sempre null**

1. Ativar: `DEBUG_AUTH=verbose`
2. Verificar seção **"6. PAYLOAD AUTH TEST"**
3. Se mostrar `Auth successful: false`, verificar headers
4. Se JWT válido mas auth falha, é problema de headers

### **Problema: Cookie não existe**

1. Ativar: `DEBUG_AUTH=true`
2. Verificar seção **"3. COOKIES"**
3. Se `Auth cookie exists: false`, problema no login/criação do cookie

### **Problema: JWT expirado**

1. Ativar: `DEBUG_AUTH=true`
2. Verificar seção **"4. JWT VERIFICATION"**
3. Se `JWT expired: true`, refazer login

## 🧹 Limpeza de Logs

### **Para Desativar Completamente**

```bash
# Remover do .env
# DEBUG_AUTH=true

# Ou definir como false
DEBUG_AUTH=false
```

### **Para Produção**

Certifica-te que **NÃO** tens `DEBUG_AUTH=true` em produção, a menos que seja para debug específico.

## ⚡ Performance

- **Impacto ZERO** quando desativado
- **Mínimo impacto** quando ativado (apenas logs)
- **Safe para produção** se necessário

## 🔒 Segurança

- **Não expõe senhas** ou dados sensíveis
- **JWT token** apenas mostra preview (primeiros 20 chars)
- **Safe para logs** de produção se necessário

---

## 💡 Dicas

1. **Mantém sempre disponível** - não custa nada deixar o código
2. **Usa verbose apenas quando necessário** - gera muitos logs
3. **Remove em produção** após resolver o problema
4. **Documenta problemas encontrados** para futura referência
