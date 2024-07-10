import { Router } from 'express';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/author';



import { checkSchema } from 'express-validator';
import { login, registration } from '../controllers/auth';

const authSchema = {
  username: {
    isString: true,
    notEmpty: true,
  },
  password: {
    isString: true,
    notEmpty: true,
  },
};

const router: Router = Router();

router.post('/login', checkSchema(authSchema), login);
router.post('/registration',checkSchema(authSchema), registration);


export default router;