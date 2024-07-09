import { Router } from 'express';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/author';



import { checkSchema } from 'express-validator';

const authorSchema = {
  name: {
    isString: true,
    notEmpty: true,
  },
  birthdate: {
    isDate: true,
  },
};

const router: Router = Router();
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.post('/', checkSchema(authorSchema), createAuthor);
router.put('/:id',checkSchema(authorSchema), updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
