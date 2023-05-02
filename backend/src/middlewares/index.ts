import {
  errorHandler
} from './../utils'
import { BadRequestError } from '../errors'
import Ajv from 'ajv'
import { verifyAccessToken } from '../services/jwt'
const ajv = new Ajv()

export const validateBody = (jsonSchema: any) => errorHandler(async (req, res, next) => {
  const validate = ajv.compile(jsonSchema)
  const valid = validate(req.body)
  if (!valid) {
    throw new BadRequestError(undefined, { errors: validate.errors })
  }
  next()
})

export const validateToken = errorHandler(async (req, res, next) => {
  const data = await verifyAccessToken(req)
  // @ts-ignore
  req.auth = data
  next()
})
