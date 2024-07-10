import { Router } from 'express';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/author';



import { checkSchema } from 'express-validator';
import { verifyUserToken } from '../middileware/verifyUser';

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
router.post('/',verifyUserToken, checkSchema(authorSchema), createAuthor);
router.put('/:id',verifyUserToken, checkSchema(authorSchema), updateAuthor);
router.delete('/:id', verifyUserToken, deleteAuthor);

export default router;
