const ChiTietPhieuThueXeModel = require('../models/chiTietPhieuThueXe.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              ChiTietPhieuThueXe Controller
 ******************************************************************************/
class ChiTietPhieuThueXeController {
    getAllChiTietPhieuThueXe = async (req, res, next) => {
        let chiTietPhieuThueXeList = await ChiTietPhieuThueXeModel.find();
        if (!chiTietPhieuThueXeList.length) {
            throw new HttpException(404, 'ChiTietPhieuThueXe not found');
        }

        res.send(chiTietPhieuThueXeList);
    };

    getChiTietPhieuThueXeByMaPhieuThueXe = async (req, res, next) => {
        const chiTietPhieuThueXe = await ChiTietPhieuThueXeModel.findOne({ ma_phieu_thue_xe: req.params.ma_phieu_thue_xe, ma_xe : req.params.ma_xe });
        if (!chiTietPhieuThueXe) {
            throw new HttpException(404, 'ChiTietPhieuThueXe not found');
        }
        res.send(chiTietPhieuThueXe);
    };

    createChiTietPhieuThueXe = async (req, res, next) => {
        console.log(req.body);
        const result = await ChiTietPhieuThueXeModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('ChiTietPhieuThueXe was created!');
    };

    updateChiTietPhieuThueXe = async (req, res, next) => {
        const result = await ChiTietPhieuThueXeModel.update(req.body, req.params.ma_phieu_thue_xe, req.params.ma_xe);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'ChiTietPhieuThueXe not found' :
            affectedRows && changedRows ? 'ChiTietPhieuThueXe updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteChiTietPhieuThueXe = async (req, res, next) => {
        const result = await ChiTietPhieuThueXeModel.delete(req.params.ma_phieu_thue_xe);
        if (!result) {
            throw new HttpException(404, 'ChiTietPhieuThueXe not found');
        }
        res.send('ChiTietPhieuThueXe has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ChiTietPhieuThueXeController;