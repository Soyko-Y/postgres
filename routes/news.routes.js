module.exports = (app) => {
  const news = require('../controllers/news.controller.js');

  const router = require('express').Router();

  router.post('/', news.create);
  router.get('/', news.findAll);
  router.get('/:id', news.findOne);
  router.put('/:id', news.update);
  router.delete('/:id', news.delete);
  router.delete('/', news.deleteAll);

  app.use('/api/news', router);
};
