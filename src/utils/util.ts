// utils.ts
import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendResponse = <T>(res: Response, statusCode: number, message: string, data?: T): Response => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        ...(data !== undefined && { data }),
      });
  };
  

export const throwError = (message: string, status: number = 500): never => {
  const error = new Error(message);
  (error as any).status = status;
  throw error;
};

export const notFoundResponse = (res: Response, message: string = 'Resource not found'): Response<ApiResponse<null>> => {
  return sendResponse(res, 404, message);
};
