const express = require('express');
const router = express.Router();
const chiTietPhieuThueXeController = require('../controllers/chiTietPhieuThueXe.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/', awaitHandlerFactory(chiTietPhieuThueXeController.getAllChiTietPhieuThueXe));
router.get('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(chiTietPhieuThueXeController.getChiTietPhieuThueXeByMaPhieuThueXe));
router.post('/', auth(), awaitHandlerFactory(chiTietPhieuThueXeController.createChiTietPhieuThueXe)); 
router.patch('/ma_phieu_thue_xe/:ma_phieu_thue_xe', auth(), awaitHandlerFactory(chiTietPhieuThueXeController.updateChiTietPhieuThueXe)); 
router.delete('/ma_phieu_thue_xe/:ma_phieu_thue_xe/ma_xe/:ma_xe', auth(), awaitHandlerFactory(chiTietPhieuThueXeController.deleteChiTietPhieuThueXe));

module.exports = router;