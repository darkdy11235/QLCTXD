const XeModel = require('../models/xe.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Xe Controller
 ******************************************************************************/
class XeController {
    getAllXe = async (req, res, next) => {
        let xeList = await XeModel.find();
        if (!xeList.length) {
            throw new HttpException(404, 'Xe not found');
        }

        res.send(xeList);
    };

    getXeById = async (req, res, next) => {
        const xe = await XeModel.findOne({ ma_xe: req.params.ma_xe });
        if (!xe) {
            throw new HttpException(404, 'Xe not found');
        }
        res.send(xe);
    };

    getXeByNguoiChoThue = async (req, res, next) => {   
        const xe = await XeModel.find({ ma_nguoi_cho_thue: req.params.ma_nguoi_cho_thue });
        if (!xe) {
            throw new HttpException(404, 'Xe not found');
        }
        res.send(xe);
    };

    getXeByTrangThai = async (req, res, next) => {
        const xe = await XeModel.find({ trang_thai: req.params.trang_thai });
        if (!xe) {
            throw new HttpException(404, 'Xe not found');
        }
        res.send(xe);
    };

    getXeByTime = async (req, res, next) => {
        const xe = await XeModel.findByTime({ ngay_thue: req.params.ngay_thue , gio_thue: req.params.gio_thue , ngay_tra: req.params.ngay_tra , gio_tra: req.params.gio_tra });
        if (!xe) {
            throw new HttpException(404, 'Xe not found');
        }
        res.send(xe);
    };

    createXe = async (req, res, next) => {
        console.log(req.body);
        const result = await XeModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('Xe was created!');
    };

    updateXe = async (req, res, next) => {
        const result = await XeModel.update(restOfUpdates, req.params.ma_xe);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Xe not found' :
            affectedRows && changedRows ? 'Xe updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteXe = async (req, res, next) => {
        const result = await XeModel.delete(req.params.ma_xe);
        if (!result) {
            throw new HttpException(404, 'Xe not found');
        }
        res.send('Xe has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new XeController;