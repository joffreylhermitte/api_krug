import connection from "../loaders/sql";
import util from "util";

const query2 = util.promisify(connection.query).bind(connection);
export default {

    add : async (data) => {
        const reason = {
            label: data.label
        };
        await query2('INSERT INTO Krug_reasons SET ?',reason);
        return {msg:'Raison ajoutée'}
    },
    edit: async (data,id) => {
        await query2('UPDATE Krug_reasons SET label = ? WHERE id = ?',[data.label,id]);
        return {msg:'Raison modifiée'}
    },
    all: async () => {
        return await query2('SELECT * FROM Krug_reasons')

    },
    getOne: async (id) => {
        const data = await query2('SELECT * FROM Krug_reasons WHERE id = ?',id);
        return data[0];
    },
    delete: async (id) => {
        await query2('DELETE FROM Krug_reasons WHERE id = ?',id);
        return {msg:'Raison supprimé'}
    }
}
