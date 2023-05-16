const express = require('express');
const router = express.Router();
const nguoiDungController = require('../controllers/nguoiDung.controller.js');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/nguoiDungQuyen.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createNguoiDungSchema, updateNguoiDungSchema, validateLogin } = require('../middleware/validators/nguoiDungValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(nguoiDungController.getAllNguoiDung));
router.get('/ma_nguoi_dung/:ma_nguoi_dung', auth(), awaitHandlerFactory(nguoiDungController.getNguoiDungById)); 
router.get('/ten_dang_nhap/:ten_dang_nhap', auth(), awaitHandlerFactory(nguoiDungController.getNguoiDungByTenDangNhap)); 
router.get('/whoami', auth(), awaitHandlerFactory(nguoiDungController.getCurrentNguoiDung)); 
router.post('/', createNguoiDungSchema, awaitHandlerFactory(nguoiDungController.createNguoiDung)); 
router.patch('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), updateNguoiDungSchema, awaitHandlerFactory(nguoiDungController.updateNguoiDung)); 
router.delete('/ma_nguoi_dung/:ma_nguoi_dung', auth(Role.QTV), awaitHandlerFactory(nguoiDungController.deleteNguoiDung)); 

router.post('/login', validateLogin, awaitHandlerFactory(nguoiDungController.nguoiDungLogin)); 

module.exports = router;