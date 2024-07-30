import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchCity } from "../api";
import { Province } from "../models";
import { CategoryType } from "../models/category";
import ScanPhotosPage from "./cardScanPhotos";
import UserBeneficiaryPage from "./cardUserBeneficiary";
import UserBuyerPage from "./cardUserBuyer";
import VoucherPage from "./cardVoucher";
import FooterPayPage from "./footerPay";

const RegisterBHXH: React.FunctionComponent = (props) => {
  const [provinces, setProvinces] = useState<Province[]>([]);

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

  return (
    <>
      <div className="page-1 flex flex-col gap-4">
        <ScanPhotosPage w={"130"} h={"89"} p={"11px"} url={""} />

        <UserBeneficiaryPage provinces={provinces} />

        <UserBuyerPage />

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
