const router = require('express').Router();
const books = require('../../models/books');

router.get('/', (request, response) => {
  books.getAll()
  .then(books => {
    const bookLimit = 10
    const pageCount = Math.ceil(books.length/bookLimit)
    let currentPage = 1
    const booksGroupedByLimit = []
    let bookList = []

    while (books.length > 0) {
      booksGroupedByLimit.push(books.splice(0, bookLimit))
    }

    if (typeof request.query.page !== 'undefined') {
      currentPage = +request.query.page
    }

    bookList = booksGroupedByLimit[+currentPage - 1]
    response.render('books/index', {
      books: bookList,
      bookLimit: bookLimit,
      totalBooks: books.length,
      pageCount: pageCount,
      currentPage: currentPage
    })
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/new', (request, response) => {
  response.render('books/new');
});

router.post('/', (request, response) => {
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

router.get('/search', (request, response) => {
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
router.get('/:bookId', (request, response) => {
  const id = request.params.bookId;
  books.getById(id)
  .then(book => {
    response.render(`books/show`, {book});
  })
  .catch(error => {
    next(error);
  });
});

router.put('/:bookId', (request, response) => {
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

router.delete('/:bookId', (request, response) => {
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
