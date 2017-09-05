const errorHandler = (error, request, response, next) => {
  response.status(500).send('Error on Server.');
}

const logErrors = (error, request, response, next) => {
  console.error(error.stack);
  next(error);
}

const notFoundHandler = (request, response) => {
  response.status(404).send('Not found.')
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

module.exports = { errorHandler, logErrors, notFoundHandler,
  setDefaultResponseLocals
}
