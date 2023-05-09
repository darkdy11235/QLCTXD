drop database if exists CTXD;
create database if not exists CTXD;

use CTXD;

create table if not exists nguoi_dung (
    ma_nguoi_dung int primary key auto_increment,
    ten_dang_nhap varchar(50) not null,
    mat_khau varchar(255) not null,
    trang_thai varchar(50) not null,
    quyen varchar(10) not null
);

-- alter quyen column in table nguoi_dung = quyen enum('QTV', 'NCT', 'NT') default 'NT' --
alter table nguoi_dung modify quyen enum('QTV', 'NCT', 'NT') default 'NT';

-- alter trang_thai column in table nguoi_dung = trang_thai enum('Đang hoạt động', 'Đã khóa') default 'Đang hoạt động' --
alter table nguoi_dung modify trang_thai enum('Đang hoạt động', 'Đã khóa') default 'Đang hoạt động';

create table if not exists nguoi_thue (
    ma_nguoi_thue int primary key auto_increment,
    ho_va_ten nvarchar(50) not null,
    cccd varchar(12) not null,
    sdt varchar(10) not null,
    email varchar(50) not null,
    ma_nguoi_dung int not null
);

-- add foreign key constraint to table nguoi_thue --
alter table nguoi_thue add constraint fk_nguoi_thue_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

create table if not exists nguoi_cho_thue (
    ma_nguoi_cho_thue int primary key auto_increment,
    ho_va_ten nvarchar(50) not null,
    cccd varchar(12) not null,
    sdt varchar(10) not null,
    email varchar(50) not null,
    dia_chi varchar(255) not null,
    ma_nguoi_dung int not null
);

-- add foreign key constraint to table nguoi_cho_thue --
alter table nguoi_cho_thue add constraint fk_nguoi_cho_thue_nguoi_dung foreign key (ma_nguoi_dung) references nguoi_dung(ma_nguoi_dung);

create table if not exists loai_xe (
    ma_loai_xe int primary key auto_increment,
    ten_loai varchar(50) not null
);

create table if not exists xe (
    ma_xe int primary key auto_increment,
    ma_loai_xe int not null,
    ma_nguoi_cho_thue int not null,
    tieu_de nvarchar(255) not null,
    mo_ta nvarchar(255) not null,
    anh varchar(255) not null,
    gia_cho_thue_moi_gio int not null,
    trang_thai nvarchar(50) not null 
);

-- alter trang_thai column in table xe = trang_thai enum('Chờ duyệt', 'Đã duyệt', 'Đã hủy') default 'Chờ duyệt' --
alter table xe modify trang_thai enum('Chờ duyệt', 'Đã duyệt', 'Đã hủy') default 'Chờ duyệt';

-- add foreign key constraint to table xe --
alter table xe add constraint fk_xe_loai_xe foreign key (ma_loai_xe) references loai_xe(ma_loai_xe);

-- add foreign key constraint to table xe --
alter table xe add constraint fk_xe_nguoi_cho_thue foreign key (ma_nguoi_cho_thue) references nguoi_cho_thue(ma_nguoi_cho_thue);

create table if not exists gio_hang (
    ma_nguoi_thue int not null,
    ma_xe int not null,
    ngay_thue date not null,
    ngay_tra date not null,
    gio_thue int not null,
    gio_tra int not null,
    primary key (ma_nguoi_thue, ma_xe)
);

-- add foreign key constraint to table gio_hang --
alter table gio_hang add constraint fk_gio_hang_nguoi_thue foreign key (ma_nguoi_thue) references nguoi_thue(ma_nguoi_thue);
alter table gio_hang add constraint fk_gio_hang_xe foreign key (ma_xe) references xe(ma_xe);

create table if not exists phieu_thue_xe (
    ma_phieu_thue_xe int primary key auto_increment,
    ma_nguoi_thue int not null,
    ngay_thue date not null,
    ngay_tra date not null,
    gio_thue int not null,
    gio_tra int not null,
    thoi_gian_tra_thuc_te datetime,
    trang_thai nvarchar(50) not null 
);

-- alter trang_thai column in table enum('Đã đặt lịch', 'Đã hủy', 'Đang thuê', 'Đã trả') default 'Đã đặt lịch' --
alter table phieu_thue_xe modify trang_thai enum('Đã đặt lịch', 'Đã hủy', 'Đang thuê', 'Đã trả') default 'Đã đặt lịch';

-- add foreign key constraint to table phieu_thue_xe --
alter table phieu_thue_xe add constraint fk_phieu_thue_xe_nguoi_thue foreign key (ma_nguoi_thue) references nguoi_thue(ma_nguoi_thue);

create table if not exists chi_tiet_phieu_thue_Xe (
    ma_phieu_thue_xe int not null,
    ma_xe int not null
);

-- add foreign key constraint to table chi_tiet_phieu_thue_Xe --
alter table chi_tiet_phieu_thue_Xe add constraint fk_chi_tiet_phieu_thue_Xe_phieu_thue_xe foreign key (ma_phieu_thue_xe) references phieu_thue_xe(ma_phieu_thue_xe);
alter table chi_tiet_phieu_thue_Xe add constraint fk_chi_tiet_phieu_thue_Xe_xe foreign key (ma_xe) references xe(ma_xe);

create table if not exists hoa_don (
    ma int primary key auto_increment,
    ma_phieu_thue_xe int not null,
    tong_tien int not null,
    ngay_lap datetime not null,
    trang_thai nvarchar(50) not null 
);

-- alter trang_thai column in table hoa_don = trang_thai enum('Đã thanh toán', 'Chưa thanh toán') default 'Chưa thanh toán' --
alter table hoa_don modify trang_thai enum('Đã thanh toán', 'Chưa thanh toán') default 'Chưa thanh toán';

-- add foreign key constraint to table hoa_don --
alter table hoa_don add constraint fk_hoa_don_phieu_thue_xe foreign key (ma_phieu_thue_xe) references phieu_thue_xe(ma_phieu_thue_xe);

-- alter tong_tien column in table hoa_don = thoi_gian_thue * gia_cho_thue_moi_gio + thoi_gian_thue_qua_han * gia_cho_thue_moi_gio * 1.5 --
-- alter table hoa_don add column thoi_gian_thue int not null;
-- alter table hoa_don add column thoi_gian_thue_qua_han int not null;
-- alter table hoa_don add column gia_cho_thue_moi_gio int not null;
-- alter table hoa_don add column gia_cho_thue_moi_gio_qua_han int not null;
-- update hoa_don set thoi_gian_thue = (select (ngay_tra - ngay_thue)*24 + gio_tra - gio_thue from phieu_thue_xe where phieu_thue_xe.ma = hoa_don.ma_phieu_thue_xe);
-- update hoa_don set thoi_gian_thue_qua_han = (select (day(thoi_gian_tra_thuc_te) - day(ngay_tra))*24 + hour(thoi_gian_tra_thuc_te) - gio_tra from phieu_thue_xe where phieu_thue_xe.ma = hoa_don.ma_phieu_thue_xe);
-- update hoa_don set gia_cho_thue_moi_gio = (select gia_cho_thue_moi_gio from xe where xe.ma = (select ma_xe from chi_tiet_phieu_thue_xe where chi_tiet_phieu_thue_xe.ma_phieu_thue_xe = hoa_don.ma_phieu_thue_xe));
-- update hoa_don set gia_cho_thue_moi_gio_qua_han = (select gia_cho_thue_moi_gio*1.5 from xe where xe.ma = (select ma_xe from chi_tiet_phieu_thue_xe where chi_tiet_phieu_thue_xe.ma_phieu_thue_xe = hoa_don.ma_phieu_thue_xe));