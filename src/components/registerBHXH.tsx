import React, { useState } from "react";
import ScanPhotosPage from "./cardScanPhotos";
import UserBeneficiaryPage from "./cardUserBeneficiary";
import UserBuyerPage from "./cardUserBuyer";
import VoucherPage from "./cardVoucher";
import FooterPayPage from "./footerPay";

const RegisterBHXH: React.FunctionComponent = (props) => {
  const [beneficiaries, setBeneficiaries] = useState([{ id: 1 }]);

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { id: beneficiaries.length + 1 }]);
  };

  return (
    <>
      <div className="page-1 flex flex-col gap-4">
        <ScanPhotosPage w={"130"} h={"89"} p={"11px"} url={""} />
        <UserBuyerPage />
        {beneficiaries.map((beneficiary) => (
          <UserBeneficiaryPage key={beneficiary.id} />
        ))}
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
      </div>
      <FooterPayPage h={""} w={""} url={"/buill-pay/1"} />
    </>
  );
};

export default RegisterBHXH;
