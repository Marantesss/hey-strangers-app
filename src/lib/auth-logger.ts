/**
 * Sistema de logging condicional para debug de autenticação
 *
 * Controla os logs através de variáveis de ambiente:
 * - DEBUG_AUTH=true - Ativa logs de debug de autenticação
 * - DEBUG_AUTH=verbose - Ativa logs detalhados
 *
 * Uso:
 * - authLogger.info('mensagem') - Log normal
 * - authLogger.debug('mensagem') - Log de debug (só se DEBUG_AUTH=true)
 * - authLogger.verbose('mensagem') - Log detalhado (só se DEBUG_AUTH=verbose)
 */

type LogLevel = 'info' | 'debug' | 'verbose' | 'error'

class AuthLogger {
  private isDebugEnabled(): boolean {
    return process.env.DEBUG_AUTH === 'true' || process.env.DEBUG_AUTH === 'verbose'
  }

  private isVerboseEnabled(): boolean {
    return process.env.DEBUG_AUTH === 'verbose'
  }

  private shouldLog(level: LogLevel): boolean {
    switch (level) {
      case 'error':
        return true // Erros sempre aparecem
      case 'info':
        return this.isDebugEnabled()
      case 'debug':
        return this.isDebugEnabled()
      case 'verbose':
        return this.isVerboseEnabled()
      default:
        return false
    }
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString()
    const prefix = {
      error: '❌',
      info: 'ℹ️',
      debug: '🔍',
      verbose: '📝',
    }[level]

    return `[${timestamp}] ${prefix} [AUTH] ${message}`
  }

  error(message: string, error?: Error): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message))
      if (error) {
        console.error('Error details:', error instanceof Error ? error.message : String(error))
        if (error instanceof Error && error.stack) {
          console.error('Stack trace:', error.stack.split('\n')[0])
        }
      }
    }
  }

  info(message: string): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message))
    }
  }

  debug(message: string): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message))
    }
  }

  verbose(message: string): void {
    if (this.shouldLog('verbose')) {
      console.log(this.formatMessage('verbose', message))
    }
  }

  // Função especial para logs de seção (headers mais visíveis)
  section(title: string): void {
    if (this.shouldLog('debug')) {
      console.log(`\n=== ${title.toUpperCase()} ===`)
    }
  }

  // Função para logs tabulados
  detail(key: string, value: any): void {
    if (this.shouldLog('debug')) {
      console.log(`   ${key}:`, value)
    }
  }

  // Função para logs de sucesso
  success(message: string): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', `✅ ${message}`))
    }
  }

  // Função para logs de warning
  warning(message: string): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', `⚠️ ${message}`))
    }
  }
}

// Instância singleton do logger
export const authLogger = new AuthLogger()

// Função utilitária para verificar se debug está ativo
export const isAuthDebugEnabled = (): boolean => {
  return process.env.DEBUG_AUTH === 'true' || process.env.DEBUG_AUTH === 'verbose'
}

// Função utilitária para verificar se verbose está ativo
export const isAuthVerboseEnabled = (): boolean => {
  return process.env.DEBUG_AUTH === 'verbose'
}
