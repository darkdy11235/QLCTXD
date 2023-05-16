-- trigger for hoa-don

CREATE TRIGGER auto_insert_hoa_don BEFORE UPDATE ON phieu_thue_xe
FOR EACH ROW 


CREATE TRIGGER auto_insert_hoa_don
AFTER UPDATE
ON phieu_thue_xe FOR EACH ROW
if (NEW.trang_thai = 'Đã trả') then
    tong_tien = 0;
    
    tong_tien = (select sum(gia_cho_thue_moi_gio * (phieu_thue_xe.gio_tra - phieu_thue_xe.gio_thue))
                from xe , phieu_thue_xe 
                where xe.ma_xe in (select chi_tiet_phieu_thue_Xe.ma_xe
                                    from chi_tiet_phieu_thue_Xe 
                                    where chi_tiet_phieu_thue_Xe.ma_phieu_thue_xe = 1) and phieu_thue_xe.ma_phieu_thue_xe = phieu_thue_xe.ma_phieu_thue_xe;)
    if (
    end if;
    insert into hoa_don (ma_phieu_thue_xe, tong_tien, ngay_lap, trang_thai) values (NEW.ma_phieu_thue_xe, 0, now(), 'Chưa thanh toán');
end if;

select ma_xe
from chi_tiet_phieu_thue_Xe 
where ma_phieu_thue_xe = NEW.ma_phieu_thue_xe;


select gia_cho_thue_moi_gio * (phieu_thue_xe.gio_tra - phieu_thue_xe.gio_thue)
from xe , phieu_thue_xe 
where xe.ma_xe in (select chi_tiet_phieu_thue_Xe.ma_xe
                from chi_tiet_phieu_thue_Xe 
                where chi_tiet_phieu_thue_Xe.ma_phieu_thue_xe = NEW.ma_phieu_thue_xe) and phieu_thue_xe.ma_phieu_thue_xe = phieu_thue_xe.ma_phieu_thue_xe;