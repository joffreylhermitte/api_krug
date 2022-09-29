import connection from "../loaders/sql";
import util from "util";
import dayjs from "dayjs"

const query2 = util.promisify(connection.query).bind(connection);
export default {

    add : async (data) => {
        const ban = {
            start_date: dayjs(data.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end_date: dayjs(data.end_date).format('YYYY-MM-DD HH:mm:ss'),
            permanent: data.permanent,
            effective: data.effective,
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            Krug_user_id: data.user,
            Krug_reasons_id: data.reason
        };
        await query2('INSERT INTO Krug_ban SET ?',ban);
        return {msg:'Ban ajoutée'}
    },
    edit: async (data,id) => {
        const ban = {
            start_date: dayjs(data.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end_date: dayjs(data.end_date).format('YYYY-MM-DD HH:mm:ss'),
            permanent: data.permanent,
            effective: data.effective,
            Krug_user_id: data.user,
            Krug_reasons_id: data.reason
        };
        await query2('UPDATE Krug_ban SET ? WHERE id = ?',[ban,id]);
        return {msg:'Ban modifié'}
    },
    all: async () => {
        return await query2('SELECT * FROM Krug_ban')

    },
    permanent: async (id) => {
        await query2('UPDATE Krug_ban SET permanent = ? WHERE id = ?',[true,id]);
        return {msg:'Ban passé en permanent'}
    },
    effective: async (id) => {
        await query2('UPDATE Krug_ban SET effective = ? WHERE id = ?',[true,id]);
        return {msg:'Ban passé en effectif'}
    },
    getOne: async (id) => {
        const data = await query2('SELECT * FROM Krug_ban WHERE id = ?',id);
        return data[0];
    },
    getPermanent: async () => {
        return await query2('SELECT * FROM Krug_ban WHERE permanent = ?',true);
    },
    getEffective: async () => {
        return await query2('SELECT * FROM Krug_ban WHERE effective = ?',true);
    },
    getByReason: async (reason) => {
        return await query2('SELECT * FROM Krug_ban WHERE Krug_reasons_id = ?',reason);
    },
    getByUser: async (user) => {
        return await query2('SELECT * FROM Krug_ban WHERE Krug_user_id = ?',user);
    },
    delete: async (id) => {
        await query2('DELETE FROM Krug_ban WHERE id = ?',id);
        return {msg:'Ban supprimé'}
    }
}
