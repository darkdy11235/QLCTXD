drop database if exists CTXD;
create database if not exists CTXD;

use CTXD;
ALTER DATABASE CTXD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
create table if not exists nguoi_dung (
    ma_nguoi_dung int primary key auto_increment,
    ten_dang_nhap varchar(50)  ,
    mat_khau varchar(255)  ,
    ho_va_ten nvarchar(50)  ,
    cccd varchar(12)  ,
    sdt varchar(10)  ,
    email varchar(50)  ,
    dia_chi varchar(255)  ,
    trang_thai int  ,
    quyen varchar(10)  
);

-- alter quyen column in table nguoi_dung = quyen enum('QTV', 'NCT', 'NT') default 'NT' --
alter table nguoi_dung modify quyen enum('QTV', 'NCT', 'NT') default 'NT';


-- create table if not exists nguoi_thue (
--     ma_nguoi_thue int primary key auto_increment,
--     ho_va_ten nvarchar(50)  ,
--     cccd varchar(12)  ,
--     sdt varchar(10)  ,
--     email varchar(50)  ,
--     ma_nguoi_dung int  
-- );

-- -- add foreign key constraint to table nguoi_thue --
-- alter table nguoi_thue add constraint fk_nguoi_thue_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

-- create table if not exists nguoi_cho_thue (
--     ma_nguoi_cho_thue int primary key auto_increment,
--     ho_va_ten nvarchar(50)  ,
--     cccd varchar(12)  ,
--     sdt varchar(10)  ,
--     email varchar(50)  ,
--     dia_chi varchar(255)  ,
--     ma_nguoi_dung int  
-- );

-- -- add foreign key constraint to table nguoi_cho_thue --
-- alter table nguoi_cho_thue add constraint fk_nguoi_cho_thue_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

create table if not exists loai_xe (
    ma_loai_xe int primary key auto_increment,
    ten_loai_xe nvarchar(50)  
);

create table if not exists xe (
    ma_xe int primary key auto_increment,
    ma_loai_xe int  ,
    ma_nguoi_cho_thue int  ,
    tieu_de nvarchar(255)  ,
    mo_ta nvarchar(255)  ,
    anh varchar(255)  ,
    gia_cho_thue_moi_gio int  ,
    trang_thai int   
);

-- alter trang_thai column in table xe = trang_thai enum('Chờ duyệt', 'Đã duyệt', 'Đã hủy') default 'Chờ duyệt' --

-- add foreign key constraint to table xe --
alter table xe add constraint fk_xe_loai_xe foreign key (ma_loai_xe) references loai_xe(ma_loai_xe);

-- add foreign key constraint to table xe --
alter table xe add constraint fk_xe_nguoi_cho_thue foreign key (ma_nguoi_cho_thue) references nguoi_dung(ma_nguoi_dung);

create table if not exists gio_hang (
    ma_nguoi_thue int  ,
    ma_xe int  ,
    ngay_thue date  ,
    ngay_tra date  ,
    gio_thue int  ,
    gio_tra int  ,
    primary key (ma_nguoi_thue, ma_xe)
);

-- add foreign key constraint to table gio_hang --
alter table gio_hang add constraint fk_gio_hang_nguoi_thue foreign key (ma_nguoi_thue) references nguoi_dung(ma_nguoi_dung);
alter table gio_hang add constraint fk_gio_hang_xe foreign key (ma_xe) references xe(ma_xe);

create table if not exists phieu_thue_xe (
    ma_phieu_thue_xe int primary key auto_increment,
    ma_nguoi_thue int  ,
    ngay_thue date  ,
    ngay_tra date  ,
    gio_thue int  ,
    gio_tra int  ,
    thoi_gian_tra_thuc_te datetime,
    trang_thai nvarchar(50)
);

-- alter trang_thai column in table enum('Đã đặt lịch', 'Đã hủy', 'Đang thuê', 'Đã trả') default 'Đã đặt lịch' --
ALTER TABLE phieu_thue_xe MODIFY trang_thai ENUM('Đã đặt lịch', 'Đã hủy', 'Đang thuê', 'Đã trả') DEFAULT 'Đã đặt lịch';


-- add foreign key constraint to table phieu_thue_xe --
alter table phieu_thue_xe add constraint fk_phieu_thue_xe_nguoi_thue foreign key (ma_nguoi_thue) references nguoi_dung(ma_nguoi_dung);

create table if not exists chi_tiet_phieu_thue_Xe (
    ma_phieu_thue_xe int  ,
    ma_xe int  ,
    ngay_thue date  ,
    ngay_tra date  ,
    gio_thue int  ,
    gio_tra int  ,
    primary key (ma_phieu_thue_xe, ma_xe)
);

-- add foreign key constraint to table chi_tiet_phieu_thue_Xe --
alter table chi_tiet_phieu_thue_Xe add constraint fk_chi_tiet_phieu_thue_Xe_phieu_thue_xe foreign key (ma_phieu_thue_xe) references phieu_thue_xe(ma_phieu_thue_xe);
alter table chi_tiet_phieu_thue_Xe add constraint fk_chi_tiet_phieu_thue_Xe_xe foreign key (ma_xe) references xe(ma_xe);

create table if not exists hoa_don (
    ma_hoa_don int primary key auto_increment,
    ma_phieu_thue_xe int  ,
    tong_tien int  ,
    ngay_lap datetime  ,
    trang_thai nvarchar(50)   
);

-- alter trang_thai column in table hoa_don = trang_thai enum('Đã thanh toán', 'Chưa thanh toán') default 'Chưa thanh toán' --
alter table hoa_don modify trang_thai enum('Đã thanh toán', 'Chưa thanh toán') default 'Chưa thanh toán';

-- add foreign key constraint to table hoa_don --
alter table hoa_don add constraint fk_hoa_don_phieu_thue_xe foreign key (ma_phieu_thue_xe) references phieu_thue_xe(ma_phieu_thue_xe);


insert into loai_xe (ten_loai_xe) values (N'Xe địa hình'),
                                    (N'Xe đạp đua'),
                                    (N'Xe đạp thể thao'),
                                    (N'Xe đạp trợ lực điện'),
                                    (N'Xe đạp trẻ em'),
                                    (N'Xe đạp gấp'),
                                    (N'Xe đạp du lịch'),
                                    (N'Xe đạp leo núi'),
                                    (N'Xe đạp đường phố');

insert into nguoi_dung (ten_dang_nhap, mat_khau, ho_va_ten, cccd, sdt, email, dia_chi, trang_thai, quyen) values ('admin123', '$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe', 'admin', '1234567890', '0999999999', 'admin@gmail.com', 'admin', 1, 'QTV'),
                                                                                                                    ('user123', '$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe', 'user', '1234567891', '0999999998', 'user@gmail.com', 'user', 1, 'NT'),
                                                                                                                    ('suser123', '$2a$08$/62J/aKYb0hJSLsWX64QNuExUdMvw0hqoIvoiXjOzLL3akbTOQJFe', 'suser', '1234567892', '0999999997', 'suser@gmail.com', 'suser', 1, 'NCT');

insert into xe (ma_loai_xe, ma_nguoi_cho_thue, tieu_de, mo_ta, anh, gia_cho_thue_moi_gio, trang_thai) values (1, 3, N'Xe địa hình 1', N'Xe địa hình 1', 'https://cdn.tgdd.vn/Files/2021/07/20/1369474/phan-loai-cac-dong-xe-dap-pho-bien-tren-thi-5.png', 50000, 1),
                                                                                                        (2, 3, N'Xe đạp đua 1', N'Xe đạp đua 1', 'https://cdn.tgdd.vn/Files/2021/07/20/1369474/phan-loai-cac-dong-xe-dap-pho-bien-tren-thi-8.jpg', 100000,1);

insert into phieu_thue_xe(ma_nguoi_thue,ngay_thue,ngay_tra,gio_thue,gio_tra,trang_thai) values (2, '20230814', '20230814', 8,9,N'Đã đặt lịch');

insert into chi_tiet_phieu_thue_Xe(ma_phieu_thue_xe,ma_xe,ngay_thue,ngay_tra,gio_thue,gio_tra) values (1,1,'20230814','20230814',8,9),
                                                                                                        (1,2,'20230814','20230814',8,9);

DELIMITER //

CREATE TRIGGER auto_insert_hoa_don
AFTER UPDATE
ON phieu_thue_xe FOR EACH ROW
BEGIN
    -- Check if the new value of 'trang_thai' is 'Đã trả'
    IF (NEW.trang_thai = 'Đã trả') THEN
        -- Insert a new record into the 'hoa_don' table
        INSERT INTO hoa_don (ma_phieu_thue_xe, tong_tien, ngay_lap, trang_thai)
        VALUES (
            NEW.ma_phieu_thue_xe,
            (SELECT SUM(gia_cho_thue_moi_gio * (phieu_thue_xe.gio_tra - phieu_thue_xe.gio_thue))
            FROM xe, phieu_thue_xe
            WHERE xe.ma_xe IN (
                SELECT chi_tiet_phieu_thue_Xe.ma_xe
                FROM chi_tiet_phieu_thue_Xe
                WHERE chi_tiet_phieu_thue_Xe.ma_phieu_thue_xe = NEW.ma_phieu_thue_xe
            )
            AND phieu_thue_xe.ma_phieu_thue_xe = phieu_thue_xe.ma_phieu_thue_xe),
            NOW(),
            N'Chưa thanh toán'
        );
    END IF;
END //

DELIMITER ;



