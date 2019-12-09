const express = require('express');
const multer = require('multer');
const path = require('path');
// const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const _ = require('lodash');

const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const axios = require('axios');

const router = express.Router();


//process.env.RIOT_API,

// 글 상세 조회
router.get('/:id', async (req, res, next) => {

  const ApiDefault = { key : process.env.RIOT_API}  
  let summonerUrl = `/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${ApiDefault.key}`; 
  try{
    axios.get('https://kr.api.riotgames.com'+ encodeURI(summonerUrl)) 
        .then( summonerData => { 
          res.json(summonerData.data);
        }) 
        .catch();
  } catch(err) {
    console.log(err);
  }

});

module.exports = router;
