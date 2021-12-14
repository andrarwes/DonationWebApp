const session = require('express-session');
const Message = require('../models/contactmessages');
const User = require('../models/users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const catchAsync = require('../utilities/catchAsync');

module.exports.home = function(req, res, next) {
    res.render('index', {page:'Acasa', menuId:'home'});
  }

  module.exports.about = function(req, res, next) {
    res.render('about', {page:'Despre noi', menuId:'about'});
  }

  module.exports.contact = function(req, res, next) {
    res.render('contact', {page:'Contact', menuId:'contact'});
  }

  module.exports.sendcontactform = async(req,res)=>{
    const message = new Message(req.body.message);
    await message.save();
    res.render('contact',{page:'Contact', menuId:'contact',message});
  }

  module.exports.register = function(req, res, next) {
    res.render('register', {page:'Inregitreaza-te', menuId:'register'});
  }

  module.exports.sendregisterform = async(req, res, next)=>{

    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err =>{
    if(err) return next(err);
    console.log(registeredUser);
    res.redirect('/');
  })
  }


  module.exports.donationpage = function(req, res, next){
    res.render('./donations/donationpage.ejs',  {page:'Pagina de donatii', menuId:'donation'});
  }
  
  module.exports.login = function(req, res, next) {
    res.render('login', {page:'Login', menuId:'login'});
  }


  module.exports.sendloginform = async(req,res)=>{
    const redirectUrl = req.session.returnTo || '/donationpage';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }


  module.exports.logout = function(req, res, next){
    req.logout();
    res.redirect('/');
  }