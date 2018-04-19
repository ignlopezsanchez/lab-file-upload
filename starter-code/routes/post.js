const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require("../config/cloudinary.js");


router.get('/new', ensureLoggedIn('/auth/login'), (req, res) => {

  res.render('post/new');
});


router.post("/new",[ensureLoggedIn(), uploadCloud.single("photo")],
passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true
    })
);





//---------------------------------------------------------------------------
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/auth/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup",[ensureLoggedOut(), uploadCloud.single("photo")],
passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/auth/signup",
        failureFlash: true
    })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;