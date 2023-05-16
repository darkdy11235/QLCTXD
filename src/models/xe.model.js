const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
class XeModel{
    // ma_loai_xe
    // ma_nguoi_cho_thue
    // tieu_de
    // mo_ta
    // anh
    // gia_cho_thue_moi_gio
    // trang_thai
    tableName = 'xe';
    primaryKeyName = 'ma_xe';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findByTime = async ({ngay_thue, gio_thue, ngay_tra, gio_tra}) => {
        // phieu_thue_xe(ma_phieu_thue_xe,ma_nguoi_thue,ngay_thue,ngay_tra,gio_thue,gio_tra,thoi_gian_tra_thuc_te,trang_thai)
        // xe(ma_xe,ma_loai_xe,ma_nguoi_cho_thue,tieu_de,mo_ta,anh,gia_cho_thue_moi_gio,trang_thai)
        // chi_tiet_phieu_thue_xe(ma_phieu_thue_xe,ma_xe,ngay_thue,ngay_tra,gio_thue,gio_tra)
        let sql = `SELECT * FROM ${this.tableName}
        WHERE ma_xe NOT IN (SELECT ctptx_day.ma_xe 
                            FROM (Select * from chi_tiet_phieu_thue_Xe ctptx where ctptx.ngay_thue = ? and ctptx.ngay_tra = ?) ctptx_day
                            WHERE (ctptx_day.gio_thue > ? or ctptx_day.gio_thue < ?) or (ctptx_day.gio_tra > ? or ctptx_day.gio_tra < ?)) AND trang_thai = 1`;
        console.log(ngay_thue, ngay_tra, gio_thue, gio_tra);
        return await query(sql, [ngay_thue, ngay_tra, gio_thue, gio_tra, gio_thue, gio_tra]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        // return back the first row (xe)
        return result[0];
    }

    create = async ({ma_loai_xe, ma_nguoi_cho_thue, tieu_de, mo_ta, anh, gia_cho_thue_moi_gio, trang_thai}) => {
        const sql = `INSERT INTO ${this.tableName}
        (ma_loai_xe, ma_nguoi_cho_thue, tieu_de, mo_ta, anh, gia_cho_thue_moi_gio, trang_thai) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const result = await query(sql, [ma_loai_xe, ma_nguoi_cho_thue, tieu_de, mo_ta, anh, gia_cho_thue_moi_gio, trang_thai]);
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

module.exports = new XeModel;