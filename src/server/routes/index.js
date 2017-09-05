const router = require('express').Router();
const books = require('./books');
const { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals } = require('../middleware');

router.use(setDefaultResponseLocals);

router.use('/books', books);

router.get('/', (request, response) => {
  response.redirect('/books');
});

router.use(logErrors);
router.use(errorHandler);
router.use(notFoundHandler);

module.exports = router;
