const router = require('express').Router();
const books = require('../../models/books');

router.get('/', (request, response, next) => {
  books.getAll()
  // Is a function that becomes a Promise that is fulfilled with a value
  .then(books => {
    response.render('books/index', {books})
  })
  // ...Or is rejected with a reason
  .catch(error => {
    next(error);
  });
});

router.get('/new', (request, response, next) => {
  response.render('books/new');
});

router.post('/', (request, response, next) => {
  const bookInfo = request.body;
  books.add(bookInfo)
  .then(newBook => {
    if(newBook) {
      response.redirect(`/books/${newBook.id}`);
    }
  })
  .catch(error => {
    next(error);
  });
});

router.get('/search', (request, response, next) => {
  const searchTerms = request.query.searchTerms;
  books.search(searchTerms)
  .then(matchingBooks => {
    response.render('books/search', {matchingBooks});
  })
  .catch(error => {
    next(error);
  });
});

//TODO Limit Number of Routes
router.get('/:bookId', (request, response, next) => {
  const id = request.params.bookId;
  books.getById(id)
  .then(book => {
    response.render(`books/show`, {book});
  })
  .catch(error => {
    next(error);
  });
});

router.put('/:bookId', (request, response, next) => {
  const id = request.params.bookId;
  const newBookInfo = request.body;
  books.update(id, newBookInfo)
  .then(updatedBook => {
    response.redirect(`/books/${id}`);
  })
  .catch(error => {
    next(error);
  });
});

router.delete('/:bookId', (request, response, next) => {
  const id = request.params.bookId;
  books.deleteById(id)
  .then(() => {
    response.redirect('/books');
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;
