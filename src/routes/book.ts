import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook, getBooksByAuthorId, getBookByIdWithAuthor, getAuthorByIdWithBooks } from '../controllers/book';

import { checkSchema } from 'express-validator';
import { verifyUserToken } from '../middileware/verifyUser';

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
router.post('/',verifyUserToken, checkSchema(bookSchema), createBook);
router.put('/:id',verifyUserToken,checkSchema(bookSchema), updateBook);
router.delete('/:id',verifyUserToken,  deleteBook);
router.get('/author/:id', getAuthorByIdWithBooks);

export default router;
