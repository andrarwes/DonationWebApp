if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

var express = require('express');
var app = express();
const session = require('express-session');
const methodOverride = require('method-override');
var path = require('path');




// declaram variabilele pt routes
var index = require('./routes/index');
var donations = require('./routes/donations');

// pt inregistrare/login cu Passport
const passport = require('passport');
const LocalStrategy = require('passport-local');

//pt cookie-uri
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// avem nevoie de referinta la model pt functiile serializeUser/deserializeUser
const User = require('./models/users');

// pt plata cu cardul
const bodyParser = require('body-parser')
// declarare secret key
const stripe = require('stripe')('sk_test_51IiRfHJ4zzJBH3xkXYXJFbMmMq7PR4cv3IxoiVSecz1xCQ0wcwm8aysO0xDwnpurss6zVxY87gh3HAdXoiXPJQgX00s0FyDDW7')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true
}));

// pt conexiunea cu baza de date
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/donationsdb', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection.error:"));
db.once("open", ()=>{
    console.log("Conexiune cu baza de date reusita.");
});


// setare view engine 
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use( express.static('views') );
app.set('views', path.join(__dirname, 'views'));
app.use('/images', express.static('images'));

// setare path pt static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/', index);
app.use('/', donations);

//implementare plata card
app.get('/charge', (req,res)=>{
  res.render('./cardpayment/carddonation.ejs');
})
app.post('/charge', (req, res) => {
  try {
      stripe.customers.create({
          name: req.body.name,
          email: req.body.email,
          source: req.body.stripeToken
      }).then(customer => stripe.charges.create({
          amount: req.body.amount * 100,
          currency: 'ron',
          customer: customer.id,
          description: 'Va multumim pentru donatie!'
      })).then(() => res.render('./cardpayment/donationaccepted.ejs'))
          .catch(err => console.log(err))
  } catch (err) { res.send(err) }
})

app.use('/chargeaccepted', (req,res)=>{
  res.render('./cardpayment/donationaccepted.ejs');
})

app.use((req, res, next)=>{
  res.locals.currentUser = req.user;
  next();
});

// prinde eroarea 404 si o trimite mai departe catre error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log(err)
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // randeaza pagina de eroare
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message});
});


module.exports = app;
