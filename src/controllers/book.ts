import { NextFunction, Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { validationResult } from 'express-validator';
import { notFoundResponse, sendResponse } from '../utils/util';

const db = knex(knexConfig.development);

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    
    let query = db('books').select('*');
    
    if (search) {
      query = query.where('title', 'like', `%${search}%`);
    }
    
    const books = await query;
    
    return res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      data: books,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBookById = async (req: Request, res: Response,  next: NextFunction) => {
  const { id } = req.params;
  try {
    const book = await db('books').where({ id }).first();
    if (!book) {
        return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'All authors', book);
  } catch (error) {
    return next(error);
  }
};

export const createBook = async (req: Request, res: Response , next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const { title, description, published_date, author_id } = req.body;
  try {
    const [id] = await db('books').insert({ title, description, published_date, author_id });
    return sendResponse(res, 200, 'successfully created');
  } catch (error) {
    return next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, description, published_date, author_id } = req.body;
  try {
    const count = await db('books').where({ id }).update({ title, description, published_date, author_id });
    if (!count) {
        return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'successfully updated');
  } catch (error) {
    return next(error);
  }
};

export const deleteBook = async (req: Request, res: Response,next: NextFunction) => {
  const { id } = req.params;
  try {
    const count = await db('books').where({ id }).del();
    if (!count) {
        return notFoundResponse(res);
    }
    return sendResponse(res, 200, 'successfully deleted');
  } catch (error) {
    return next(error);
  }
};

export const getBooksByAuthorId = async (req: Request, res: Response,next: NextFunction) => {
  const { id } = req.params;
  try {
    const books = await db('books').where({ author_id: id });
    return sendResponse(res, 200, 'All authors', books);
  } catch (error) {
    return next(error);
  }
};
 

export const getBookByIdWithAuthor = async (req: Request, res: Response,next: NextFunction) => {
    const { id } = req.params;
    try {
      const book = await db('books').where({ id }).first();
      if (!book) {
        return notFoundResponse(res);
      }
      const author = await db('authors').where({ id: book.author_id }).first();
      const bookWithAuthor = { ...book, author };
      return sendResponse(res, 200, 'All authors', bookWithAuthor);
    } catch (error) {
        return next(error);
    }
  };

  export const getAuthorByIdWithBooks = async (req: Request, res: Response,next: NextFunction) => {
    const { id } = req.params;
    try {
      const author = await db('authors').where({ id }).first();
      if (!author) {
        return notFoundResponse(res);
      }
      const books = await db('books').where({ author_id: author.id });
      const authorWithBooks = { ...author, books };
      return sendResponse(res, 200, 'data retived successfully', authorWithBooks);
    } catch (error) {
        return next(error);
    }
  };