module.exports = function(webserver, dataBase, mysql, session) {
  webserver.post("/api/login", (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    let username = req.session.username;
    let password = req.session.password;
    console.log(username, password);

    const output = {
      success: false,
      data: [],
      errors: []
    };

    let query = "SELECT \`user_id\` FROM \`users\` WHERE \`username\` = '??' AND \`password\` = '??'";
    let inserts = [username, password];

    let sqlQuery = mysql.format(query, inserts);

    dataBase.query(sqlQuery, (error, data, fields) => {
        if(!error){
            output.success = true;
            output.data = data;
        } else {
            output.errors = error;
        };
        res.json(output);
    });

  });
};