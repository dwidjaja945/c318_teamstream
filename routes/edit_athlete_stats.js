module.exports = ( webserver , dataBase , mysql ) => {

    /**
     * Takes : {
     *    stat_name
     *    stat_value
     *    athlete_id
     * }
     * 
     * Returns:
     *   success: true
     *   insertId
     */
    webserver.post( '/api/edit_athlete_stats' , ( req , res ) => {
        // console.log("edit athlete stats body: ", req.body)

        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login_page';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        const {athlete_id} = req.session;
        let query = `INSERT INTO stats
            (
                stat_id
                stat_name,
                stat_value, 
                athlete_id
            )
            VALUES`;
        let inserts = [];

        console.log('the request body: ', req.body)

        for(let statIndex=0; statIndex<req.body.length; statIndex++){
            const {stat_name, stat_value} = req.body[statIndex];
            let { stat_id } = req.body[ statIndex ];

            query += ' (?,?,?,?)';
            query += statIndex===req.body.length-1 ? '' : ',';

            // check to see if a stat_id has been provided or not.
            if( isNaN( stat_id ) ) {
                stat_id = 'null';
            };

            inserts.push(stat_id, stat_name, stat_value, athlete_id);
        }

        query += `ON DUPLICATE KEY UPDATE 
            stat_name = VALUES(stat_name),
            stat_value = VALUES(stat_value)`;


        let mysqlQuery = mysql.format( query , inserts );

        dataBase.query( mysqlQuery , ( err , data , fields ) => {
            if(!err) {
                output.insertIds = {
                    insertStart: data.insertId,
                    rowsAffected: data.affectedRows,
                }

                let query = `
                        DELETE FROM stats 
                        WHERE (stat_name, stat_value) 
                        IN (('', ''))`;

                dataBase.query(query, (err, data, fields) => {
                    if (!err) {
                        output.success = true;
                        output.redirect = "/athlete_profile";
                    } else {
                        output.errors = err;
                    };
                    console.log('edit athlete output: ', output);
                    res.json(output);
                })
                // output.data = data;
            } else {
                output.errors = err;
                console.log('edit athlete output error: ' , output);
                res.json(output);
            }
        });
    });

    webserver.delete('/api/delete_athlete_stat', (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login_page';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        let { stat_id, athlete_id } = req.body;

        let query = `DELETE FROM \`stats\` 
        WHERE \`stat_id\` = ?
        AND \`athlete_id\` = \`athlete_id\``;

        let inserts = [stat_id];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query(mysqlQuery, (err, data, fields) => {
            if (!err) {
                output.success = true;
                output.data = data;
                output.message = "Stat Deleted";
                // output.redirect = '/athlete_profile'  // Might not need to redirect since will still be on edit page
            } else {
                output.errors = err;
            }
            res.json(data);
        });
    });

    //==========================
    //====End module.exports====
    //==========================
};


    // This end point is no longer necessary since it is handled in the /api/edit_athlete_stats endpoint

    // /**
    //  * Takes : {
    //  *    stat_name
    //  *    stat_value
    //  *    athlete_id
    //  * }
    //  * 
    //  * Returns:
    //  *   success: true
    //  */
    // webserver.post( '/api/update_athlete_stats' , ( req , res ) => {
    //     const output = {
    //         success: false,
    //         data: [],
    //         errors: [],
    //         redirect: ''
    //     };

    //     if (req.session.user_id === undefined) {
    //         output.redirect = '/login_page';
    //         output.errors = 'User not logged in';
    //         res.json(output);
    //         res.end();
    //         return;
    //     }

    //     let { stat_name, stat_value, athlete_id, stat_id } = req.body;

    //     let query = ` UPDATE stats
    //         SET stat_name = ? , stat_value = ?
    //         WHERE athlete_id = ?
    //         AND stat_id = ?
    //         `;

    //     let inserts = [ stat_name, stat_value, athlete_id, stat_id ];

    //     let mysqlQuery = mysql.format( query , inserts );

    //     dataBase.query( mysqlQuery , ( err , data , fields ) => {
    //         if(!err) {
    //             output.success = true;
    //             output.data = data;
    //             output.redirect = "/athlete_profile";
    //         } else {
    //             output.errors = err;
    //         };

    //         res.json(err);
    //     });
    // });
