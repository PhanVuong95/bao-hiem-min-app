import React from "react";
import { Sheet, Button, Page, Text, useNavigate } from "zmp-ui";

const UserBeneficiaryPage: React.FunctionComponent = (props) => {
  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      <h3 className="text-[#0076B7] text-lg font-medium">
        Thông tin người được bảo hiểm
      </h3>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">Địa chỉ cụ thể</p>
        <span className="text-base font-semibold text-[#0076B7]">
          33.000đ/người/tháng
        </span>
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Số CCCD <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Số BHXH
        </label>
        <input
          type="text"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số Bảo hiểm Xã hội"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Ngày sinh <samp className="text-red-600">*</samp>
        </label>
        <input
          type="date"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Chọn ngày sinh"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Chọn giới tính</option>
          <option value="US">Nam</option>
          <option value="CA">Nữ</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
        </label>
        <div className="relative">
          <input
            type="text"
            id="phone-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập mức lương"
            required
          />
          <div className="absolute inset-y-0 start-[72%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#767A7F]">vnđ/tháng</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Ngân sách hỗ trợ
        </label>
        <div className="relative">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="360 000"
            value="360 000"
            required
          />
          <div className="absolute inset-y-0 start-[87%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#767A7F]">vnđ</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-normal text-gray-900">
          Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
        </label>
        <div className="relative">
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số tháng"
            required
          />
          <div className="absolute inset-y-0 start-[83%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#767A7F]">tháng</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBeneficiaryPage;
