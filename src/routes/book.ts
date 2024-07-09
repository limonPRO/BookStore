import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook, getBooksByAuthorId, getBookByIdWithAuthor, getAuthorByIdWithBooks } from '../controllers/book';

import { checkSchema } from 'express-validator';

const bookSchema = {
  title: {
    isString: true,
    notEmpty: true,
  },
  published_date: {
    isDate: true,
  },
  author_id: {
    isInt: true,
  },
};

const router: Router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.get('/book-with-author/:id', getBookByIdWithAuthor); 
router.post('/',checkSchema(bookSchema), createBook);
router.put('/:id',checkSchema(bookSchema), updateBook);
router.delete('/:id', deleteBook);
router.get('/author/:id', getAuthorByIdWithBooks);

export default router;
