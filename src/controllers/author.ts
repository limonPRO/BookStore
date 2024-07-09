import { NextFunction, Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { validationResult } from 'express-validator';
import { notFoundResponse, sendResponse } from '../utils/util';
import {  Author } from '../types';

const db = knex(knexConfig.development);

export const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authors: Author[] = await db('authors').select('*');
      return sendResponse(res, 200, 'All authors', authors);
    } catch (error) {
      return next(error);
    }
  };

export const getAuthorById = async (req: Request, res: Response, next: NextFunction)=> {
  const { id } = req.params;
  try {
    const author :Author = await db('authors').where({ id }).first();
    if (!author) {
      return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'All authors', author);
  } catch (error) {
    return next(error);
  }
};

export const createAuthor = async (req: Request, res: Response ,  next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, bio, birthdate } = req.body;
  try {
   await db('authors').insert({ name, bio, birthdate });
  
   return sendResponse(res, 200, 'successFully Created',);
  } catch (error) {
    return next(error);
  }
};

export const updateAuthor = async (req: Request, res: Response ,next: NextFunction) => {
  const { id } = req.params;
  const { name, bio, birthdate } = req.body;
  try {
    const count = await db('authors')
      .where({ id })
      .update({ name, bio, birthdate });
    if (!count) {
        return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'successFully updated',);
  } catch (error) {
    return next(error);
  }
};

export const deleteAuthor = async (req: Request, res: Response , next: NextFunction) => {
  const { id } = req.params;
  try {
    const count = await db('authors').where({ id }).del();
    if (!count) {
        return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'successFully deleted',);
  } catch (error) {
    return next(error);
  }
};
