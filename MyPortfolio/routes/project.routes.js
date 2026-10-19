const controller = require('../controllers/project.controller');
const verifyJWT = require('../middlewares/auth.middleware');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Protected project routes
  app.get('/api/projects', verifyJWT, controller.findAll);
  app.post('/api/projects', verifyJWT, controller.create);
};