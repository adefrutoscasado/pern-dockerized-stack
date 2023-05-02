import { Request, Response, NextFunction } from 'express'

export const errorHandler = (fn: (req: Request, res: Response, next: NextFunction, ...args: any) => Promise<any>) =>
  function asyncUtilWrap(req: Request, res: Response, next: NextFunction, ...args: any) {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
  }
