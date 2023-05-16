const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class GioHangModel{
    // ma_nguoi_thue
    // ma_xe
    // ngay_thue
    // ngay_tra
    // gio_thue
    // gio_tra
    tableName = 'gio_hang';
    primaryKeyName = ['ma_nguoi_thue', 'ma_xe'];
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        // return back the first row (gio_hang)
        return result[0];
    }

    create = async ({ma_nguoi_thue, ma_xe, ngay_thue, ngay_tra, gio_thue, gio_tra}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_nguoi_thue, ma_xe, ngay_thue, ngay_tra, gio_thue, gio_tra) VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [ma_nguoi_thue, ma_xe, ngay_thue, ngay_tra, gio_thue, gio_tra]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
 
    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${this.primaryKeyName[0]} = ? AND ${this.primaryKeyName[1]} = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ${this.primaryKeyName[0]} = ? AND ${this.primaryKeyName[1]} = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new GioHangModel;