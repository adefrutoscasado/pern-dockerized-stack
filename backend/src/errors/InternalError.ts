
import ApiError from './ApiError'
import HTTP_CODE from './httpCodes'

export default class InternalError extends ApiError {
  constructor(message: string) {
    super(message || 'Internal Error', HTTP_CODE.INTERNAL_ERROR)
  }
}
