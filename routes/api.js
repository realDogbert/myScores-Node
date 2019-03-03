require('dotenv').config();

var express = require('express');
var router = express.Router();

var clubController = require('../controllers/clubController');
var userController = require('../controllers/userController');
var roundsController = require('../controllers/roundsController');
var dashboardController = require('../controllers/dashboardController');

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
    res.json(result.ops[0]);
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
  userController.get((err, result) => {
      if (err) return console.log(err)
      res.json(result)
  });
})

router.get('/users/:id', (req,res,) => {
  userController.getByID(req.params.id, function(err, result) {
    if (err) return console.log(err)
    res.json(result)
  });
});

router.post('/users', function(req, res, next) {
  userController.create(req, res);
});

router.put('/users/:id', (req, res) => {
  userController.update(req.params.id, req.body, (error, result) => {
    if (error) return console.log(error)
    res.json(result)
  });
});

router.delete('/users/:id', (req, res) => {
  userController.delete(req, res);
});

router.get('/users/:id/dashboard/:course', (req, res) => {
  dashboardController.getDashboard(req.params.id, req.params.course)
  .then(function(result) {
    res.json(result);
  })
});

router.get('/dashboard/:course', (req, res) => {
  dashboardController.getDashboard(null, req.params.course)
  .then(function(result) {
    res.json(result);
  })
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

module.exports = router;
