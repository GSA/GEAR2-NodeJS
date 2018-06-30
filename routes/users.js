const express = require('express');

const router = express.Router();

router.route('/login')
  .get((req, res) => {
    res.render('passport/login.pug', { message: req.flash('loginMessage') });
  })
  // Note: a 2-callback pattern for post auth
  .post(passport.authenticate('local', {
  	successRedirect : '/#!/admin',
  	failureRedirect : '/login',
  	failureFlash : true
  }),
  (req, res) => {
  	if (req.body.remember) {
  		req.session.cookie.maxAge = 1000 * 60 * 3;
  	} else {
  		req.session.cookie.expires = false;
  	}
  	res.redirect(req.query.target);
  });

// 'ua' = User Auth status check
router.route('/ua')
  .get((req, res) => {
  	if (req.user) {
  		res.json({
  			id: req.session.id,
  			isLoggedIn: req.isAuthenticated(),
  			user: req.user,
  		});
  	} else {
  		res.json({
  			id: req.session.id,
  			isLoggedIn: req.isAuthenticated(),
  		});
  	}
  });

router.route('/logout')
  .get(function(req, res) {
  	req.logout();
  	res.redirect('/');
  });



module.exports = router;
