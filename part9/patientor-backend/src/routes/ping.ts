import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  res.send('pong');
});

export default router;