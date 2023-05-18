DROP DATABASE IF EXISTS CTXD;
CREATE DATABASE IF NOT EXISTS CTXD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE CTXD;

CREATE TABLE IF NOT EXISTS nguoi_dung (
    ma_nguoi_dung INT PRIMARY KEY AUTO_INCREMENT,
    ten_dang_nhap VARCHAR(50),
    mat_khau VARCHAR(255),
    ho_va_ten NVARCHAR(50),
    cccd VARCHAR(12),
    sdt VARCHAR(10),
    email VARCHAR(50),
    dia_chi VARCHAR(255),
    trang_thai INT,
    quyen VARCHAR(10)
);

ALTER TABLE nguoi_dung MODIFY quyen ENUM('QTV', 'NCT', 'NT') DEFAULT 'NT';

CREATE TABLE IF NOT EXISTS loai_xe (
    ma_loai_xe INT PRIMARY KEY AUTO_INCREMENT,
    ten_loai_xe VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS xe (
    ma_xe INT PRIMARY KEY AUTO_INCREMENT,
    ma_loai_xe INT,
    ma_nguoi_cho_thue INT,
    tieu_de NVARCHAR(255),
    mo_ta NVARCHAR(255),
    anh VARCHAR(255),
    gia_cho_thue_moi_gio INT,
    trang_thai INT
);

ALTER TABLE xe MODIFY trang_thai ENUM('Chờ duyệt', 'Đã duyệt', 'Đã hủy') DEFAULT 'Chờ duyệt';

ALTER TABLE xe ADD CONSTRAINT fk_xe_loai_xe FOREIGN KEY (ma_loai_xe) REFERENCES loai_xe(ma_loai_xe);
ALTER TABLE xe ADD CONSTRAINT fk_xe_nguoi_cho_thue FOREIGN KEY (ma_nguoi_cho_thue) REFERENCES nguoi_dung(ma_nguoi_dung);

CREATE TABLE IF NOT EXISTS gio_hang (
    ma_nguoi_thue INT,
    ma_xe INT,
    ngay_thue DATE,
    ngay_tra DATE,
    gio_thue INT,
    gio_tra INT,
    PRIMARY KEY (ma_nguoi_thue, ma_xe)
);

ALTER TABLE gio_hang ADD CONSTRAINT fk_gio_hang_nguoi_thue FOREIGN KEY (ma_nguoi_thue) REFERENCES nguoi_dung(ma_nguoi_dung);
ALTER TABLE gio_hang ADD CONSTRAINT fk_gio_hang_xe FOREIGN KEY (ma_xe) REFERENCES xe(ma_xe);

CREATE TABLE IF NOT EXISTS phieu_thue_xe (
    ma_phieu_thue_xe INT PRIMARY KEY AUTO_INCREMENT,
    ma_nguoi_thue INT,
    ngay_thue DATE,
    ngay_tra DATE,
    gio_thue INT,
    gio_tra INT,
    thoi_gian_tra_thuc_te DATETIME,
    trang_thai NVARCHAR(50)
);

ALTER TABLE phieu_thue_xe MODIFY trang_thai ENUM('Đã đặt lịch', 'Đã hủy', 'Đang thuê', 'Đã trả') DEFAULT 'Đã đặt lịch';
ALTER TABLE phieu_thue_xe ADD CONSTRAINT fk_phieu_thue_xe_nguoi_thue FOREIGN KEY (ma_nguoi_thue) REFERENCES nguoi_dung(ma_nguoi_dung);

CREATE TABLE IF NOT EXISTS chi_tiet_phieu_thue_xe (
    ma_phieu_thue_xe INT,
    ma_xe INT,
    ngay_thue DATE,
    ngay_tra DATE,
    gio_thue INT,
    gio_tra INT,
    PRIMARY KEY (ma_phieu_thue_xe, ma_xe)
);
ALTER TABLE chi_tiet_phieu_thue_xe ADD CONSTRAINT fk_chi_tiet_phieu_thue_xe_phieu_thue_xe FOREIGN KEY (ma_phieu_thue_xe) REFERENCES phieu_thue_xe(ma_phieu_thue_xe);
ALTER TABLE chi_tiet_phieu_thue_xe ADD CONSTRAINT fk_chi_tiet_phieu_thue_xe_xe FOREIGN KEY (ma_xe) REFERENCES xe(ma_xe);

CREATE TABLE IF NOT EXISTS hoa_don (
ma_hoa_don INT PRIMARY KEY AUTO_INCREMENT,
ma_phieu_thue_xe INT,
tong_tien INT,
ngay_lap DATETIME,
trang_thai NVARCHAR(50)
);
ALTER TABLE hoa_don MODIFY trang_thai ENUM('Đã thanh toán', 'Chưa thanh toán') DEFAULT 'Chưa thanh toán';
ALTER TABLE hoa_don ADD CONSTRAINT fk_hoa_don_phieu_thue_xe FOREIGN KEY (ma_phieu_thue_xe) REFERENCES phieu_thue_xe(ma_phieu_thue_xe);

INSERT INTO loai_xe (ten_loai_xe) VALUES
(N'Xe địa hình'),
(N'Xe đạp đua'),
(N'Xe đạp thể thao'),
(N'Xe đạp trợ lực điện'),
(N'Xe đạp trẻ em'),
(N'Xe đạp gấp'),
(N'Xe đạp du lịch'),
(N'Xe đạp leo núi'),
(N'Xe đạp đường phố');

INSERT INTO nguoi_dung (ten_dang_nhap, mat_khau, ho_va_ten, cccd, sdt, email, dia_chi, trang_thai, quyen) VALUES
('admin', '$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe', 'admin', '1234567890', '0999999999', 'admin@gmail.com', 'admin', 1, 'QTV'),
('user', '$2a$08$VfKxHZgyssybzNdn/Cgf2eVs8L4zNV4sME.50p6f5Paq8jFlqBRjW', 'user', '1234567891', '0999999998', 'user@gmail.com', 'user', 1, 'NT'),
('suser', '$2a$08$PsOfo.4VFJ3HIES2HrXRoe79u3m8iXZg5j8tHkZtqC6yUpKihI2zG', 'suser', '1234567892', '0999999997', 'suser@gmail.com', 'suser', 1, 'NCT');

INSERT INTO xe (ma_loai_xe, ma_nguoi_cho_thue, tieu_de, mo_ta, anh, gia_cho_thue_moi_gio, trang_thai) VALUES
(1, 3, N'Xe địa hình 1', N'Xe địa hình 1', 'https://cdn.tgdd.vn/Files/2021/07/20/1369474/phan-loai-cac-dong-xe-dap-pho-bien-tren-thi-5.png', 50000, 1),
(2, 3, N'Xe đạp đua 1', N'Xe đạp đua 1', 'https://cdn.tgdd.vn/Files/2021/07/20/1369474/phan-loai-cac-dong-xe-dap-pho-bien-tren-thi-8.jpg', 100000, 1);

INSERT INTO phieu_thue_xe (ma_nguoi_thue, ngay_thue, ngay_tra, gio_thue, gio_tra, trang_thai) VALUES
(2, '2023-08-14', '2023-08-14', 8, 9, N'Đã đặt lịch');

INSERT INTO chi_tiet_phieu_thue_xe (ma_phieu_thue_xe, ma_xe, ngay_thue, ngay_tra, gio_thue, gio_tra) VALUES
(1, 1, '2023-08-14', '2023-08-14', 8, 9),
(1, 2, '2023-08-14', '2023-08-14', 8, 9);