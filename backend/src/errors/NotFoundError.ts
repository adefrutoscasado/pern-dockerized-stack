
import ApiError from './ApiError'
import HTTP_CODE from './httpCodes'

export default class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message || 'Not Found', HTTP_CODE.NOT_FOUND)
  }
}


