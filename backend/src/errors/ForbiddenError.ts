
import ApiError from './ApiError'
import HTTP_CODE from './httpCodes'

export default class UnauthorizedError extends ApiError {
  constructor(message?: string, additionalInfo?: object) {
    super(message || 'Forbidden', HTTP_CODE.UNAUTHORIZED, additionalInfo)
  }
}
