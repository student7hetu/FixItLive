import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  console.log('FixItLive');
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
