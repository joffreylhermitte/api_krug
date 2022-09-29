import mysql from "mysql";
import config from '../config';




    const connection = mysql.createConnection({
        host     : config.sqlDatabaseHost,
        user     : config.sqlDatabaseLogin,
        password : config.sqlDatabasePassword,
        database : config.sqlDatabaseName,
        port     : config.sqlDatabasePort
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });


export default connection


