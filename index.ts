import cors from "cors";
import express, {json} from "express";
import 'express-async-errors';
import 'express-rate-limit';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(json());

//routes

//end of routes



app.listen(3001, 'localhost', () => {
  console.log('listening on http://localhost:3001');
})
