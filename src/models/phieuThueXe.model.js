const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
class PhieuThueXeModel {
  // ma_nguoi_thue
  // ngay_thue
  // ngay_tra
  // gio_thue
  // gio_tra
  // thoi_gian_tra_thuc_te
  // trang_thai
  tableName = "phieu_thue_xe";
  primaryKeyName = "ma_phieu_thue_xe";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
    const result = await query(sql, [...values]);
    // return back the first row (phieu_thue_xe)
    return result[0];
  };

  create = async ({
    ma_nguoi_thue,
    ngay_thue,
    ngay_tra,
    gio_thue,
    gio_tra,
    thoi_gian_tra_thuc_te,
    trang_thai,
  }) => {
    const sql = `INSERT INTO ${this.tableName}
        (ma_nguoi_thue, ngay_thue, ngay_tra, gio_thue, gio_tra, thoi_gian_tra_thuc_te, trang_thai) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      ma_nguoi_thue,
      ngay_thue,
      ngay_tra,
      gio_thue,
      gio_tra,
      thoi_gian_tra_thuc_te,
      trang_thai,
    ]);
    const { insertId } = result;
    return insertId;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE ${this.primaryKeyName} = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
        WHERE ${this.primaryKeyName} = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new PhieuThueXeModel();
