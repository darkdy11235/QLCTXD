const GioHangModel = require('../models/gioHang.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              GioHang Controller
 ******************************************************************************/
class GioHangController {
    getAllGioHang = async (req, res, next) => {
        let gioHangList = await GioHangModel.find();
        if (!gioHangList.length) {
            throw new HttpException(404, 'GioHang not found');
        }

        res.send(gioHangList);
    };

    getGioHangByMaNguoiThue = async (req, res, next) => {
        const gioHang = await GioHangModel.find({ ma_nguoi_thue: req.params.ma_nguoi_thue });
        if (!gioHang) {
            throw new HttpException(404, 'GioHang not found');
        }
        res.send(gioHang);
    };

    createGioHang = async (req, res, next) => {
        console.log(req.body);
        const result = await GioHangModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('GioHang was created!');
    };

    updateGioHang = async (req, res, next) => {
        const result = await GioHangModel.update(req.body, req.params.ma_nguoi_thue);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'GioHang not found' :
            affectedRows && changedRows ? 'GioHang updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteGioHang = async (req, res, next) => {
        const result = await GioHangModel.delete(req.params.ma_nguoi_thue , req.params.ma_xe);
        if (!result) {
            throw new HttpException(404, 'GioHang not found');
        }
        res.send('GioHang has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new GioHangController;