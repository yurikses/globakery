import { hc } from 'hono/client'
import type { AppType } from '@globakery/backend'

// Инициализируем Hono RPC клиент
// Используем переменную окружения для URL бекенда, или фоллбек на localhost:8080 для разработки
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiClient = hc<AppType>(apiUrl)

