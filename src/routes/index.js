const routers = {};

routers.nguoiDung = require('./nguoiDung.route');
routers.loaiXe = require('./loaiXe.route');
routers.xe = require('./xe.route');
routers.phieuThueXe = require('./phieuThueXe.route');
routers.chiTietPhieuThueXe = require('./chiTietPhieuThueXe.route');
routers.gioHang = require('./gioHang.route');
routers.hoaDon = require('./hoaDon.route');

module.exports = routers;