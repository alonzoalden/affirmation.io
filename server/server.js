const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');


app.use(express.static('../build'));
// app.use(express.static(path.join(__dirname, '../dist')));
app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());
app.del('*', cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app, express);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
