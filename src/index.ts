import express, { Request, Response, NextFunction } from "express";
import { checkDatabaseConnection } from "./dbConnection";
require("dotenv").config();
import authorRoutes from './routes/author';
import { errorHandler } from "./utils/errorHandler";
import bookRoutes from './routes/book';


export const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
// const app: Application = express();

// Error handler middleware
app.use(errorHandler);

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("working");
});


app.listen(port, () => {

  checkDatabaseConnection()

  console.log(`Server running at http://localhost:${port}`);
});

