const express = require("express");
const bodyParser = require("body-parser");
const fuelUpController = require("./controllers/FuelUpController");
const vehicleController = require("./controllers/VehicleController");
const organizationController = require("./controllers/OrganizationController");
const userController = require("./controllers/UserController");
const cors = require('cors')  // using this module to solve CORS problem
// note the extra line in package.json to download this code

var corsOptions = {
  origin: 'http://localhost:4200',   // this URL must match the URL that the Angular app will call from
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}


// this brings in and sets up the monog db instance connection
require("./config/db");
app = express();

const port = 3000;  // setting the port number for this server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors({corsOptions, credentials: true}))   // bringing in the CORS code to our app

// API ENDPOINTS
// not using the Express Router code, instead just listing them
// each of these 5 routed call one of the 5 methods defined in the controller
// which in turn call Mongo Atlas, each of those 5 do a return to the client
// notive they are "keyed", but HTTP request type, get, put, etc
app
  .route("/fuelup")
  .get(fuelUpController.getAll)
  .post(fuelUpController.new);

app
  .route("/fuelup/:fuelUpId")
  .get(fuelUpController.getById)
  .put(fuelUpController.update)
  .delete(fuelUpController.delete);

app
  .route("/vehicle")
  .get(vehicleController.getAll)
  .post(vehicleController.new);

app
  .route("/vehicle/:vehicleId")
  .get(vehicleController.getById)
  .put(vehicleController.update)
  .delete(vehicleController.delete);

app
  .route("/organization")
  .get(organizationController.getAll)
  .post(organizationController.new);

app
  .route("/organization/:organizationId")
  .get(organizationController.getById)
  .put(organizationController.update)
  .delete(organizationController.delete);

app
  .route("/user")
  .get(userController.getAll)
  .post(userController.new);

app
  .route("/user/:userId")
  .get(userController.getById)
  .put(userController.update)
  .delete(userController.delete);

//ouath implementation

passport = require('passport'),
  auth = require('./config/auth'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session');


app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));
app.use(cookieParser());

auth(passport);
app.use(passport.initialize());
app.get('/', (req, res) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
      status: 'session cookie set'
    });
  } else {
    res.cookie('token', '')
    res.json({
      status: 'session cookie not set'
    });
  }
});

// alternate jwt method
//   // If a user is found
//   if(user){
//     token = user.generateJwt();
//     res.status(200);
//     res.json({
//       "token" : token
//     });
//   } else {
//     // If user is not found
//     res.status(401).json(info);
//   }
// }

app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.token = req.user.token;
    res.redirect('/user/post/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

//strategy for authentication won't work without routing
//as this is not implemented, the routeguard feature will
//be implemented in the front end
// function routeGuard(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   else {res.redirect('/');}
// }

//example appget
//app.get('/some_path',checkAuthentication,function(req,res){
//do something only if user is authenticated
//});

//server lisetn

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});