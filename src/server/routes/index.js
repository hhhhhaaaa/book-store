const router = require('express').Router();
const booksRoute = require('./books');
const { errorHandler, logErrors, notFoundHandler, setDefaultResponseLocals } = require('../middlewares');

router.use(setDefaultResponseLocals);

router.use('/books', booksRoute);

router.get('/', (request, response) => {
  response.redirect('/books');
});

router.use(logErrors);
router.use(errorHandler);
router.use(notFoundHandler);

module.exports = router;
