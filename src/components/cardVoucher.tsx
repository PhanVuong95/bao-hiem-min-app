import React from "react";
import { Sheet, Button, Page, Text, useNavigate } from "zmp-ui";

const VoucherPage: React.FunctionComponent = (props) => {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      <h3 className="text-base font-medium text-[#0076B7]">
        Thêm người được bảo hiểm
      </h3>
      <div className="flex flex-col">
        <p className="block text-sm font-normal text-gray-900">
          Voucher giảm giá
        </p>
        <div className="flex flex-row items-center justify-between gap-1">
          <input
            type="text"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[72%] p-3"
            placeholder="Nhập mã E-voucher"
          />
          <button className="p-3 rounded-lg bg-[#0076B7] text-base font-normal text-white ">
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
