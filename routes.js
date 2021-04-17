module.exports = router => {
    require('./routes/authors')(router);
    require('./routes/books')(router);
    return router;
}