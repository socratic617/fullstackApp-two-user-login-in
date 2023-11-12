module.exports = function(app, passport, db) {
  
  const {ObjectId} = require('mongodb');//my string recipe ID(from monogoDB) needs to be converted into an object aka "{ObjectId}""

  const collectionName = "mood"

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) { // checks to see if logged in or send them back to homepage if not logged in 
        db.collection(collectionName).find().toArray((err, result) => {

          console.log("GET COLLECTION FROM DATABASE ON PAGE LOAD")
          console.log(result)
          if (err) return console.log(err)
          res.render('profile.ejs', {// this means that it will render my profile.ejs
            user : req.user,//showcases there usr name when logged in
            feelings: result
          })
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/feelings', (req, res) => {
      console.log('POST ENDPOINT TRIGGERED')
      console.log(req.body)

      db.collection('mood').save(
        {
          makesMeHappy: req.body.makesMeHappy, 
          moodContent: req.body.moodContent, 
          mood: req.body.mood, 
          image: req.body.image, 
          creatorId: ObjectId(req.body.creatorId)
        }, 
        (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/feelings', (req, res) => {

      console.log(" (put method) : ")
      console.log(req.body)
      db.collection('mood')
      .findOneAndUpdate({_id: ObjectId(req.body.id)}, {
        $set: {
          mood: req.body.currentMood,
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send('updated mood!')
      })
    })

    app.delete('/feelings', (req, res) => {
      console.log("delete method" , req.body)
      db.collection('mood').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {// checks to see if user is logged in
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
