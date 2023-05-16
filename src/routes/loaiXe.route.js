const express = require('express');
const router = express.Router();
const loaiXeController = require('../controllers/loaiXe.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(loaiXeController.getAllLoaiXe)); 
router.get('/ma_loai_xe/:ma_loai_xe', auth(), awaitHandlerFactory(loaiXeController.getLoaiXeById));
router.post('/', auth(), awaitHandlerFactory(loaiXeController.createLoaiXe)); 
router.patch('/ma_loai_xe/:ma_loai_xe', auth(Role.QTV), awaitHandlerFactory(loaiXeController.updateLoaiXe)); 
router.delete('/ma_loai_xe/:ma_loai_xe', auth(Role.QTV), awaitHandlerFactory(loaiXeController.deleteLoaiXe));

module.exports = router;