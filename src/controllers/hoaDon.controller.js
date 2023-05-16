const HoaDonModel = require('../models/hoaDon.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              HoaDon Controller
 ******************************************************************************/
class HoaDonController {
    getAllHoaDon = async (req, res, next) => {
        let hoaDonList = await HoaDonModel.find();
        if (!hoaDonList.length) {
            throw new HttpException(404, 'HoaDon not found');
        }

        res.send(hoaDonList);
    };

    getHoaDonByMaPhieuThueXe = async (req, res, next) => {
        const hoaDon = await HoaDonModel.findOne({ ma_phieu_thue_xe: req.params.ma_phieu_thue_xe });
        if (!hoaDon) {
            throw new HttpException(404, 'HoaDon not found');
        }
        res.send(hoaDon);
    };

    getHoaDonByNgayLap = async (req, res, next) => {
        const hoaDon = await HoaDonModel.find({ ngay_lap: req.params.ngay_lap });
        if (!hoaDon) {
            throw new HttpException(404, 'HoaDon not found');
        }
        res.send(hoaDon);
    };

    getHoaDonByTrangThai = async (req, res, next) => {
        const hoaDon = await HoaDonModel.find({ trang_thai: req.params.trang_thai });
        if (!hoaDon) {
            throw new HttpException(404, 'HoaDon not found');
        }
        res.send(hoaDon);
    };

    createHoaDon = async (req, res, next) => {
        console.log(req.body);
        const result = await HoaDonModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('HoaDon was created!');
    };

    updateHoaDon = async (req, res, next) => {
        const result = await HoaDonModel.update(req.body, req.params.ma_hoa_don);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'HoaDon not found' :
            affectedRows && changedRows ? 'HoaDon updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteHoaDon = async (req, res, next) => {
        const result = await HoaDonModel.delete(req.params.ma_hoa_don);
        if (!result) {
            throw new HttpException(404, 'HoaDon not found');
        }
        res.send('HoaDon has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new HoaDonController;