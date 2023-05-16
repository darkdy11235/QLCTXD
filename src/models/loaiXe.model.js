const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class LoaiXeModel{
    // ten_loai_xe
    tableName = 'loai_xe';
    primaryKeyName = 'ma_loai_xe';

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
        // return back the first row (loai_xe)
        return result[0];
    }

    create = async ({ten_loai_xe}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ten_loai_xe) VALUES (?)`;

        const result = await query(sql, [ten_loai_xe]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
 
    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${this.primaryKeyName} = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE ${this.primaryKeyName} = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new LoaiXeModel;