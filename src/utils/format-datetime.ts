import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatDateTime(rawDate: string): string {
  const date = new Date(rawDate)

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR
  }); //aspas simples faz que com ignore as letras, mas tem que ter as duplas em volta 
}

export function formatRelativeDate(rawDate: string): string {
  const date = new Date(rawDate)

  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  }); //addSufix fica ex: há 10 minutos
}

export function formatHour(timestamps: number): string {
  const date = new Date(timestamps)

  return format(date, 'HH:mm:ss', {
    locale: ptBR
  })
}