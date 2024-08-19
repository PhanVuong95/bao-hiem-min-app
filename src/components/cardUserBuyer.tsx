import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { registerInfoBHYT } from "../pages/BHYT/list_health_insurance";
import { Button, Input, Select } from 'antd';
import { convertListToSelect } from "../utils/validateString";

interface Props {
  data: any
  refs: any
}

const UserBuyerPage = (props: Props) => {
  const { refs } = props;
  const [phone, setPhone] = useState(registerInfoBHYT["phone"]);
  const [fullName, setFullName] = useState(registerInfoBHYT["fullName"]);
  const [email, setEmail] = useState(registerInfoBHYT["email"]);
  const [selectedDistrict, setSelectedDistrict] = useState(registerInfoBHYT["districtId"]);
  const [selectedProvince, setSelectedProvince] = useState(registerInfoBHYT["provinceId"]);
  const [selectedWard, setSelectedWard] = useState(registerInfoBHYT["wardId"]);
  const [wards, setWards] = useState<any>([]);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [addressDetail, setAddressDetail] = useState(registerInfoBHYT["addressDetail"]);

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
    setDistricts([])
    setWards([])
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
    setWards([])
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
    value
  ) => {
    const id = parseInt(value, 10);
    setSelectedProvince(id);
    registerInfoBHYT["provinceId"] = id;
  };

  const handleDistrictChange = (
    value
  ) => {
    const id = parseInt(value, 10);
    setSelectedDistrict(id);
    registerInfoBHYT["districtId"] = id;
  };

  const handlEwardChange = (
    value
  ) => {
    const id = parseInt(value, 10);
    setSelectedWard(id);
    registerInfoBHYT["wardId"] = id;
  };

  const renderTextHeader = () => {
    return (
      <h3 className="text-[#0076B7] text-lg font-medium">
        Thông tin người mua
      </h3>
    )
  }

  const renderInputPhone = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Số điện thoại <samp className="text-red-600">*</samp>
        </label>

        <Input
          type="text"
          id="phone"
          ref={refs.phone}
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            registerInfoBHYT["phone"] = e.target.value;
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số điện thoại"
          required
        />


        {/* 
        <input
          type="text"
          id="phone"
          ref={refs.phone}
          maxLength={10}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            registerInfoBHYT["phone"] = e.target.value;
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Số điện thoại"
          required
        /> */}
      </div>
    )
  }

  const renderFullName = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Họ và tên <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="name"
          ref={refs.fullName}
          maxLength={35}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            registerInfoBHYT["fullName"] = e.target.value;
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />

        {/* <input
          type="text"
          id="name"
          ref={refs.fullName}
          maxLength={35}
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            registerInfoBHYT["fullName"] = e.target.value;
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        /> */}
      </div>
    )
  }

  const renderEmail = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">Email</label>
        <Input
          type="email"
          id="email"
          ref={refs.email}
          value={email}
          maxLength={35}
          onChange={(e) => {
            setEmail(e.target.value);
            registerInfoBHYT["email"] = e.target.value;
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập email của bạn"
          required
        />

        {/* <input
          type="email"
          id="email"
          ref={refs.email}
          value={email}
          maxLength={35}
          onChange={(e) => {
            setEmail(e.target.value);
            registerInfoBHYT["email"] = e.target.value;
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập email của bạn"
          required
        /> */}
      </div>
    )
  }

  const renderProvince = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Tỉnh thành <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.provinceId}
          placeholder="Chọn tỉnh thành phố"
          value={selectedProvince}
          onChange={handleProvinceChange}
          key={selectedProvince}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(provinces, 'Chọn tỉnh thành phố')}
        />
        {/* <select
          id=""
          ref={refs.provinceId}
          value={selectedProvince}
          onChange={handleProvinceChange}
          key={selectedProvince}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected value="0">Chọn tỉnh thành phố</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select> */}
      </div>
    )
  }

  const renderDistrict = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Quận huyện <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.districtId}
          placeholder="Chọn quận huyện"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          key={selectedDistrict}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(districts, 'Chọn quận huyện')}
        />

        {/* <select
          id=""
          ref={refs.districtId}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          key={selectedDistrict}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected value="0">Chọn quận huyện</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select> */}
      </div>
    )
  }

  const renderWard = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Phường xã <samp className="text-red-600">*</samp>
        </label>
        <Select
          size="large"
          className="w-[100%]"
          showSearch
          ref={refs.wardId}
          placeholder="Chọn phường xã"
          value={selectedWard}
          onChange={handlEwardChange}
          key={selectedWard}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={convertListToSelect(wards, 'Chọn phường xã')}
        />

        {/* <select
          id=""
          ref={refs.wardId}
          value={selectedWard}
          onChange={handlEwardChange}
          key={selectedWard}
          name="view_type_sorting"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 selectCustom"
        >
          <option selected value="0">Chọn phường xã</option>
          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward?.name}
            </option>
          ))}
        </select> */}
      </div>
    )
  }

  const renderAddressDetail = () => {
    return (
      <div>
        <label className="block text-sm font-normal pb-2 text-gray-900">
          Địa chỉ cụ thể <samp className="text-red-600">*</samp>
        </label>
        <Input
          type="text"
          id="address"
          ref={refs.addressDetail}
          value={addressDetail}
          maxLength={200}
          onChange={(e) => {
            setAddressDetail(e.target.value);
            registerInfoBHYT["addressDetail"] = e.target.value;
          }}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          required
        />

        {/* <input
          type="text"
          id="address"
          ref={refs.addressDetail}
          value={addressDetail}
          maxLength={200}
          onChange={(e) => {
            setAddressDetail(e.target.value);
            registerInfoBHYT["addressDetail"] = e.target.value;
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="VD: Số nhà, số đường,...."
          required
        /> */}
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
      {renderTextHeader()}

      {renderInputPhone()}

      {renderFullName()}

      {renderEmail()}

      {renderProvince()}

      {renderDistrict()}

      {renderWard()}

      {renderAddressDetail()}

      <Link to="/" className="text-[#0076B7] text-sm font-normal underline">
        Xem hướng dẫn sử dụng trên VssID
      </Link>
    </div>
  );
};

export default UserBuyerPage;
