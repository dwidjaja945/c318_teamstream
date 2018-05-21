module.exports = (webserver , dataBase , mysql ) => {
    
    // endpoint to overwrite a previously pinned post.
    webserver.post( '/api/pinned' , ( req , res ) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        };

        let post_id = req.body.post_id;
        
        let query = `
            UPDATE bulletin
            SET pinned = '0'
            WHERE pinned = '1'
        `;

        // first: unpinning pinned post
        dataBase.query( query , ( err, data, fields ) => {
            if(!err) {
                output.success = true;
                output.data = data;
                output.message = "Post unpinned";
            } else {
                output.errors = err;
            };

            let pinQuery = `
                UPDATE bulletin
                SET pinned = '1',
                WHERE post_id = ?'
            `;

            let inserts = [post_id];

            let pinSqlQuery = mysql.format( pinQuery , inserts );

            // second: pin new post
            dataBase.query( pinSqlQuery , ( err , data , fields ) => {

                if (!err) {
                    output.success = true;
                    output.data = data;
                    output.message = "New post pinned";
                } else {
                    output.errors = err;
                }

                res.json(output);

            });

        });

    })

    // endpoint to just unpin a post
    webserver.post( '/api/unpin' , ( req , res ) => {

        if (req.session.user_id === undefined) {
            output.redirect = '/login';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        };

        let output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        let query = `
            UPDATE bulletin
            SET pinned = '0'
            WHERE pinned = '1'
        `;

        dataBase.query( query , ( err, data , fields) => {
            if(!err) {
                output.success = true;
                output.data = data;
                output.message = "Post unpinned";
            } else {
                output.errors = err;
            };

            res.json(output);
        } )

    } )
};