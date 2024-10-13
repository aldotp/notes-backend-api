const express = require('express');
const router = require('./route.js');
const cors = require('cors');

const host = 'localhost';
const port = 5000;
const app = express();

// add cors using express

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(port, host, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});