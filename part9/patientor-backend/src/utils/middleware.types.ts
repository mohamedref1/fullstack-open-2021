import { Request, Response, NextFunction } from 'express';

export type MiddlewareFn =
  (req: Request, res: Response, next: NextFunction) => void

export type ErrorHandlerFn =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any, req: Request, res: Response, next: NextFunction) => void;

