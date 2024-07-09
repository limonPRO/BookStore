// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response<ApiResponse<null>> => {
  console.error(err.stack);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null,
  });
};
 