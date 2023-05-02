
import ApiError from './ApiError'
import HTTP_CODE from './httpCodes'

export default class NotFoundError extends ApiError {
  constructor(message?: string, additionalInfo?: object) {
    super(message || 'Bad Request', HTTP_CODE.BAD_REQUEST, additionalInfo)
  }
}
