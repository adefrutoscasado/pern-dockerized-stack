import type { Request, Express } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'
import { BadRequestError } from '../errors'
const execute = promisify(exec)

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = (destination: string) => multer.diskStorage({
  destination: async function (req: Request, file: Express.Multer.File, callback: DestinationCallback) {
    const PATH = `uploads${destination}`
    try {
      await execute(`mkdir ${PATH}`)
    } catch (err) {
      console.log(err)
    }
    callback(null, PATH)
  },
  filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
    const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
    const timestamp = Date.now()
    const extension = path.extname(file.originalname).toLowerCase()
    callback(null, `${originalName}_${timestamp}${extension}`)
  }
})

type AllowedExtensions = string[] | undefined
type AllowedMimetypes = string[] | undefined

export const upload = (
  storage: multer.StorageEngine,
  limits: multer.Options['limits'],
  allowedExtensions?: AllowedExtensions,
  allowedMimetypes?: AllowedMimetypes,
) => multer({
  storage,
  limits,
  fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (allowedExtensions && !(allowedExtensions.some(extension =>
      path.extname(file.originalname).toLowerCase() === `.${extension}`)
    )) {
      return callback(new BadRequestError(`Extension not allowed, accepted extensions are ${allowedExtensions.join(', ')}`))
    }
    if (allowedMimetypes && !(allowedMimetypes.includes(file.mimetype))) {
      return callback(new BadRequestError(`Mimetype not allowed, accepted mimetypes are ${allowedMimetypes.join(', ')}`))
    }
    callback(null, true)
  }
})

// needs "app.use(bodyParser())" middleware to work

export const uploadMiddleware = ({
  destination = '',
  limits = { fileSize: 1 * 1024 * 1024 }, // 1 Mb
  allowedExtensions = undefined as AllowedExtensions,
  allowedMimetypes = undefined as AllowedMimetypes,
}) => {
  const uploadStorage = storage(destination)
  return upload(
    uploadStorage,
    limits,
    allowedExtensions,
    allowedMimetypes
  )
}