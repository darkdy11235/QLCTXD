const express = require('express');
const router = express.Router();
const xeController = require('../controllers/xe.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(xeController.getAllXe)); 
router.get('/ma_xe/:ma_xe', auth(), awaitHandlerFactory(xeController.getXeById));
router.get('/ma_nguoi_cho_thue/:ma_nguoi_cho_thue', auth(), awaitHandlerFactory(xeController.getXeByNguoiChoThue));
router.get('/trang_thai/:trang_thai', awaitHandlerFactory(xeController.getXeByTrangThai));
router.get('/ngay_thue/:ngay_thue/gio_thue/:gio_thue/ngay_tra/:ngay_tra/gio_tra/:gio_tra', awaitHandlerFactory(xeController.getXeByTime));
router.post('/', auth(), awaitHandlerFactory(xeController.createXe)); 
router.patch('/ma_xe/:ma_xe', auth(), awaitHandlerFactory(xeController.updateXe)); 
router.delete('/ma_xe/:ma_xe', auth(), awaitHandlerFactory(xeController.deleteXe));

module.exports = router;