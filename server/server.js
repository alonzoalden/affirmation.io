const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../dist')));
const router = require('./routes')(app, express);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.options('*', cors());
app.del('*', cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
