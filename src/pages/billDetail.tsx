import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BuillDetailPage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="page-1 flex flex-col gap-4 mb-[32px]">
        <h3 className="text-[#0076B7] text-lg font-medium text-center">
          Hệ thống đang ghi nhận thanh toán
        </h3>
        <p className="text-[#000] text-sm font-normal text-center">
          Xin quý khách vui lòng chờ trong giây lát
        </p>
        <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin đơn hàng
          </h3>
          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Mã đơn hàng</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                VF123456789
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Tình trạng thanh toán
              </p>
            </div>
            <div>
              <p className="text-[#FAAD14] text-sm font-semibold max-w-[190px] text-right">
                Chưa thanh toán
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Họ và tên</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[190px] text-right">
                Trần Đăng trung
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Email</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                Trungtran@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Số điện thoại
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                0364 123 456
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Địa chỉ</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                Số 8 Phạm Hùng, Mễ Trì, Nam Từ Liêm. Hà Nội
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                BH Xã Hội Tự Nguyện
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Gói</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                Theo tháng
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Tổng cộng</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[142px] text-right">
                18.084.000 vnđ
              </p>
            </div>
          </div>

          <div>
            <img src="https://dion.vn/wp-content/uploads/2024/07/Added-Photo.png" />
          </div>
        </div>
      </div>

      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-center items-center">
            <button
              onClick={handleBack}
              className="px-[24px] py-3 bg-[#DEE7FE] w-full rounded-full bg-[#0076B7] text-base font-normal text-[#0076B7] text-center"
            >
              Thay đổi thanh toán
            </button>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <Link
              to="/"
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuillDetailPage;
