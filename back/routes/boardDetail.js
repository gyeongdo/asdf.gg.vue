const express = require('express');
const multer = require('multer');
const path = require('path');
// const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 글 상세 조회
router.get('/:id', async (req, res, next) => {
  
  console.log('req.params.id : ', req.params.id);
  
  try {
    const board = await db.Board.findOne({
      where: {id: req.params.id},
    })
    res.json(board);
  } catch (err) {
    console.log(err);
  }

});


module.exports = router;
