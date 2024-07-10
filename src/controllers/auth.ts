import { NextFunction, Request, Response } from 'express';
import knex from 'knex';
import knexConfig from '../../knexfile';
import { validationResult } from 'express-validator';
import { hashPassword, notFoundResponse, sendResponse, validatePassword } from '../utils/util';
import jwt from "jsonwebtoken";
require("dotenv").config();


const db = knex(knexConfig.development);

export const registration = async (req: Request, res: Response, next: NextFunction) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);
    //   await knex('users').insert({ username, password: hashedPassword });
      await db('users').insert({ username, password: hashedPassword });
      return sendResponse(res, 200, 'User registered successfully!');
    } catch (error) {
        return next(error);
    }
  };
  
  export const login = async (req: Request, res: Response, next: NextFunction) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
  
    try {
      const user = await db('users').where({ username }).first();
      console.log(user)

      if (user) {
        const machedPassword = await validatePassword(
          password,
          user.password
        );
  
        if (machedPassword) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: user,
            },
            process.env.JWT_SECRET as string
          );
  
          res.status(201).json({
            message:"successfully login",
            success:true,
            user: user,
            token: token,
          });
        } else {
          res.status(404).send({
            message:"invalis credeatial",
            success:false,
          });
        }
      } else {
        res.status(404).send({
            message:"invalis credeatial",
            success:false,
          });
      }
    } catch (error) {
      res.status(500).json({   success:false, error: 'Login failed.' });
    }
  };