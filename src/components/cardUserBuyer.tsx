import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCity } from "../api";
import { CityType, District, Province } from "../models";


export let userForm = {
  "id": "hollo"
}

const UserBuyerPage: React.FunctionComponent = (props) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<WritableStreamDefaultController[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);


  const [months, setMonths] = useState("");
  const [supportBudget, setSupportBudget] = useState("33,000");

  useEffect(() => {
    axios
      .get("https://baohiem.dion.vn/province/api/list")
      .then((response) => {
        setProvinces(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/district/api/list-by-provinceId?provinceId=${selectedProvince}`
        ).then((response) => {
          setDistricts(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict !== 0) {
      axios
        .get(
          `https://baohiem.dion.vn/ward/api/list-by-districtId?districtId=${selectedDistrict}`
        )
        .then((response) => {
          setWards(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProvince(parseInt(event.target.value, 10));
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(parseInt(event.target.value, 10));
  };

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      <h3 className="text-[#0076B7] text-lg font-medium">
        Thông tin người mua
      </h3>
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số điện thoại <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số điện thoại"
          required
        />
      </div>
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
        <label className="block text-sm font-normal pb-2 text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập email của bạn"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>
        <select
          id=""
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn tỉnh thành phố</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <select
          id=""
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected className="bg-black">Chọn quận huyện</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <select
          id=""
          name="view_type_sorting"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected>Chọn phường xã</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward?.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <input
          type="text"
          id="address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          required
        />
      </div>
      <Link to="#" className="text-[#0076B7] text-sm font-normal underline">
        Xem hướng dẫn sử dụng trên VssID
      </Link>
    </div>
  );
};

export default UserBuyerPage;
