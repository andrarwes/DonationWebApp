var express = require('express');
var router = express.Router();
const index = require('../controllers/index')
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');


router.use((req, res, next)=>{
  console.log(req.session);
  res.locals.currentUser = req.user;
  next();
});


router.get('/', index.home);

router.get('/about', index.about);

router.get('/contact',  index.contact);

router.post('/contact', catchAsync(index.sendcontactform));

router.get('/register',  index.register);

router.post('/register', catchAsync(index.sendregisterform));

router.get('/donationpage',  index.donationpage);

router.get('/login',  index.login);

router.post('/login', passport.authenticate('local', {failureRedirect:'/login'}),catchAsync(index.sendloginform));

router.get('/logout',index.logout)

module.exports = router;

