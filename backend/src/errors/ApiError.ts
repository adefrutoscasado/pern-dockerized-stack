import HTTP_CODE from './httpCodes'

export default class ApiError extends Error {
  constructor(message: string, status: number, additionalInfo?: object) {
    super()
    // @ts-ignore
    this.status = status || HTTP_CODE.INTERNAL_ERROR
    this.message = message || 'Internal Error'
    // @ts-ignore
    this.additionalInfo = additionalInfo || {}
    // Capturing stack trace, excluding constructor call from it.
    // Error.captureStackTrace(this, this.constructor)
  }
}