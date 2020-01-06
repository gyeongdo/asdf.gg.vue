const _ = require('lodash');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const redis = require('./redis.js');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');

const prod = process.env.NODE_ENV === 'production';
const db = require('./models');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const boardRouter = require('./routes/board');
const boardDetailRouter = require('./routes/boardDetail');
const matchRouter = require('./routes/match');

const app = express();

dotenv.config();
db.sequelize.sync();
passportConfig();

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan('combined'));
  app.use(cors({
    origin: 'http://veneziar.com',
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:3081',
    credentials: true,
  }));
}

//redis
RedisStore = require('connect-redis')(session);

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  // secret: process.env.COOKIE_SECRET,
  store: new RedisStore({
    client:redis,
    host: 'localhost',
    port: '6379',
    prefix: 'session',
    db: 0,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    }
  }),
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    domain: prod && '.veneziar.com',
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
//   // res.status(200).send('veneziar.com');
//   console.log('req.session.key ::::: ', req.session.key);
//   // 세션값이 있으면 
//   if(req.session.key) { 
//     res.status(200).send('veneziar.com');
//   } 
// });

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);
app.use('/board', boardRouter);
app.use('/boardDetail', boardDetailRouter);
app.use('/match', matchRouter);

app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(`백엔드 서버 ${prod ? process.env.PORT : 3085}번 포트에서 작동중.`);
});
