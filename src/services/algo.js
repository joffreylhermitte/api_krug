import connection from "../loaders/sql";
import util from "util";
import regression from "regression";
import Game from "../models/game";

const query2 = util.promisify(connection.query).bind(connection);
export default {

    add : async (data) => {
        var sql = "INSERT INTO `krug_algo`( `label`, `percentage`) VALUES ?";


        await connection.query(sql,[data.algo],function (err) {
            if (err) throw err;
            conn.end();
        });
        return {msg:'Paramètre ajouté'}
    },
    edit: async (data,id) => {
        const algo = {
            label: data.label,
            percentage: data.percentage
        };
        await query2('UPDATE Krug_algo SET label = ? WHERE id = ?',[algo,id]);
        return {msg:'Paramètre modifié'}
    },
    all: async () => {
        return await query2('SELECT * FROM Krug_algo')

    },
    getOne: async (id) => {
        const data = await query2('SELECT * FROM Krug_algo WHERE id = ?',id);
        return data[0];
    },
    delete: async (id) => {
        await query2('DELETE FROM Krug_algo WHERE id = ?',id);
        return {msg:'Paramètre supprimé'}
    },
    calcul: async (id) => {
        const coeff1 = await query2('SELECT percentage from Krug_algo where label = ratioVD');
        const coeff2 = await query2('SELECT percentage from Krug_algo where label = ratioKD');
        const coeff3 = await query2('SELECT percentage from Krug_algo where label = ratioBan');

        let nbrWin = 0;
        let nbrLose = 0;
        let nbrkill = 0;
        let nbrDeath = 0;
        let ban =  [[0,0],[1,3],[2,1]];
        let ratioVD = 0;
        let ratioKD = 0;
        let games = await Game.find({user:id})
        await games.forEach(g => {
            if(g.data.win === 'Win'){
                nbrWin += 1;
            } else {
                nbrLose +=1;
            }
        })
        if(nbrLose === 0){
            ratioVD = nbrWin;
        } else {
            ratioVD = nbrWin/nbrLose;
        }
        await games.forEach(a => {
            nbrkill = a.data.kills;
            nbrDeath = a.data.deaths;
        });
        if(nbrDeath === 0){
            ratioKD = nbrkill;
        } else {
            ratioKD = nbrkill/nbrDeath;
        }

        const result = regression.linear(ban);
        const r2 = result.r2;

        const indice = (ratioVD * coeff1) + (ratioKD * coeff2) / coeff3 * (1-Math.pow(r2,2));
        const finalResult = [{player1:indice.toFixed(2)}];

        const players = await query2('SELECT * from Krug_user WHERE id != ?',id);

        await players.forEach(e => {
            let nbrWin = 0;
            let nbrLose = 0;
            let nbrkill = 0;
            let nbrDeath = 0;
            let ban =  [[0,Math.floor(Math.random() * 11)],[1,Math.floor(Math.random() * 11)],[2,Math.floor(Math.random() * 11)]];
            let ratioVD = 0;
            let ratioKD = 0;
            let games =  Game.find({user:e.id})
             games.forEach(g => {
                if(g.data.win === 'Win'){
                    nbrWin += 1;
                } else {
                    nbrLose +=1;
                }
             })
            if(nbrLose === 0){
                ratioVD = nbrWin;
            } else {
                ratioVD = nbrWin/nbrLose;
            }
            games.forEach(a => {
                nbrkill = a.data.kills;
                nbrDeath = a.data.deaths;
            });
            if(nbrDeath === 0){
                ratioKD = nbrkill;
            } else {
                ratioKD = nbrkill/nbrDeath;
            }

            let r2player = 0;
            const resultBan = regression.linear(ban);
            if(!isNaN(parseFloat(resultBan.r2)) ){
                r2player = resultBan.r2;
            }

            const indicePlayer = (ratioVD * coeff1) + (ratioKD * coeff2) / coeff3 * (1-Math.pow(r2player,2));

            const obj = {email: e.email, indice: indicePlayer.toFixed(2)};
            finalResult.push(obj);
        })

        return finalResult;
    },
    calculDemo: async () => {
        const coeff1 = 8;
        const coeff2 = 5;
        const coeff3 = 10;

        let ban =  [[0,0],[1,3],[2,1]];
        let ratioVD = 1.8;
        let ratioKD = 0.97;

        const result = regression.linear(ban);
        const r2 = result.r2;

        const indice = (ratioVD * coeff1) + (ratioKD * coeff2) / coeff3 * (1-Math.pow(r2,2));
        const finalResult = [{playerConnected:indice.toFixed(2)}];


         for(let i = 0; i<=50; i++){
            let ratioVDPlayer = (Math.random() * (6 - 0) + 0).toFixed(2);
             ratioVDPlayer = parseFloat(ratioVDPlayer);
            let ratioKDPlayer = (Math.random() * (20 - 0) + 0).toFixed(2);
             ratioKDPlayer = parseFloat(ratioKDPlayer);
            let banPlayer =  [[0,Math.floor(Math.random() * 11)],[1,Math.floor(Math.random() * 11)],[2,Math.floor(Math.random() * 11)]];
            let r2player = 0;
            const resultBan = regression.linear(banPlayer);
            if(!isNaN(parseFloat(resultBan.r2)) ){
                r2player = resultBan.r2;
            }

            const indicePlayer = (ratioVDPlayer * coeff1) + (ratioKDPlayer * coeff2) / coeff3 * (1-Math.pow(r2player,2));

            const obj = {id: i, indice: indicePlayer.toFixed(2)};
            finalResult.push(obj);
        }



        return finalResult;
    }
}
