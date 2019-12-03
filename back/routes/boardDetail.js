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
  try {
    const board = await db.Board.findOne({
      where: {id: req.params.id},
      include: [{
        model: db.User,
        attributes: ['id']
      }]
    })
    res.json(board);
  } catch (err) {
    console.log(err);
  }

});

// 글 수정

router.patch('/:id', isLoggedIn, async (req, res, next) => {
  
  try{
    await db.Board.update({
      name: req.body.payload.name,
      calories: req.body.payload.calories,
      fat: req.body.payload.fat,
      carbs: req.body.payload.carbs,
      protein: req.body.payload.protein,
      iron: req.body.payload.iron,
    },{
      where: {
        id: req.body.payload.id,
        UserId: req.user.id,
      }
    });
    
    const board = await db.Board.findOne({
      where: {id: req.body.payload.id}
    })

    res.json(board);
    
  } catch(err) {
    console.log(err);
  }

});


module.exports = router;
