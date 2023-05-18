const express = require('express');
const router = express.Router();
const phieuThueXeController = require('../controllers/phieuThueXe.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(phieuThueXeController.getAllPhieuThueXe)); 
router.get('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(phieuThueXeController.getPhieuThueXeById));
router.get('/ma_nguoi_thue/:ma_nguoi_thue', auth(), awaitHandlerFactory(phieuThueXeController.getPhieuThueXeByMaNguoiThue));
router.get('/ngay_thue/:ngay_thue', auth(), awaitHandlerFactory(phieuThueXeController.getPhieuThueXeByNgayThue));
router.get('/ngay_tra/:ngay_tra', auth(), awaitHandlerFactory(phieuThueXeController.getPhieuThueXeByNgayTra));
router.get('/trang_thai/:trang_thai', auth(), awaitHandlerFactory(phieuThueXeController.getPhieuThueXeByTrangThai));
router.post('/', awaitHandlerFactory(phieuThueXeController.createPhieuThueXe)); 
router.patch('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(phieuThueXeController.updatePhieuThueXe)); 
router.delete('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(phieuThueXeController.deletePhieuThueXe));

module.exports = router;