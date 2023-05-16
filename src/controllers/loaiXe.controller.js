const LoaiXeModel = require('../models/loaiXe.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const Quyen = require('../utils/nguoiDungQuyen.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              LoaiXe Controller
 ******************************************************************************/
class LoaiXeController {
    getAllLoaiXe = async (req, res, next) => {
        let loaiXeList = await LoaiXeModel.find();
        if (!loaiXeList.length) {
            throw new HttpException(404, 'LoaiXe not found');
        }

        res.send(loaiXeList);
    };

    getLoaiXeById = async (req, res, next) => {
        const loaiXe = await LoaiXeModel.findOne({ ma_loai_xe: req.params.ma_loai_xe });
        if (!loaiXe) {
            throw new HttpException(404, 'LoaiXe not found');
        }
        res.send(loaiXe);
    };

    createLoaiXe = async (req, res, next) => {
        console.log(req.body);
        const result = await LoaiXeModel.create(req.body);
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }
        res.status(201).send('LoaiXe was created!');
    };

    updateLoaiXe = async (req, res, next) => {
        const result = await LoaiXeModel.update(req.body, req.params.ma_loai_xe);
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'LoaiXe not found' :
            affectedRows && changedRows ? 'LoaiXe updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteLoaiXe = async (req, res, next) => {
        const result = await LoaiXeModel.delete(req.params.ma_loai_xe);
        if (!result) {
            throw new HttpException(404, 'LoaiXe not found');
        }
        res.send('LoaiXe has been deleted');
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new LoaiXeController;