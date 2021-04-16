module.exports = router => {
    require('./routes/authors')(router);

    return router;
}