import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import crypto from 'crypto';
import dayjs from "dayjs";
import speakeasy from 'speakeasy';
import connection from "../loaders/sql";
import util from "util";
import config from '../config';

const query2 = util.promisify(connection.query).bind(connection);
export default {
    List: async () => {
        return new Promise(resolve => {

            connection.query('SELECT * FROM `krug_user`',  function (err,date) {


                resolve( date);
            });
        })

    },
    One: async (id) => {
        console.log(id);
        return new Promise(resolve => {

            connection.query('SELECT * FROM `krug_user` WHERE id = '+id+'',  function (err,date) {
                console.log(date,'e');


                resolve( date);
            });
        })
    },
    Suspend: async(id) => {
        return new Promise(resolve => {

            connection.query('UPDATE `krug_user` SET `status` = "0" WHERE `krug_user`.`id` = '+id+';',  function (err,date) {
                console.log(date,'e');


                resolve( date);
            });
        })
    },
    Delete: async(id) => {
        return new Promise(resolve => {

            connection.query('DELETE FROM `krug_user` WHERE `krug_user`.`id` = '+id+' ',  function (err,date) {
                console.log(date,'e');


                resolve( date);
            });
        })
    }
}
