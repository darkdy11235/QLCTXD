const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class HoaDonModel{
    // ma_phieu_thue_xe
    // tong_tien
    // ngay_lap
    // trang_thai
    tableName = 'hoa_don';
    primaryKeyName = 'ma_hoa_don';

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
        // return back the first row (hoa_don)
        return result[0];
    }
    
    findHoaDonByMaPhieuThueXe = async (ma_phieu_thue_xe) => {
        const sql = `select sum(gia_cho_thue_moi_gio * (phieu_thue_xe.gio_tra - phieu_thue_xe.gio_thue))
        from xe , phieu_thue_xe 
        where xe.ma_xe in (select chi_tiet_phieu_thue_Xe.ma_xe
                        from chi_tiet_phieu_thue_Xe 
                        where chi_tiet_phieu_thue_Xe.ma_phieu_thue_xe = ?) and phieu_thue_xe.ma_phieu_thue_xe = phieu_thue_xe.ma_phieu_thue_xe;`;
        const result = await query(sql, [ma_phieu_thue_xe]);
        // return back the first row (hoa_don)
        return result[0];
    }

    create = async ({ma_phieu_thue_xe, tong_tien, ngay_lap, trang_thai}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_phieu_thue_xe, tong_tien, ngay_lap, trang_thai) VALUES (?,?,?,?)`;

        const result = await query(sql, [ma_phieu_thue_xe, tong_tien, ngay_lap, trang_thai]);
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

module.exports = new HoaDonModel;