import { Router, Request, Response } from 'express'
import { errorHandler } from '../utils'
import { uploadMiddleware } from '../middlewares/upload'
import { BadRequestError } from '../errors'
import { promises as fs } from 'fs'
const router = Router()

router.post('/uploads/images',
  uploadMiddleware({
    destination: `/images`,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb
    allowedExtensions: ['png', 'jpg', 'jpeg', 'jpg'],
    allowedMimetypes: ['image/png', 'image/jpeg', 'image/jpg'],
  }).single('file'),
  errorHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError('No file provided')
    }
    res.json({
      message: 'Uploaded successfully',
      file: req.file
    })
  })
)

router.get('/uploads/images',
  errorHandler(async (req: Request, res: Response) => {
    let filenames = [] as string[]
    try {
      filenames = await fs.readdir(`${process.cwd()}/uploads/images`)
    } catch (err: any) {
      // If folder doesnt exist (no uploads yet), return as empty
      if (err?.code === 'ENOENT') {
        return res.json([])
      }
      throw err
    }
    res.json(
      filenames.map(filename => ({
        filename,
        path: `uploads/images/${filename}`,
      }))
    )
  })
)

router.delete('/uploads/images/:file',
  errorHandler(async (req: Request, res: Response) => {
    const { file } = req.params
    await fs.unlink(`${process.cwd()}/uploads/images/${file}`)
    res.json({
      message: 'Deleted succesfully'
    })
  })
)

export default router