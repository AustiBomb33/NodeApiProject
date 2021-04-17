const { index, show, create, update, destroy}
 = require('../controllers/booksController');

 module.exports = router => {
     router.get('/books', index);
     router.get('/books/:id', show);
     router.post('/books', create);
     router.put('/books', update);
     router.delete('/books', destroy)
 };