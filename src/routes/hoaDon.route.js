const express = require('express');
const router = express.Router();
const hoaDonController = require('../controllers/hoaDon.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(hoaDonController.getAllHoaDon));
router.get('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(hoaDonController.getHoaDonByMaPhieuThueXe));
router.get('/ngay_lap/:ngay_lap', auth(), awaitHandlerFactory(hoaDonController.getHoaDonByNgayLap));
router.get('/trang_thai/:trang_thai', auth(), awaitHandlerFactory(hoaDonController.getHoaDonByTrangThai));
router.post('/', auth(), awaitHandlerFactory(hoaDonController.createHoaDon)); 
router.patch('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(hoaDonController.updateHoaDon)); 
router.delete('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(hoaDonController.deleteHoaDon));

module.exports = router;