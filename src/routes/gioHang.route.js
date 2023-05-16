const express = require('express');
const router = express.Router();
const gioHangController = require('../controllers/gioHang.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(gioHangController.getAllGioHang));
router.get('/ma_nguoi_thue/:ma_nguoi_thue', auth(), awaitHandlerFactory(gioHangController.getGioHangByMaNguoiThue));
router.post('/', auth(), awaitHandlerFactory(gioHangController.createGioHang)); 
router.patch('/ma_nguoi_thue/:ma_nguoi_thue', auth(), awaitHandlerFactory(gioHangController.updateGioHang)); 
router.delete('/ma_nguoi_thue/:ma_nguoi_thue/ma_xe/:ma_xe', auth(), awaitHandlerFactory(gioHangController.deleteGioHang));

module.exports = router;