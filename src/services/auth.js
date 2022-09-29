import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from "dayjs";
import speakeasy from 'speakeasy';
const jwt = require('jsonwebtoken');
import connection from "../loaders/sql";
import util from "util";
import config from '../config';
import nodemailer from "nodemailer";

const query2 = util.promisify(connection.query).bind(connection);
export default {

    register : async (data) => {

        const result = await query2('SELECT * FROM Krug_user WHERE email = ? ',data.email);
        if(result.length !== 0) {
            return {msg:'Utilisateur déjà inscrit'}
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password,salt);
            const user = {
                email : data.email,
                password : hash,
                token: token,
                secret: null,
                premium: false,
                status: true,
                admin: false,
                verified: false,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                birthday: data.birthday
            };
            const newUser =  await connection.query('INSERT INTO Krug_user SET ?', user);
            return {msg:'Inscription réussie'}
        }
    },
    login: async (data) => {
        let date;
        await  new Promise(resolve => {
            connection.query('SELECT * FROM `krug_user` WHERE email = "'+data.email+'"', async function (err,date) {
                let pass = date[0].password;
                let id = date[0].id;
                let mail = date[0].email;
                console.log(date[0].password);
                const valid = await bcrypt.compare(data.password,pass);
                console.log(valid);
                if(valid) {
                    const token = jwt.sign({_id:id, email:mail},config.jwtSecret,{expiresIn: '1d'});
                    console.log('tk',token)
                   resolve( {success: true, token: token});

                }else{
                    return {msg:'Login works !'}

                }
            });
        }).then(log => {
            console.log(log);
            date = log;
            return date;

        });

        return date;
    },
    check2fa: async (data,id) =>{
        const code = data.code;
        const secret = await query2('SELECT secret FROM Krug_user Where id = ?',id);
        let verified = speakeasy.totp.verify({ secret: secret[0].secret,
            encoding: 'base32',
            token: code });
        if (verified) {
            return {msg:'Code ok'}
        } else {
            return {msg:'Code incorrect'}
        }
    },
    activate: async (id) => {
        const secret = speakeasy.generateSecret({length: 20});
        connection.query(
            'UPDATE Krug_user SET secret = ? Where id = ?',
            [secret.base32, id],
            (err, result) => {
                if (err) throw err;

            }
        );
        return {msg: '2fa activée',code:secret.otpauth_url}

    },
    deactivate: async (id) => {
        await query2('UPDATE Krug_user SET secret = ? WHERE id = ?',[null,id]);
        return {msg:'2fa désactivée'}
    },
    forgotPassword : async (data) => {
        const email = data.email;
        let tokenUser = await query2('SELECT token from Krug_user where email = ?',email);
        tokenUser = tokenUser[0].token;
        let key = Math.floor(100000 + Math.random() * 900000);
        let keyString = key.toString();
        let hash = crypto.createHash('sha256').update(keyString).digest('hex');

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'stephany.mante68@ethereal.email',
                pass: 'ArFEn9kHFcTBs1APTZ'
            }
        });

        let info = await transporter.sendMail({
            from: '"Support" <support@krug.com>',
            to: email,
            subject: "Réinisialisation mot de passe",
            text: "Pour modifier votre mot de passe veuillez cliquer sur ce lien :" +
                "http://localhost:3000/resetPassword?hashCode="+hash+"&user="+tokenUser+"et utiliser le code suivant : "+keyString,
            html: '<p>Pour modifier votre mot de passe veuillez cliquer sur ce lien :</p>' +
                '<a href="http://localhost:3000/resetPassword?hashCode='+hash+'&user='+tokenUser+'">http://localhost:3000/resetPassword</a>' +
                '<p>Et utiliser le code suivant : '+key+'</p>'
        });
        return {msg: 'Email envoyé avec succès'};

    },
    resetPassword: async (data) => {
        const tokenUser = data.tokenUser;
        const code = data.code;
        const key = data.key;
        let password = data.password;

        let hashCode = crypto.createHash('sha256').update(code).digest('hex');
        if(hashCode !== key){
            return { msg: 'Code incorrect' };
        }

        const salt = await bcrypt.genSalt(10);

        password = await bcrypt.hash(password, salt);

        await query2('UPDATE Krug_user SET password = ? WHERE token = ?',[password,tokenUser]);

        return {msg: 'Mot de passe modifié avec succès'};


    }
}
