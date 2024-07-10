// utils.ts
import { Response } from 'express';
import { ApiResponse } from '../types';

import bcrypt from "bcrypt";

export const sendResponse = <T>(res: Response, statusCode: number, message: string, data?: T): Response => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        ...(data !== undefined && { data }),
      });
  };
  

  export const loginResponse = <T>(res: Response, statusCode: number, message: string,token:string, data?: T , ): Response => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        message,
        token,
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



export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

