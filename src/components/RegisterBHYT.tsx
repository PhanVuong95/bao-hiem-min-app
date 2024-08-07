import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "zmp-ui";
import { registerInfoBHYT } from "../pages/listHealthInsurance";
import { isValidEmail, isValidEmptyString, isValidFullName, isValidPhone } from "../utils/validateString";
import UserBeneficiaryBHYTPage from "./cardUserBeneficiaryBHYT";
import UserBuyerPage from "./cardUserBuyer";
import VoucherPage from "./cardVoucher";
import HeaderBase from "./headerBase";

const RegisterBHYT = ({ }) => {
  const [beneficiaries, setBeneficiaries] = useState([{ id: 1 }]);
  const { state } = useLocation();
  const navigate = useNavigate();

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { id: beneficiaries.length + 1 }]);
    const itemBeneficiary = {
      "id": 0,
      "insuranceProvinceId": 0,
      "medicalProvinceId": 0,
      "socialInsuranceNumber": "",
      "citizenId": "",
      "photoCitizenFront": "",
      "photoCitizenBack": "",
      "fullName": "",
      "doB": "",
      "gender": "",
      "supportBudget": 0,
      "wage": 0,
      "monthInsured": 0,
      "ethnic": "",
      "oldCardStartDate": "",
      "oldCardEndDate": "",
      "newCardEndDate": "",
      "newCardStartDate": ""
    }

    registerInfoBHYT['listInsuredPerson'].push(itemBeneficiary)
  };

  const validateForm = () => {
    console.log(registerInfoBHYT);

    // Validate số điện thoại
    if (!isValidEmptyString(registerInfoBHYT["phone"])) {
      toast.warn(
        "Số điện thoại không được để trống",
      );
      return false;
    }
    if (!isValidPhone(registerInfoBHYT["phone"])) {
      toast.warn(
        "Số điện thoại không hợp lệ",
      );
      return false;
    }

    // Validate họ và tên
    if (!isValidEmptyString(registerInfoBHYT["fullName"])) {
      toast.warn(
        "Họ và tên không được để trống",
      );
      return false;
    }

    if (!isValidFullName(registerInfoBHYT["fullName"])) {
      toast.warn(
        "Họ và tên không hợp lệ",
      );
      return false;
    }

    // Validate email
    if (isValidEmptyString(registerInfoBHYT["email"])) {
      if (!isValidEmail(registerInfoBHYT["email"])) {
        toast.warn(
          "Email không hợp lệ",
        );
        return false;
      }
    }

    // Validate địa chỉ
    if (registerInfoBHYT["provinceId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Thành phố",
      );
      return false;
    }

    if (registerInfoBHYT["districtId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Quận huyện",
      );
      return false;
    }

    if (registerInfoBHYT["wardId"] == 0) {
      toast.warn(
        "Vui lòng lựa chọn Phường xã",
      );
      return false;
    }

    if (!isValidEmptyString(registerInfoBHYT["addressDetail"])) {
      toast.warn(
        "Địa chỉ cụ thể không được để trống",
      );
      return false;
    }

    console.log(registerInfoBHYT);


    // return true;
  }

  const renderHeader = () => {
    return (
      <HeaderBase
        isHome={false}
        title={"Đăng ký BHYT tự nguyện"}
      />
    )
  }

  const renderAddUserBeneficiary = () => {
    return (
      <button
        className="p-4 bg-white rounded-xl flex flex-row items-center justify-center gap-2"
        onClick={addBeneficiary}
      >
        <p className="text-base font-semibold text-[#0076B7]">
          Thêm người được bảo hiểm
        </p>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              d="M1.25122 12C1.25122 6.08579 6.08701 1.25 12.0012 1.25C17.9154 1.25 22.7512 6.08579 22.7512 12C22.7512 17.9142 17.9154 22.75 12.0012 22.75C6.08701 22.75 1.25122 17.9142 1.25122 12ZM12.0012 2.75C6.91543 2.75 2.75122 6.91421 2.75122 12C2.75122 17.0858 6.91543 21.25 12.0012 21.25C17.087 21.25 21.2512 17.0858 21.2512 12C21.2512 6.91421 17.087 2.75 12.0012 2.75ZM7.25122 12C7.25122 11.5858 7.58701 11.25 8.00122 11.25H11.2512V8C11.2512 7.58579 11.587 7.25 12.0012 7.25C12.4154 7.25 12.7512 7.58579 12.7512 8V11.25H16.0012C16.4154 11.25 16.7512 11.5858 16.7512 12C16.7512 12.4142 16.4154 12.75 16.0012 12.75H12.7512V16C12.7512 16.4142 12.4154 16.75 12.0012 16.75C11.587 16.75 11.2512 16.4142 11.2512 16V12.75H8.00122C7.58701 12.75 7.25122 12.4142 7.25122 12Z"
              fill="#0076B7"
            />
          </svg>
        </div>
      </button>
    )
  }

  const renderAttachedFiles = () => {
    return (
      <div className="flex flex-col gap-2 mb-[32px]">
        <div className="bg-white rounded-xl flex flex-col gap-6 p-4">
          <h3 className="text-[#0076B7] text-lg font-medium">
            File đính kèm
          </h3>
          <button className="button-add">
            <div className="flex flex-row justify-center items-center gap-3">
              <p className="text-[#0076B7] text-base font-semibold">
                Upload hình ảnh liên quan
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  d="M1.75134 12.7915C1.75134 6.87729 6.58713 2.0415 12.5013 2.0415C18.4156 2.0415 23.2513 6.87729 23.2513 12.7915C23.2513 18.7057 18.4156 23.5415 12.5013 23.5415C6.58713 23.5415 1.75134 18.7057 1.75134 12.7915ZM12.5013 3.5415C7.41556 3.5415 3.25134 7.70572 3.25134 12.7915C3.25134 17.8773 7.41556 22.0415 12.5013 22.0415C17.5871 22.0415 21.7513 17.8773 21.7513 12.7915C21.7513 7.70572 17.5871 3.5415 12.5013 3.5415ZM7.75134 12.7915C7.75134 12.3773 8.08713 12.0415 8.50134 12.0415H11.7513V8.7915C11.7513 8.37729 12.0871 8.0415 12.5013 8.0415C12.9156 8.0415 13.2513 8.37729 13.2513 8.7915V12.0415H16.5013C16.9156 12.0415 17.2513 12.3773 17.2513 12.7915C17.2513 13.2057 16.9156 13.5415 16.5013 13.5415H13.2513V16.7915C13.2513 17.2057 12.9156 17.5415 12.5013 17.5415C12.0871 17.5415 11.7513 17.2057 11.7513 16.7915V13.5415H8.50134C8.08713 13.5415 7.75134 13.2057 7.75134 12.7915Z"
                  fill="#0076B7"
                />
              </svg>
            </div>
          </button>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="gap-2 flex flex-col">
            <p className="text-sm font-normal text-[#000]">
              Quy tắc giảm phí cùng hộ gia đình:
            </p>

            <ul className="list-disc px-4">
              <li>
                <p className="text-sm font-normal">
                  Cung cấp toàn bộ thẻ CCCD gắn chip điện tử những người tham
                  gia BHYT hộ gia đình
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Tất cả thành viên trong gia đình phải có cùng địa chỉ trên
                  thẻ CCCD để được giảm phí
                </p>
              </li>
              <li>
                <p className="text-sm font-normal">
                  Trường hợp quan hệ với chủ hộ là “ở nhờ”, “ ở trọ” thì không
                  thuộc đối tượng được giảm phí
                </p>
              </li>
            </ul>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
              id="unchecked-circular-checkbox"
            />
            <label
              htmlFor="unchecked-circular-checkbox"
              className="text-sm font-normal text-[#000] w-[96%]"
            >
              Tôi cam đoan răng tất cả những lời khai trên là đúng và đã hiểu
              rõ
              <strong className="text-[#0076B7] font-bold">
                {" "}
                Chính sách và điều khoản
              </strong>
            </label>
          </div>

          <hr className="border-dashed border-[1px] text-[#DEE7FE] "></hr>

          <div className="flex flex-col gap-2 pb-4">
            <h3 className="text-[#0076B7] text-lg font-medium">
              Thông tin thẻ BHYT
            </h3>
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
                className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
                id="unchecked-circular-checkbox"
              />
              <label
                htmlFor="unchecked-circular-checkbox"
                className="text-sm font-normal text-[#000] w-[96%]"
              >
                Tôi cam đoan răng tất cả những lời khai trên là đúng và đã
                hiểu rõ
                <strong className="text-[#0076B7] font-bold">
                  {" "}
                  Chính sách và điều khoản
                </strong>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderFooter = () => {
    return (
      <div className="page-2 bg-white">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row content-center justify-between">
            <p className="block text-sm font-normal text-gray-900">
              Tổng thanh toán:
            </p>
            <h3 className="text-base font-medium text-[#0076B7]">
              18.084.000 VND
            </h3>
          </div>
          <div className="flex flex-row content-center justify-center items-center">
            <button type="button"
              onClick={() => {
                if (validateForm()) {
                  navigate('/bill-pay-bhyt/')
                }
              }}
              className="px-[24px] py-3 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {renderHeader()}
      <div className="page-1 flex flex-col gap-4">
        <UserBuyerPage data={state.data} />
        {beneficiaries.map((beneficiary, index) => (
          <UserBeneficiaryBHYTPage
            index={index}
            price={state.data.price}
            onClose={(index) => {
              beneficiaries.splice(index, 1);
              setBeneficiaries([...beneficiaries]);
            }}
            key={beneficiary.id}
          />
        ))}

        {renderAddUserBeneficiary()}

        <VoucherPage />

        {renderAttachedFiles()}
      </div>

      {renderFooter()}
    </div>
  );
};

export default RegisterBHYT;
