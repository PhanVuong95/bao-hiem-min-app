import React, { useState, useEffect } from "react";

const UserBeneficiaryPage = ({ provinces }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [months, setMonths] = useState("");
  const [supportBudget, setSupportBudget] = useState("33,000");

  // Handle province selection change
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  // Handle months input change
  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };

  // Calculate support budget based on selected province and months
  useEffect(() => {
    const getMonthlyRate = () => {
      if (selectedProvince === "1001") return 66000;
      return 33000; // Default rate for other provinces
    };

    const monthlyRate = getMonthlyRate();
    const budget = months ? months * monthlyRate : monthlyRate;
    setSupportBudget(budget.toLocaleString());
  }, [selectedProvince, months]);

  return (
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nhập tên của bạn"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900">
          Tỉnh thành nơi thanh gia BHXH <samp className="text-red-600">*</samp>
        </label>
        <select
          value={selectedProvince}
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
          id="bhxh"
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
          id="dob"
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
          id="gender"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          Số tháng đóng <samp className="text-red-600">*</samp>
        </label>
        <div className="relative">
          <input
            type="text"
            id="months"
            value={months}
            onChange={handleMonthsChange}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Nhập số tháng"
            required
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
            placeholder="Nhập ngân sách hỗ trợ"
            value={supportBudget}
            readOnly
          />
          <div className="absolute inset-y-0 start-[23%] top-[-2px] flex items-center pointer-events-none">
            <p className="text-base font-normal text-[#000]">vnđ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBeneficiaryPage;
