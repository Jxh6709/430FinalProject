const dotenv = require('dotenv');
// const csrf = require('csurf');
const url = require('url');
const redis = require('redis');
const session = require('express-session');
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const RedisStore = require('connect-redis')(session);

dotenv.config();
const port = process.env.PORT || process.env.NODE_PORT || 8080;

const dbURL = process.env.MONGODB_URI;

// mongoose setup
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    throw err;
  }
});

// REDIS
let redisURL = {
  // settings
  hostname: 'redis-10084.c232.us-east-1-2.ec2.cloud.redislabs.com',
  port: '10084',
};

let redisPASS = 'tZuCwc3EyeEiDO3GUV6YDuvvDBzVhMqL';

// for heroku
const passIndex = 1;
if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[passIndex];
}

const redisClient = redis.createClient({
  host: redisURL.hostname,
  port: redisURL.port,
  password: redisPASS,
});

// grab routes
const router = require('./router');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
// B
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'Yo Quiero Taco Bell',
  resave: true,
  secure: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');
app.use(cookieParser());

// csrf time
// app.use(csrf());
// app.use((err, req, res, next) => {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err);

//   console.log('Missing csrf token');
//   return false;
// });

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
