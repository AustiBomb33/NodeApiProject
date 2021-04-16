const { index, show, create, update, destroy}
 = require('../controllers/authorsController');

 module.exports = router => {
     router.get('/authors', index);
     router.get('/authors/:id', show);
     router.post('/authors', create);
     router.put('/authors', update);
     router.delete('/authors', destroy)
 };