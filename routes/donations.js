var express = require('express');
var router = express.Router();
const session = require('express-session');
const Article = require('../models/donationarticles');
const User = require('../models/users');
const mongoose = require('mongoose');
const donations = require('../controllers/donations')
const catchAsync = require('../utilities/catchAsync');
const {isLoggedIn} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


router.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  next();
});


router.get('/makeclothesdonation', isLoggedIn, donations.renderaddclothesform)

router.post('/clothes', isLoggedIn, upload.array('image'), catchAsync(donations.addclothes))

router.get('/makehousedonation', isLoggedIn, donations.renderaddhouseitemform )

router.post('/house', isLoggedIn, upload.array('image'), catchAsync(donations.addhouseitem))

router.get('/makefooddonation', isLoggedIn, donations.renderaddfooditemform)

router.post('/food', isLoggedIn, upload.array('image'), catchAsync(donations.addfooditem))

router.get('/clothes',  isLoggedIn, catchAsync(donations.showallclothes));

 router.get('/house', isLoggedIn, catchAsync(donations.showallhouseitems));

 router.get('/food', isLoggedIn, catchAsync(donations.showallfooditems));

 
 router.get('/clothes/:id', isLoggedIn, catchAsync(donations.showclothingitem));

router.get('/clothes/:id/edit', isLoggedIn,  catchAsync(donations.editclothingitemform));

router.put('/clothes/:id', isLoggedIn,  catchAsync(donations.editclothingitem));

router.delete('/clothes/:id', isLoggedIn, catchAsync(donations.deleteclothingitem));

router.get('/house/:id', isLoggedIn, catchAsync(donations.showhouseitem));

router.get('/house/:id/edit', isLoggedIn, catchAsync(donations.edithouseitemform));

router.put('/house/:id', isLoggedIn, catchAsync(donations.edithouseitem));

router.delete('/house/:id', isLoggedIn,  catchAsync(donations.deletehouseitem));

router.get('/food/:id', isLoggedIn, catchAsync(donations.showfooditem));

router.get('/food/:id/edit', isLoggedIn, catchAsync(donations.editfooditemform));

router.put('/food/:id', isLoggedIn,  catchAsync(donations.editfooditem));

router.delete('/food/:id', isLoggedIn,  catchAsync(donations.deletefooditem));


module.exports = router;
