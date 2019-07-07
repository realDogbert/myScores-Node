
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var clubController = require('../controllers/clubController');
var userController = require('../controllers/userController');
var roundsController = require('../controllers/roundsController');
var dashboardController = require('../controllers/dashboardController');

const Club = require('../models/golfclubModel');


const apiKey = 'X-API-Key';


router.use((req, res, next) => {

  console.log("Host : " + req.hostname);

  const token = req.header(apiKey); 
  if (!token) {
    res.status(401).json({ error: 'not allowed' });
    return;
  } else {

    try {
      const decoded = jwt.verify(token, process.env.SECRET_APIKEY);
      if (decoded.iss != process.env.ISSUER_APIKEY) {
        res.status(401).json({ error: 'wrong issuer' });
        return;
      }
    }
    catch(err) {
      console.log(err.message);
      res.status(401).json({ error: err.message });
      return;
    }
    
  }

  // check are OK, go on to API
  next();

});

router.get('/', function(req, res, next) {
  res.render('clubs', { title: 'myScores' });
});

router.get('/clubs', function(req, res, next) {
  clubController.get(req, res);
});

router.get('/clubs/:id', function(req,res,next) {
  clubController.getByID(req.params.id, req, res);
});

router.post('/clubs', function(req, res, next) {
  clubController.create(req.body, (error, result) => {
    if (error) return console.log(error)
    // return the created object, which is the first element in ops
    res.status(201).json(result.ops[0]);
  });
});

router.put('/clubs/:id', (req, res) => {
  clubController.update(req.params.id, req.body, (error, result) => {
    if (error) return console.log(error);
    res.json(result.value);
  });
});

router.delete('/clubs/:id', function (req, res, next) {
  clubController.delete(req, res);
});



router.get('/courses', (req, res) => {

  clubController.getCourses(req.query, function(error, result) {
    if (error) {
      return console.log(error)
    };
    res.json(result);  
  });

});

router.get('/courses/:id', function(req,res,next) {
  clubController.getCourseByID(req.params.id, req, res);
});

router.post('/courses', (req, res, next) => {
  clubController.createCourse(req.body, (error, result) => {
    if (error) return console.log(error)
    // return the created object, which is the first element in ops
    res.json(result.ops[0]);  
  });
})

router.put('/courses/:id', (req, res) => {
  clubController.updateCourse(req.params.id, req.body, (error, result) => {
    if (error) return console.log(error)
    res.json(result);
  });
});

router.get('/scorecards/:id', function(req,res,next) {
  clubController.getScorecardByID(req.params.id, req, res);
});

router.get('/users', (req, res) => {

  userController.find(req.query.search)
  .then( result => {
    res.json(result)
  })
  .catch( error => {
    res.status(401).json({ error });
  })

})

router.get('/users/:id', (req,res,) => {

  userController.findById(req.params.id)
  .then( result => {
    res.json(result);
  })
  .catch( error => {
    res.status(401).json({ error });
  })

});

router.post('/users', function(req, res, next) {

  userController.create(req)
  .then( result => {
    res.redirect('/clubs');
    //res.json(result);
  })
  .catch( error => {
    res.status(401).json({ error });
  })

});

router.put('/users/:id', (req, res) => {

  req.body._id = req.params.id;
  userController.update(req.body)
  .then( result => {
    res.json(result);
  })
  .catch( error => {
    res.status(401).json({ error });
  })

});

router.delete('/users/:id', (req, res) => {

  userController.deleteById(req.params.id)
  .then( result => {
    res.json(result);
  })
  .catch( error => {
    res.status(401).json({ error });
  })

});

router.get('/users/:id/dashboard/:course', (req, res) => {
  dashboardController.getDashboard(req.params.id, req.params.course)
  .then(function(result) {
    res.json(result);
  })
});


router.get('/dashboard/statistics', (req, res) => {
  dashboardController.getPlayerStatistics(req.user._id)
  .then(
    function(result) {
      res.json(result);
    },
    function(error) {
      res.json(error);
    }
  )
});

router.post('/rounds', (req, res) => {

  console.log(req.headers);

  roundsController.create(
    req.body,
    function(error, result) {
      if (error) {
        return console.log(error)
      };
      res.json(result.ops);  
    }
  );

});

router.get('/rounds', (req,res) => {

  roundsController.get(req.query, function(error, result) {
    if (error) {
      return console.log(error)
    };
    res.json(result);  
  });

});

router.get('/rounds/:id', (req, res) => {

  roundsController.getByID(req.params.id, function(error, result) {
    if (error) {
      return console.log(error)
    };
    res.json(result);
  });

});

router.delete('/rounds/:id', (req, res) => {

  roundsController.delete(req.params.id, function(error, result) {
    if (error) {
      return console.log(error)
    };
    res.json(result);
  });

});

router.post('/golfclubs', (req, res) => {

  let newClub = new Club(req.body);
  newClub.save()
  .then(result => {
    res.json(result);
  })
  .catch( error => res.status(401).json({ error }) )
  
});

module.exports = router;
