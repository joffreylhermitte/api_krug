import connection from "../loaders/sql";
import util from "util";

const query2 = util.promisify(connection.query).bind(connection);
export default {

    add : async (data,id) => {
        const account = {
            accountLOL : JSON.stringify(data.account),
            Krug_user_id: id
        };

        return await query2('INSERT INTO Krug_account SET ?',account);
    },
    all: async () => {
        return await query2('SELECT * FROM Krug_account')

    },
    getUser: async (user) =>{
        return await query2('SELECT * FROM Krug_account WHERE Krug_user_id = ?',user);
    },
    getOne: async (id) => {
        const data = await query2('SELECT * FROM Krug_account WHERE id = ?',id);
        return data[0];
    },
    deleteUser: async (user) => {
        await query2('DELETE FROM Krug_account WHERE Krug_user_id = ?',user);
        return {msg:'Compte supprimé'}
    },
    deleteOne: async (id) => {
        await query2('DELETE FROM Krug_account WHERE id = ?',id);
        return {msg:'Compte supprimé'}
    }
}
