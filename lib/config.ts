// Central app configuration (server-side usage only)
// NOTE: For production, move secrets to environment variables.

export const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'yash',
  database: 'beejsetu',
  port: 3306,
}

// OpenRouter API config
export const OPENROUTER = {
  apiBase: 'https://openrouter.ai/api/v1',
  apiKey: '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',
  defaultModel: 'openai/gpt-3.5-turbo',
}
