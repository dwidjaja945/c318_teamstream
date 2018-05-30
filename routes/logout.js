module.exports = (webserver, dataBase, mysql) => {
    /**
     * Takes:
     *  null
     *
     *  Returns:
     *  success: true
     *  redirect: ''
     *  //
     *  error: ''
     */
    webserver.get('/api/logout', (req, res) => {
        const output = {
            success: false,
            redirect: '',
            error: null,
        };
        req.session.destroy((err) => {
            if(!err) {
                output.redirect = '/';
                output.success = true;
                res.json(output);
            } else {
                output.error = err;
                res.json(output);
            }
        });
    })
};