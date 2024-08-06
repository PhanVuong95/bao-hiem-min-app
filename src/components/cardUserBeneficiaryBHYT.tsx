import React from "react";
import { Widthheight } from "../models";
import { listEthnics } from "../utils/constants";
import ScanPhotosPage from "./cardScanPhotos";

interface Props {
  price: number,
  index: number
}

const UserBeneficiaryBHYTPage = (props: Props) => {
  const { index, price } = props;

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[#0076B7] text-lg font-medium">
          Thông tin người được bảo hiểm
        </h3>
        <img src="../../assets-src/close_1.png" className="w-3 h-3" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">Phí bảo hiểm</p>
        <span className="text-base font-semibold text-[#0076B7]">
          1.263.600 đ
        </span>
        <ul className="list-disc px-4">
          <li>
            <p className="text-sm font-normal">
              Vui lòng nhập số BHXH để tra cứu thông tin
            </p>
          </li>
          <li>
            <p className="text-sm font-normal">
              Tra cứu mã số BHXH bằng thông tin khai sinh{" "}
              <span className="text-[#0076B7] font-semibold underline">
                tại đây
              </span>
            </p>
          </li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số BHXH
        </label>
        <div className="relative">
          <input
            type="text"
            id="phone-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số BHXH"
            required
          />
          <div className="absolute inset-y-0 start-[79%] top-0 flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#0076B7]">Tra cứu</p>
          </div>
        </div>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-normal text-gray-900">
          Trường hợp không có số BHXH vui lòng
        </p>
        <ul className="list-disc px-4">
          <li>
            <p className="text-sm font-normal">
              Điền số CCCD và Đính kèm ảnh CCCD
            </p>
          </li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số CCCD
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập số CCCD"
          required
        />
      </div>

      <ScanPhotosPage w={"118"} h={"81"} p={"9px"} url={""} />

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
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
        <label className="block text-sm font-normal pb-2 text-gray-900">
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
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Giới tính <samp className="text-red-600">*</samp>
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn giới tính</option>
          <option value="US">Nam</option>
          <option value="CA">Nữ</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Đân tộc <samp className="text-red-600">*</samp>
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn dân tộc</option>
          {listEthnics.map((item) => <option value="${item?.name}">{item?.name}</option>)}

        </select>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ cũ
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực * <samp className="text-red-600">*</samp>
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
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hết hiệu lực
            </label>
            <input
              type="date"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>
        </div>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div className="flex flex-col ">
        <h3 className="text-base font-semibold text-[#0076B7] pb-[24px]">
          Thẻ mới{" "}
          <span className="text-xs font-normal text-[#F00]">
            (ngày hiệu lực dự kiến)
          </span>
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hiệu lực * <samp className="text-red-600">*</samp>
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
            <label className="block text-sm font-normal pb-2 text-gray-900">
              Ngày hết hiệu lực
            </label>
            <input
              type="date"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Chọn ngày sinh"
              required
            />
          </div>
        </div>
      </div>

      <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Thành phố đăng ký khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn tỉnh thành phố</option>
          <option value="US">Nam</option>
          <option value="CA">Nữ</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Bệnh viện đăng ký khám chữa bệnh
          <samp className="text-red-600"> *</samp>
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn bệnh viện</option>
          <option value="US">Nam</option>
          <option value="CA">Nữ</option>
        </select>
      </div>
    </div>
  );
};

export default UserBeneficiaryBHYTPage;
