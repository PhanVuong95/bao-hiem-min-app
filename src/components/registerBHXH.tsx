import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Province, District, Ward } from "../models";
import FooterPayPage from "./footerPay";
import VoucherPage from "./cardVoucher";
import instance from "../api/api-config";

const RegisterBHXH: React.FunctionComponent = (props) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [supportBudget, setSupportBudget] = useState<number>(0);
  const [frontImageUrl, setFrontImageUrl] = useState<string>("");
  const [backImageUrl, setBackImageUrl] = useState<string>("");

  const { register, handleSubmit, watch, setValue } = useForm();
  const frontImageInputRef = useRef<HTMLInputElement>(null);
  const backImageInputRef = useRef<HTMLInputElement>(null);

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
        )
        .then((response) => {
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
    const provinceId = parseInt(event.target.value, 10);
    setSelectedProvince(provinceId);
    calculateSupportBudget(provinceId, watch("months"));
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDistrict(parseInt(event.target.value, 10));
  };

  const calculateSupportBudget = (provinceId: number, months: number) => {
    const budgetPerMonth = provinceId === 1001 ? 66000 : 33000;
    setSupportBudget(budgetPerMonth * months);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const token = localStorage.token;
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://baohiem.dion.vn/account/api/upload-file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageUrl(response.data.data[0]);
        return response.data.data[0];
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleCardClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="page-1 flex flex-col gap-4"
      >
        <div className="p-4 bg-white rounded-xl border border-[#B9BDC1] flex flex-col gap-3">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Chụp ảnh giấy tờ tuỳ thân
          </h3>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <div
                  className="bg-[#F5F5F5] rounded-lg p-[9px] card-cccd cursor-pointer"
                  onClick={() => handleCardClick(frontImageInputRef)}
                >
                  <div className="icon-1">
                    {frontImageUrl ? (
                      <img
                        src={`https://baohiem.dion.vn${frontImageUrl}`}
                        alt="Mặt trước"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="130"
                        height="89"
                        viewBox="0 0 130 89"
                        fill="none"
                      >
                        <path
                          d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                          fill="#0076B7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="icon-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                        fill="#0076B7"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                        fill="#0076B7"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="text-[15px] text-black text-center">
                  Mặt trước
                </h4>
                <input
                  type="file"
                  accept="image/*"
                  ref={frontImageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) =>
                    handleImageUpload(event, setFrontImageUrl)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <div
                  className="bg-[#F5F5F5] rounded-lg p-[9px] card-cccd cursor-pointer"
                  onClick={() => handleCardClick(backImageInputRef)}
                >
                  <div className="icon-1">
                    {backImageUrl ? (
                      <img
                        src={`https://baohiem.dion.vn${backImageUrl}`}
                        alt="Mặt sau"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="130"
                        height="89"
                        viewBox="0 0 130 89"
                        fill="none"
                      >
                        <path
                          d="M0.183716 7.50059V20.4506H1.83927V7.50059C1.83927 4.43539 4.06292 1.95059 6.80594 1.95059H18.3948V0.100586H6.80594C3.14859 0.100586 0.183716 3.41363 0.183716 7.50059Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 7.50058V20.4506H127.661V7.50058C127.661 4.4354 125.438 1.95059 122.695 1.95059H111.106V0.100586H122.695C126.352 0.100586 129.317 3.41368 129.317 7.50058Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M0.183716 81.5006V68.5506H1.83927V81.5006C1.83927 84.5658 4.06292 87.0506 6.80594 87.0506H18.3948V88.9006H6.80594C3.14859 88.9006 0.183716 85.5875 0.183716 81.5006Z"
                          fill="#0076B7"
                        />
                        <path
                          d="M129.317 81.5006V68.5506H127.661V81.5006C127.661 84.5658 125.438 87.0506 122.695 87.0506H111.106V88.9006H122.695C126.352 88.9006 129.317 85.5875 129.317 81.5006Z"
                          fill="#0076B7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="icon-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M12.25 7.4375C12.5607 7.4375 12.8125 7.68934 12.8125 8V11.4375H16.25C16.5607 11.4375 16.8125 11.6893 16.8125 12C16.8125 12.3107 16.5607 12.5625 16.25 12.5625H12.8125V16C12.8125 16.3107 12.5607 16.5625 12.25 16.5625C11.9393 16.5625 11.6875 16.3107 11.6875 16V12.5625H8.25C7.93934 12.5625 7.6875 12.3107 7.6875 12C7.6875 11.6893 7.93934 11.4375 8.25 11.4375H11.6875V8C11.6875 7.68934 11.9393 7.4375 12.25 7.4375Z"
                        fill="#0076B7"
                      />
                      <path
                        fillRule="evenodd"
                        d="M3.68506 12.0001C3.68506 7.26974 7.51974 3.43506 12.2501 3.43506C16.9804 3.43506 20.8151 7.26974 20.8151 12.0001C20.8151 16.7304 16.9804 20.5651 12.2501 20.5651C7.51974 20.5651 3.68506 16.7304 3.68506 12.0001ZM12.2501 4.56506C8.14382 4.56506 4.81506 7.89382 4.81506 12.0001C4.81506 16.1063 8.14382 19.4351 12.2501 19.4351C16.3563 19.4351 19.6851 16.1063 19.6851 12.0001C19.6851 7.89382 16.3563 4.56506 12.2501 4.56506Z"
                        fill="#0076B7"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="text-[15px] text-black text-center">Mặt sau</h4>
                <input
                  type="file"
                  accept="image/*"
                  ref={backImageInputRef}
                  style={{ display: "none" }}
                  onChange={(event) =>
                    handleImageUpload(event, setBackImageUrl)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin người tham gia BHXH tự nguyện
          </h3>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành nơi thanh gia BHXH{" "}
              <samp className="text-red-600">*</samp>
            </label>
            <select
              value={selectedProvince}
              {...register("province", { required: true })}
              onChange={handleProvinceChange}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                !selectedProvince && "text-gray-500"
              } custom-select-arrow`}
            >
              <option value="" disabled hidden>
                Chọn tỉnh thành phố
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số CCCD <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="cccd"
              {...register("cccd", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập số CCCD"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số BHXH
            </label>
            <input
              type="text"
              id="bhxh"
              {...register("bhxh", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập số Bảo hiểm Xã hội"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Ngày sinh <samp className="text-red-600">*</samp>
            </label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Giới tính <samp className="text-red-600">*</samp>
            </label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-select-arrow"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Mức lương làm căn cứ đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <input
                type="text"
                id="salary"
                {...register("salary", { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập mức lương"
              />
              <div className="absolute inset-y-0 start-[72%] top-0 flex items-center pointer-events-none">
                <p className="text-base font-normal text-[#767A7F]">
                  vnđ/tháng
                </p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số tháng đóng <samp className="text-red-600">*</samp>
            </label>
            <div className="relative">
              <input
                type="text"
                id="months"
                {...register("months", { required: true })}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-[#0076B7] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập số tháng"
                onChange={(e) => {
                  setValue("months", e.target.value);
                  calculateSupportBudget(
                    selectedProvince,
                    parseInt(e.target.value, 10)
                  );
                }}
              />
              <div className="absolute inset-y-0 start-[83%] top-0 flex items-center pointer-events-none">
                <p className="text-base font-normal text-[#767A7F]">tháng</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-900">
              Ngân sách hỗ trợ
            </label>
            <div className="relative">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={supportBudget.toLocaleString("vi-VN")}
                readOnly
              />
              <div className="absolute inset-y-0 start-[23%] top-[-2px] flex items-center pointer-events-none">
                <p className="text-base font-normal text-[#000]">vnđ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
          <h3 className="text-[#0076B7] text-lg font-medium">
            Thông tin người mua
          </h3>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Số điện thoại <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Số điện thoại"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Họ và tên <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="name"
              {...register("buyerName", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập tên của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Tỉnh thành <samp className="text-red-600">*</samp>
            </label>
            <select
              value={selectedProvince}
              {...register("buyerProvince", { required: true })}
              onChange={handleProvinceChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Chọn tỉnh thành phố
              </option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Quận huyện <samp className="text-red-600">*</samp>
            </label>
            <select
              value={selectedDistrict}
              {...register("buyerDistrict", { required: true })}
              onChange={handleDistrictChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Chọn quận huyện
              </option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Phường xã <samp className="text-red-600">*</samp>
            </label>
            <select
              {...register("buyerWard", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Chọn phường xã
              </option>
              {wards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-normal text-gray-900">
              Địa chỉ cụ thể <samp className="text-red-600">*</samp>
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="VD: Số nhà, số đường,...."
            />
          </div>
          <Link to="#" className="text-[#0076B7] text-sm font-normal underline">
            Xem hướng dẫn sử dụng trên VssID
          </Link>
        </div>
        <VoucherPage />
        <div className="flex flex-col gap-2 pb-4">
          <div>
            <p className="text-sm font-normal text-[#000]">
              Thông tin BHXH sẽ được cập nhật trên ứng dụng{" "}
              <strong className="text-[#0076B7] font-bold">VSSID </strong>
              trong 15 ngày làm việc.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-red-400 cursor-pointer checked:bg-[#0076B7]"
              id="unchecked-circular-checkbox"
            />
            <label
              htmlFor="unchecked-circular-checkbox"
              className="text-sm font-normal text-[#000] w-[96%]"
            >
              Tôi cam đoan răng tất cả những lời khai trên là đúng và đã hiểu rõ
              <strong className="text-[#0076B7] font-bold">
                {" "}
                Chính sách và điều khoản
              </strong>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <FooterPayPage h={""} w={""} url={"/buill-pay/1"} />
    </>
  );
};

export default RegisterBHXH;
