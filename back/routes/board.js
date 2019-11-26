const express = require('express');
const multer = require('multer');
const path = require('path');
// const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// AWS.config.update({
//   region: 'ap-northeast-2',
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'vue-nodebird',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}${path.basename(file.originalname)}`)
//     },
//   }),
//   limit: { fileSize: 20 * 1024 * 1024 },
// });

// router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
//   console.log(req.files);
//   res.json(req.files.map(v => v.location));
// });


// 글등록
router.post('/', async (req, res, next) => { // POST /post
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', req.body);
  try {
    const newPost = await db.Board.create({
      name: req.body.name,
      calories: req.body.calories,
      fat: req.body.fat,
      carbs: req.body.carbs,
      protein: req.body.protein,
      iron: req.body.iron,
      UserId: req.user.id,
    });
    
    const fullPost = await db.Board.findOne({
      where: { id: newPost.id },
    });
    
    return res.json(fullPost);

  } catch (err) {
    console.error(err);
    next(err);
  }

});
// 글 조회
router.get('/boards', async (req, res, next) => {
  console.log('@@@@@@@@@@boards@@@@@@@@', req.query);
  try {
    // let pageNum = req.query.page; // 요청 페이지 넘버
    let pageNum = req.query.page; // 요청 페이지 넘버
    let offset = 0;
    let limit = req.query.itemsPerPage;
    let result = {};

    if(pageNum > 1){
      offset = limit * (pageNum - 1);
    }
    let sortBy = 'createdAt';
    let desc = 'DESC';


    if(req.query.sortBy) {
      sortBy = req.query.sortBy[0];
      console.log(req.query.sortDesc[0]);
      console.log(req.query.sortDesc[0] === 'false');
      desc = req.query.sortDesc[0] === 'false' ? 'DESC': 'ASC' ;
    } 

    const boards = await db.Board.findAll({
      offset: offset,
      limit: parseInt(limit),
      order: [[sortBy, desc]],
    });

    const total = await db.Board.findAll({});
    
    result['total'] = total;
    result['boards'] = boards;

    return res.json(result);

  } catch (err) {
    console.log(err);
    next(err);
  }
});


module.exports = router;
