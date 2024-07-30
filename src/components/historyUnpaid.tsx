import React from "react";
import FooterPayPage from "./footerPay";

const HistoryUnpaidPage: React.FunctionComponent = (props) => {
  return (
    <div>
      <div className="bg-[#FAAD14] py-[12px] px-4 flex flex-row items-center justify-between">
        <p className="text-white text-sm font-normal">Trạng thái</p>
        <p className="text-white text-sm font-semibold">Chưa thanh toán</p>
      </div>
      <div className="page-1 flex flex-col gap-4 mb-4">
        <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-base font-medium text-[#0076B7]">
            Người mua bảo hiểm
          </h3>

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

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <h3 className="text-base font-medium text-[#0076B7]">
            Thông tin người được bảo hiểm
          </h3>

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
              <p className="text-[#646464] text-sm font-normal">Số CCCD</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                015098005123
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Số BHXH</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[142px] text-right">
                DN 123 456 789
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Ngày sinh</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                20/05/1996
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Giới tính</p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                Nam
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Mức lương</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                7.000.000 vnđ
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Ngân sách hỗ trợ
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                396.000 vnđ
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">
                Số tháng đóng
              </p>
            </div>
            <div>
              <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                12 tháng
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-[#646464] text-sm font-normal">Phí bảo hiểm</p>
            </div>
            <div>
              <p className="text-[#0076B7] text-sm font-semibold max-w-[180px] text-right">
                18.084.000 vnđ
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl flex flex-col gap-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Danh mục sản phẩm
          </h3>
          <div className="flex gap-[10px]">
            <img src="https://dion.vn/wp-content/uploads/2024/07/image-1004.png" />
            <div className="title-product flex flex-col">
              <h3 className="text-[#0076B7] text-lg font-medium">
                BH Xã Hội Tự nguyện
              </h3>
              <p className="text-[#646464] text-sm font-normal">Theo tháng</p>
              <span className="text-[#0076B7] text-lg font-bold">
                22<samp className="text-[#646464] text-sm font-normal">%</samp>
              </span>
            </div>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Phương thức thanh toán
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-normal max-w-[180px] text-right">
                  VietQR (Chuyển khoản ngân hàng, MOMO, Zalopay, Viettelpay)
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between w-full">
              <div>
                <p className="text-[#646464] text-sm font-normal">
                  Ngày đăng ký
                </p>
              </div>
              <div>
                <p className="text-[#2E2E2E] text-sm font-semibold max-w-[180px] text-right">
                  08:00 - 12/07/2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPayPage h={""} w={""} url={"/buill-detail/1"} />
    </div>
  );
};

export default HistoryUnpaidPage;
