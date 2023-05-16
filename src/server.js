const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const Routes = require('./routes');


// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/nguoi_dung`, Routes.nguoiDung);
app.use(`/api/v1/loai_xe`, Routes.loaiXe);
app.use(`/api/v1/xe`, Routes.xe);
app.use(`/api/v1/phieu_thue_xe`, Routes.phieuThueXe);
app.use(`/api/v1/chi_tiet_phieu_thue_xe`, Routes.chiTietPhieuThueXe);
app.use(`/api/v1/gio_hang`, Routes.gioHang);
app.use(`/api/v1/hoa_don`, Routes.hoaDon);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;