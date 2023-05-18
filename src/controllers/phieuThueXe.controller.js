const PhieuThueXeModel = require("../models/phieuThueXe.model");
const HttpException = require("../utils/HttpException.utils");
const { validationResult } = require("express-validator");
const Quyen = require("../utils/nguoiDungQuyen.utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              PhieuThueXe Controller
 ******************************************************************************/
class PhieuThueXeController {
  getAllPhieuThueXe = async (req, res, next) => {
    let phieuThueXeList = await PhieuThueXeModel.find();
    if (!phieuThueXeList.length) {
      throw new HttpException(404, "PhieuThueXe not found");
    }

    res.send(phieuThueXeList);
  };

  getPhieuThueXeById = async (req, res, next) => {
    const phieuThueXe = await PhieuThueXeModel.findOne({
      ma_phieu_thue_xe: req.params.ma_phieu_thue_xe,
    });
    if (!phieuThueXe) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send(phieuThueXe);
  };

  getPhieuThueXeByMaNguoiThue = async (req, res, next) => {
    const phieuThueXe = await PhieuThueXeModel.find({
      ma_nguoi_thue: req.params.ma_nguoi_thue,
    });
    if (!phieuThueXe) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send(phieuThueXe);
  };

  getPhieuThueXeByNgayThue = async (req, res, next) => {
    const phieuThueXe = await PhieuThueXeModel.find({
      ngay_thue: req.params.ngay_thue,
    });
    if (!phieuThueXe) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send(phieuThueXe);
  };

  getPhieuThueXeByNgayTra = async (req, res, next) => {
    const phieuThueXe = await PhieuThueXeModel.find({
      ngay_tra: req.params.ngay_tra,
    });
    if (!phieuThueXe) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send(phieuThueXe);
  };

  getPhieuThueXeByTrangThai = async (req, res, next) => {
    const phieuThueXe = await PhieuThueXeModel.find({
      trang_thai: req.params.trang_thai,
    });
    if (!phieuThueXe) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send(phieuThueXe);
  };

  createPhieuThueXe = async (req, res, next) => {
    console.log(req.body);
    const result = await PhieuThueXeModel.create(req.body);
    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }
    res.status(201).send({
      ma_phieu_thue_xe: result,
    });
  };

  updatePhieuThueXe = async (req, res, next) => {
    const result = await PhieuThueXeModel.update(
      restOfUpdates,
      req.params.ma_phieu_thue_xe
    );
    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "PhieuThueXe not found"
      : affectedRows && changedRows
      ? "PhieuThueXe updated successfully"
      : "Updated faild";

    res.send({ message, info });
  };

  deletePhieuThueXe = async (req, res, next) => {
    const result = await PhieuThueXeModel.delete(req.params.ma_phieu_thue_xe);
    if (!result) {
      throw new HttpException(404, "PhieuThueXe not found");
    }
    res.send("PhieuThueXe has been deleted");
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PhieuThueXeController();
