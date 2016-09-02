const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { stringify } = require('flatted');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/posts', (req, resp) =>
  axios
    .get('http://jsonplaceholder.typicode.com/posts')
    .then(response => resp.send({ items: response.data }))
    .catch(err => console.log(err, 'THE ERROR')),
);

app.listen(port, () => console.log(`Listening on port ${port}`));
