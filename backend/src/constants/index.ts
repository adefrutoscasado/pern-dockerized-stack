
export const PRODUCTION = process.env.NODE_ENV?.toLowerCase?.() === 'production'
export const DEVELOPMENT = !PRODUCTION

export const JWT_SECRET = process.env.JWT_SECRET || 'DEVELOPMENT_JWT_SECRET'
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET || 'DEVELOPMENT_REFRESH_JWT_SECRET'
